import { View } from "components";
import { Columns, ICONS, StaticTable } from "pages/common";
import { FC, useMemo } from "react";
import { OrganisationResource } from "types/organisation.type";
import { organisationApi } from "api";
import { NATURE, QUERY_KEY } from "utils/constants";
import { useQuery } from "@tanstack/react-query";
import {
  AttributionResource,
  FonctionResource,
  OrganisationAttribution,
  PersonneResource,
} from "types/personne.type";
import { AffecterActions, AttributionActions } from "pages/attributions/common";

import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { useDroits } from "hooks/useDroits";
import { DateFormater } from "utils/DateUtils";

type OrganisationMembresProps = {
  organisation: OrganisationResource;
};

const searchByCriteres = (
  term: string,
  attributions: OrganisationAttribution[]
) => {
  return attributions.filter(({ personne, fonction }) => {
    return [personne?.nom, personne?.prenom, fonction.nom]
      .filter(Boolean)
      .join(" ")
      .match(new RegExp(term, "gi"));
  });
};

export const OrganisationMembres: FC<OrganisationMembresProps> = ({
  organisation,
}) => {
  const typeId =
    organisation.nature.code === NATURE.national ? organisation.type?.id : null;

  const protection = useDroits();

  const query = useQuery({
    queryKey: [QUERY_KEY.direction, organisation.id],
    networkMode: "offlineFirst",
    queryFn: () => organisationApi.findDirection(organisation.id, { typeId }),
  });

  const columns = useMemo(() => {
    const cols: Columns<OrganisationAttribution>[] = [
      {
        name: "fonction",
        label: "Fonction",
        Cell: ({ fonction }) => (
          <span className="text-primary">{fonction.nom}</span>
        ),
      },
      {
        name: "personne",
        label: "Personne",
        Cell: ({ personne }) =>
          personne ? (
            <Link to={LINKS.personnes.view(personne.id)}>
              <span className="text-primary fw-semibold">
                {personne.prenom} {personne.nom}
              </span>
            </Link>
          ) : (
            <View.Empty />
          ),
      },
      {
        name: "date_debut",
        label: "Date",
        Cell: ({ date_debut, date_fin }) => {
          if (!date_debut) {
            return <View.Empty />;
          }
          const dateDebut = DateFormater.toDate(date_debut);
          if (date_debut && !date_fin) {
            return `Depuis le ${dateDebut}`;
          }
          return `Du ${dateDebut} au ${DateFormater.toDate(date_fin)}`;
        },
      },
    ];

    if (protection.organisation.direction(organisation)) {
      cols.push({
        name: "actions",
        label: "Actions",
        headClassName: "text-end",
        Cell: (attribution) => {
          return (
            <div className="text-end d-flex justify-content-end">
              {attribution.personne ? (
                <AttributionActions
                  attribution={
                    {
                      ...attribution,
                      fonction: attribution.fonction as FonctionResource,
                      organisation,
                      personne: attribution.personne as PersonneResource,
                    } as AttributionResource
                  }
                />
              ) : (
                <AffecterActions
                  organisation={organisation}
                  fonction={attribution.fonction as FonctionResource}
                />
              )}
            </div>
          );
        },
      });
    }

    return cols;
  }, [organisation, protection.organisation]);

  return (
    <StaticTable
      header={{
        icon: ICONS.direction,
        label: "Organe de direction",
        description: "Membres de l'organe de direction",
      }}
      data={query.data}
      columns={columns}
      isLoading={query.isLoading}
      error={query.error}
      onSearch={searchByCriteres}
    />
  );
};

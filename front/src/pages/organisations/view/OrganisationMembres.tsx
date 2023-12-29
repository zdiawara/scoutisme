import { View } from "components";
import { Columns, ICONS, StaticTable } from "pages/common";
import { FC, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
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
import { dateFormater } from "utils/functions";
import { AttributionActions } from "pages/attributions/common";
import { OrganisationMembreModal } from "pages/attributions/common";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { useDroits } from "hooks/useDroits";

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

  const [attributionSelected, setAttributionSelected] = useState<
    OrganisationAttribution | undefined
  >();

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
        Cell: (attribution) => {
          if (!attribution.personne) {
            return <View.Empty />;
          }
          return (
            <Link to={LINKS.personnes.view(attribution.personne.id)}>
              <span className="text-primary fw-semibold">
                {attribution.personne.prenom} {attribution.personne.nom}
              </span>
            </Link>
          );
        },
      },
      {
        name: "date_debut",
        label: "Date",
        Cell: ({ date_debut, date_fin }) => {
          if (!date_debut) {
            return <View.Empty />;
          }
          const dateDebut = dateFormater.formatStr(date_debut);

          if (date_debut && !date_fin) {
            return `Depuis le ${dateDebut}`;
          }
          return `Du ${dateFormater.formatStr(
            date_debut
          )} au ${dateFormater.formatStr(date_fin)}`;
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
              {!attribution.personne ? (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setAttributionSelected(attribution);
                  }}
                >
                  <i className="uil-link"></i> Affecter
                </Button>
              ) : (
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
              )}
            </div>
          );
        },
      });
    }

    return cols;
  }, [organisation, protection.organisation]);

  return (
    <>
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

      {attributionSelected && (
        <OrganisationMembreModal
          fonction={attributionSelected.fonction as FonctionResource}
          organisation={organisation}
          closeModal={() => setAttributionSelected(undefined)}
        />
      )}
    </>
  );
};

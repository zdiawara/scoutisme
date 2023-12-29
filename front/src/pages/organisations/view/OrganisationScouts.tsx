import { View } from "components";
import { Columns, ICONS, StaticTable } from "pages/common";
import { FC, useMemo } from "react";
import { OrganisationResource } from "types/organisation.type";
import { personneApi } from "api";
import { QUERY_KEY } from "utils/constants";
import { PersonneResource } from "types/personne.type";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { OrganisationScoutActions } from "../common";
import { AttributionActions } from "pages/attributions/common";
import { dateFormater } from "utils/functions";
import { useDroits } from "hooks/useDroits";

type OrganisationScoutsProps = {
  organisation: OrganisationResource;
};

const searchByCriteres = (term: string, personnes: PersonneResource[]) => {
  return personnes.filter(({ nom, prenom }) =>
    `${nom} ${prenom}`.match(new RegExp(term, "gi"))
  );
};

export const OrganisationScouts: FC<OrganisationScoutsProps> = ({
  organisation,
}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.scouts, organisation.id],
    networkMode: "offlineFirst",
    queryFn: () =>
      personneApi
        .findAll<PersonneResource>({
          organisationId: organisation.id,
          codeFonction: "scout",
          type: "scout",
        })
        .then((r) => r.data),
  });

  const protection = useDroits();

  const columns = useMemo(() => {
    const cols: Columns<PersonneResource>[] = [
      {
        name: "personne",
        label: "Personne",
        Cell: (personne) => {
          return (
            <Link to={LINKS.personnes.view(personne.id)}>
              <span className="text-primary fw-semibold">
                {personne.prenom} {personne.nom}
              </span>
              <div className="text-muted">{personne.code}</div>
            </Link>
          );
        },
      },
      {
        name: "date_debut",
        label: "Date début",
        Cell: ({ date_debut }) => {
          if (!date_debut) {
            return <View.Empty />;
          }
          return dateFormater.formatStr(date_debut);
        },
      },

      {
        name: "date_fin",
        label: "Date fin",
        Cell: ({ date_fin }) => {
          if (!date_fin) {
            return <View.Empty />;
          }
          return dateFormater.formatStr(date_fin);
        },
      },
    ];

    if (protection.personne.scouts.creer) {
      cols.push({
        name: "actions",
        label: "Actions",
        headClassName: "text-end",
        Cell: (personne) => {
          return (
            <div className="text-end">
              <AttributionActions
                attribution={{
                  id: personne.id,
                  personne,
                  fonction: personne.fonction!,
                  organisation: personne.organisation!,
                  date_debut: personne.date_debut!,
                  date_fin: personne.date_fin!,
                }}
              />
            </div>
          );
        },
      });
    }
    return cols;
  }, [protection.personne.scouts.creer]);

  const { data } = query;

  return (
    <StaticTable
      header={{
        icon: ICONS.personne,
        label: "Scouts",
        description: "Les scouts de l'unité",
      }}
      data={data}
      onSearch={searchByCriteres}
      columns={columns}
      isLoading={query.isLoading}
      error={query.error}
      actions={<OrganisationScoutActions organisation={organisation} />}
    />
  );
};

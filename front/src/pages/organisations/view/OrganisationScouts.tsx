import { View } from "components";
import { Columns, ICONS, StaticTable } from "pages/common";
import { FC, useMemo } from "react";
import { OrganisationResource } from "types/organisation.type";
import { attributionApi } from "api";
import { QUERY_KEY } from "utils/constants";
import { AttributionResource } from "types/personne.type";
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

const searchByCriteres = (
  term: string,
  attributions: AttributionResource[]
) => {
  return attributions.filter(({ personne: { nom, prenom } }) =>
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
      attributionApi
        .findAll<AttributionResource>({
          organisationId: organisation.id,
          fonctionCode: "scout",
        })
        .then((r) => r.data),
  });

  const protection = useDroits();

  const columns = useMemo(() => {
    const cols: Columns<AttributionResource>[] = [
      {
        name: "personne",
        label: "Personne",
        Cell: ({ personne }) => (
          <Link to={LINKS.personnes.view(personne.id)}>
            <span className="text-primary fw-semibold">
              {personne.prenom} {personne.nom}
            </span>
            <div className="text-muted">{personne.code}</div>
          </Link>
        ),
      },
      {
        name: "date_debut",
        label: "Date début",
        Cell: ({ date_debut }) =>
          date_debut ? dateFormater.formatStr(date_debut) : <View.Empty />,
      },

      {
        name: "date_fin",
        label: "Date fin",
        Cell: ({ date_fin }) =>
          date_fin ? dateFormater.formatStr(date_fin) : <View.Empty />,
      },
    ];

    if (protection.personne.scouts.creer) {
      cols.push({
        name: "actions",
        label: "Actions",
        headClassName: "text-end",
        Cell: (attribution) => (
          <div className="text-end">
            <AttributionActions attribution={attribution} />
          </div>
        ),
      });
    }
    return cols;
  }, [protection.personne.scouts.creer]);

  const { data } = query;

  return (
    <StaticTable<AttributionResource>
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

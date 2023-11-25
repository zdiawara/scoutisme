import { View } from "components";
import { Columns, ICONS, StaticTable } from "pages/common";
import { FC } from "react";
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

type OrganisationScoutsProps = {
  organisation: OrganisationResource;
};

const searchByCriteres = (
  term: string,
  attributions: AttributionResource[]
) => {
  return attributions.filter(({ personne }) =>
    `${personne.nom} ${personne.prenom}`.match(new RegExp(term, "gi"))
  );
};

export const OrganisationScouts: FC<OrganisationScoutsProps> = ({
  organisation,
}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.attributions, organisation.id],
    networkMode: "offlineFirst",
    queryFn: () =>
      attributionApi
        .findAll<AttributionResource>({
          organisationId: organisation.id,
          fonctionCode: "scout",
          type: "scout",
        })
        .then((r) => r.data),
  });

  const columns: Columns<AttributionResource>[] = [
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
            <div className="text-muted">{attribution.personne.code}</div>
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
    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (attribution) => {
        return (
          <div className="text-end">
            <AttributionActions attribution={attribution} />
          </div>
        );
      },
    },
  ];

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

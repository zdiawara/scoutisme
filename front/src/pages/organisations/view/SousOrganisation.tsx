import { FC } from "react";
import { Columns, ICONS, StaticTable } from "pages/common";
import { OrganisationResource } from "types/organisation.type";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { organisationApi } from "api";
import { Button } from "react-bootstrap";
import { SousOrganisationActions } from "../common";

type SousOrganisationProps = {
  organisation: OrganisationResource;
};

const searchByCriteres = (
  term: string,
  attributions: OrganisationResource[]
) => {
  return attributions.filter(({ code, nom, type }) => {
    return [code, nom, type?.nom]
      .filter(Boolean)
      .join(" ")
      .match(new RegExp(term, "gi"));
  });
};

export const SousOrganisation: FC<SousOrganisationProps> = ({
  organisation,
}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.organisation_enfants, organisation.id],
    networkMode: "offlineFirst",
    queryFn: () =>
      organisationApi
        .findAll<OrganisationResource>({
          parentId: organisation.id,
        })
        .then((r) => r.data),
  });

  const columns: Columns<OrganisationResource>[] = [
    {
      name: "nom",
      label: "Nom ",
      Cell: ({ nom, id }) => (
        <Link to={LINKS.organisations.view(id)}>{nom}</Link>
      ),
    },

    {
      name: "code",
      label: "Code",
    },
    {
      name: "nature",
      label: "Nature",
      Cell: ({ nature, type }) => (
        <span>
          {nature.nom}
          {type ? <span className="text-muted"> / {type.nom}</span> : ""}
        </span>
      ),
    },
    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: ({ id }) => (
        <div className="text-end">
          {/* @ts-ignore */}
          <Button variant="light" as={Link} to={LINKS.organisations.view(id)}>
            ouvrir
          </Button>
        </div>
      ),
    },
  ];

  const { data } = query;

  return (
    <StaticTable
      header={{
        icon: ICONS.personne,
        label: "Sous organisations",
        description: `Liste des organisations rattachées ${organisation.nom}`,
      }}
      data={data}
      onSearch={searchByCriteres}
      columns={columns}
      isLoading={query.isLoading}
      error={query.error}
      actions={<SousOrganisationActions organisation={organisation} />}
    />
  );
};

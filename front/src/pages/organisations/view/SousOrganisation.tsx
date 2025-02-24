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
import { useDroits } from "hooks/useDroits";

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

const columns: Columns<OrganisationResource>[] = [
  {
    name: "nom",
    label: "Nom ",
    Cell: ({ nom, id, nature }) => (
      <Link
        to={LINKS.organisations.view(
          id,
          nature.code === "unite" ? undefined : "organisations"
        )}
      >
        {nom}
      </Link>
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
        <Button
          variant="light"
          size="sm"
          /* @ts-ignore */
          as={Link}
          to={LINKS.organisations.view(id)}
        >
          voir
        </Button>
      </div>
    ),
  },
];

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
  const protection = useDroits();

  const renderCount = (total: number) => {
    const { nature, type } = organisation;
    let label;
    if (type?.code === "conseil_national") {
      label = "Equipe nationale";
    } else if (type?.code === "equipe_nationale") {
      label = "Région(s)";
    } else if (nature.code === "region") {
      label = "Groupe(s)";
    } else if (nature.code === "groupe") {
      label = "Unité(s)";
    }
    return (
      <span>
        {total} {label}
      </span>
    );
  };

  const { data } = query;

  return (
    <StaticTable
      header={{
        icon: ICONS.personne,
        label: "Sous organisations",
        description: `Liste des sous organisations rattachées à ${organisation.nom}`,
      }}
      data={data}
      search={{
        onSearch: searchByCriteres,
        placeholder: "Recherche par nom, code ...",
      }}
      columns={columns}
      isLoading={query.isLoading}
      error={query.error}
      renderCount={renderCount}
      actions={
        protection.organisation.creer && (
          <SousOrganisationActions organisation={organisation} />
        )
      }
    />
  );
};

import { FC } from "react";
import { Columns, ICONS, StaticTable } from "pages/common";
import { OrganisationResource } from "types/organisation.type";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { organisationApi } from "api";
import { Button, Card, ListGroup, Stack } from "react-bootstrap";
import { SousOrganisationActions } from "../common";
import { useDroits } from "hooks/useDroits";
import * as Icon from "react-bootstrap-icons";

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
          id
          // nature.code === "unite" ? undefined : "organisations"
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
          size="sm"
          variant="text"
          /* @ts-ignore */
          as={Link}
          to={LINKS.organisations.view(id)}
        >
          <Icon.EyeFill />
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
    <>
      <ListGroup>
        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          {/* <div>
            <Icon.InfoCircle size="1.1rem" className="me-1" />
            <span className="fs-5">Liste des groupes / unités</span>
          </div> */}
          <Button
            className="ms-auto d-block"
            size="sm"
            variant="outline-primary"
          >
            <Icon.PlusLg className="me-0" />
          </Button>
        </ListGroup.Item>
        {data?.map(({ nom, id, type, nature }) => (
          <ListGroup.Item
            className="d-flex justify-content-between align-items-start"
            key={id}
          >
            <div className="me-auto">
              <div className="fw-semibold mb-1">{nom}</div>
              <div className="fw-light">
                {nature.nom}
                {type ? <span className="text-muted"> / {type.nom}</span> : ""}
              </div>
            </div>
            <div className="text-muted">
              <Button size="sm" variant="text">
                <Icon.ThreeDotsVertical />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* <Card className="mb-2 border-none">
        <Card.Header>
          <Stack direction="vertical">
            <h3 className="mb-1 d-flex align-items-center">
              <Icon.Building className="me-2" />
              Sous organisations
            </h3>
            <div className="text-muted">
              Liste des régions rattachées à l'équipe nationale
            </div>
          </Stack>
        </Card.Header>
        <Card.Body>
          <StaticTable
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
        </Card.Body>
      </Card> */}
    </>
  );
};

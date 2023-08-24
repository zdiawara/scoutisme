import { FC } from "react";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import { PageHeader } from "pages/common";
import { Link, useParams } from "react-router-dom";
import { LINKS } from "utils";
import { useQuery } from "@tanstack/react-query";
import { NATURE, QUERY_KEY } from "utils/constants";
import { organisationApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import {
  DetailOrganisation,
  Organigramme,
  OrganisationMembres,
  SousOrganisation,
} from "./view";
import { NavLink } from "react-router-dom";

const ViewOrganisation: FC = () => {
  const { id } = useParams();
  const { data: organisation, isLoading } = useQuery({
    queryKey: [QUERY_KEY.organisations, id],
    queryFn: ({ queryKey }) => {
      return organisationApi.findById<OrganisationResource>(
        queryKey[1] as string
      );
    },
  });

  const actions = () => {
    if (!organisation) {
      return null;
    }

    return (
      <div className="ms-auto d-flex">
        <Link
          className="rounded-corner btn btn-danger"
          to={LINKS.organisations.edit(organisation.id)}
        >
          <i className="uil-edit-alt"></i> Modifier
        </Link>
      </div>
    );
  };

  if (isLoading || !organisation) {
    return <span>chargement ...</span>;
  }

  const hasParent =
    organisation.parents?.length && organisation.parents?.length > 1;

  return (
    <>
      {hasParent && (
        <Breadcrumb className="mb-0 fs-4">
          {organisation.parents?.map((parent) =>
            parent.id === organisation.id ? (
              <Breadcrumb.Item key={parent.id} active>
                {parent.nom}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item
                as={NavLink}
                to={LINKS.organisations.view(parent.id)}
                key={parent.id}
                href="/"
              >
                {parent.nom}
              </Breadcrumb.Item>
            )
          )}
        </Breadcrumb>
      )}
      <PageHeader.View
        title={organisation.nom}
        subtitle={`Code : ${organisation.code}`}
        right={actions()}
        className={hasParent ? "mb-4 mt-2" : "my-4"}
      />
      <Row>
        <Col xl={3} lg={3}>
          <Organigramme
            parents={organisation.parents}
            organisation={{
              nature: organisation.nature.nom,
              nom: organisation.nom,
            }}
          />
        </Col>
        <Col xl={9} lg={9}>
          <DetailOrganisation organisation={organisation} />
          <OrganisationMembres organisation={organisation} />
          {organisation.nature.code !== NATURE.unite && (
            <SousOrganisation organisation={organisation} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ViewOrganisation;

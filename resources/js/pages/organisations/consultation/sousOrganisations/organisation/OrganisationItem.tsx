import { FC } from "react";
import { OrganisationResource } from "types/organisation.type";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import * as Icon from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

type OrganisationItemProps = {
  organisation: OrganisationResource;
};

export const OrganisationItem: FC<OrganisationItemProps> = ({ organisation }) => {
  const { nature, nom, type, id } = organisation;
  return (
    <>
      <div className="me-auto">
        <Link to={LINKS.organisations.view(id)} className="d-block fw-semibold mb-1 text-black">
          {nom}
        </Link>
        <div className="fw-light fs-6">
          {nature.nom}
          {type ? <span className="text-muted"> / {type.nom}</span> : ""}
        </div>
      </div>
      <Button
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        as={Link}
        to={LINKS.organisations.view(id)}
        variant="default"
      >
        <Icon.ArrowRight />
      </Button>
    </>
  );
};

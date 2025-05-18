import { FC } from "react";
import { OrganisationResource } from "types/organisation.type";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { OrganisationItemActions } from "./OrganisationItemActions";

type OrganisationItemProps = {
  organisation: OrganisationResource;
};

export const OrganisationItem: FC<OrganisationItemProps> = ({
  organisation,
}) => {
  const { nature, nom, type, id } = organisation;
  return (
    <>
      <div className="me-auto">
        <Link
          to={LINKS.organisations.view(id)}
          className="d-block fw-semibold mb-1 text-black"
        >
          {nom}
        </Link>
        <div className="fw-light fs-6">
          {nature.nom}
          {type ? <span className="text-muted"> / {type.nom}</span> : ""}
        </div>
      </div>
      <OrganisationItemActions organisation={organisation} />
    </>
  );
};

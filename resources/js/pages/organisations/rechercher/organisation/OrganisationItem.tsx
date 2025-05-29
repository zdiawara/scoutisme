import { FC } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { OrganisationResource } from "types/organisation.type";
import { LINKS } from "utils";
import { NATURE } from "utils/constants";
import * as Icon from "react-bootstrap-icons";

type Props = {
  organisation: OrganisationResource;
};

export const OrganisationItem: FC<Props> = ({ organisation }) => {
  const link = LINKS.organisations.view(organisation.id);

  return (
    <>
      <div className="align-self-center">
        <Link to={link} className="fw-semibold fs-5 text-black">
          {organisation.nom}
        </Link>
        <span className="ms-1 fs-6 fw-light">{organisation.code}</span>

        <div className="fw-light">
          {organisation.nature.nom}
          {organisation.nature.code === NATURE.unite && (
            <span> / {organisation.type?.nom}</span>
          )}
        </div>
      </div>

      <Button
        //@ts-ignore
        as={Link}
        to={link}
        variant="default"
      >
        <Icon.Eye />
      </Button>
    </>
  );
};

import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { OrganisationIdentite } from "./identite/OrganisationIdentite";
import { OrganisationAdresse } from "./adresse";

type DetailOrganisationProps = {
  organisation: OrganisationResource;
};

export const DetailOrganisation: FC<DetailOrganisationProps> = ({
  organisation,
}) => {
  return (
    <>
      <ListGroup className="mb-2">
        <OrganisationIdentite organisation={organisation} />
      </ListGroup>
      <ListGroup className="mb-3">
        <OrganisationAdresse organisation={organisation} />
      </ListGroup>
    </>
  );
};

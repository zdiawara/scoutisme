import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { OrganisationItem } from "./OrganisationItem";

type Props = {
  organisations?: OrganisationResource[];
};

export const ListOrganisation: FC<Props> = ({ organisations }) => {
  if (!organisations?.length) {
    return <ListGroup.Item className="fw-light text-center">Aucune organisation trouvée</ListGroup.Item>;
  }

  return (
    <>
      {organisations?.map((organisation) => (
        <ListGroup.Item className="d-flex justify-content-between align-items-start" key={organisation.id}>
          <OrganisationItem organisation={organisation} />
        </ListGroup.Item>
      ))}
    </>
  );
};

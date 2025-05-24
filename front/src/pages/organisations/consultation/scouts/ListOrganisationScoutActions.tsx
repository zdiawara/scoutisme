import { FC, useState } from "react";
import { OrganisationResource } from "types/organisation.type";

import { Button } from "react-bootstrap";
import { CreerScout } from "./scout/CreerScout";

type Props = {
  organisation: OrganisationResource;
};

export const ListOrganisationScoutActions: FC<Props> = ({ organisation }) => {
  const [action, setAction] = useState<string | undefined>();

  const closeModal = () => {
    setAction(undefined);
  };

  return (
    <>
      <Button
        variant="secondary"
        className="ms-1"
        onClick={() => {
          setAction("ajouter");
        }}
      >
        Ajouter
      </Button>

      {action === "ajouter" && (
        <CreerScout closeModal={closeModal} organisation={organisation} />
      )}
    </>
  );
};

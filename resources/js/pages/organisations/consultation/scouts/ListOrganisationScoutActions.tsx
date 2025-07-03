import { FC, useState } from "react";
import { OrganisationResource } from "types/organisation.type";

import { Button } from "react-bootstrap";
import { CreerScout } from "./scout/CreerScout";
import { useDroits } from "hooks/useDroits";

type Props = {
  organisation: OrganisationResource;
};

export const ListOrganisationScoutActions: FC<Props> = ({ organisation }) => {
  const [action, setAction] = useState<string | undefined>();
  const droits = useDroits();

  const closeModal = () => {
    setAction(undefined);
  };

  return (
    <>
      {droits.personne.scouts.creer && (
        <Button
          variant="secondary"
          className="ms-1"
          onClick={() => {
            setAction("ajouter");
          }}
        >
          Ajouter
        </Button>
      )}

      {action === "ajouter" && <CreerScout closeModal={closeModal} organisation={organisation} />}
    </>
  );
};

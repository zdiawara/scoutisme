import { FC, useState } from "react";
import { OrganisationResource } from "types/organisation.type";

import { Button } from "react-bootstrap";
import { useDroits } from "hooks/useDroits";
import { CreerScoutModal } from "pages/personnes/creer";

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
          onClick={() => {
            setAction("ajouter");
          }}
          className="ms-1"
          variant="secondary"
          style={{ minWidth: "150px" }}
        >
          Ajouter un scout
        </Button>
      )}

      {action === "ajouter" && <CreerScoutModal closeModal={closeModal} uniteId={organisation.id} />}
    </>
  );
};

import { FC, useState } from "react";
import { OrganisationResource } from "types/organisation.type";
import { SousOrganisationModal } from "./SousOrganisationModal";

import { useDroits } from "hooks/useDroits";
import { Button } from "react-bootstrap";
import { TYPE_ORGANISATION } from "utils/constants";

type SousOrganisationActionsProps = {
  organisation: OrganisationResource;
};

export const SousOrganisationActions: FC<SousOrganisationActionsProps> = ({ organisation }) => {
  const [action, setAction] = useState<string | undefined>();
  const droits = useDroits();

  const closeModal = () => {
    setAction(undefined);
  };

  if (
    !droits.organisation.creer ||
    (organisation.type?.code && [TYPE_ORGANISATION.conseil_national].includes(organisation.type?.code))
  ) {
    return null;
  }
  return (
    <>
      <Button variant="secondary" className="ms-1" onClick={() => setAction("ajouter_sous_organisation")}>
        Ajouter
      </Button>
      {action === "ajouter_sous_organisation" && (
        <SousOrganisationModal closeModal={closeModal} organisation={organisation} />
      )}
    </>
  );
};

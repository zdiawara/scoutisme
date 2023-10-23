import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { SousOrganisationModal } from "./SousOrganisationModal";

type SousOrganisationActionsProps = {
  organisation: OrganisationResource;
};

export const SousOrganisationActions: FC<SousOrganisationActionsProps> = ({
  organisation,
}) => {
  const [action, setAction] = useState<string | undefined>();

  const onSelect = (code: string) => () => {
    setAction(code);
  };

  const closeModal = () => {
    setAction(undefined);
  };

  return (
    <>
      <Button
        onClick={onSelect("ajouter_sous_organisation")}
        variant="secondary"
      >
        Ajouter sous orga.
      </Button>
      {action === "ajouter_sous_organisation" && (
        <SousOrganisationModal
          closeModal={closeModal}
          organisation={organisation}
        />
      )}
    </>
  );
};

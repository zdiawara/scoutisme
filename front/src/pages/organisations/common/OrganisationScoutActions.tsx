import { ScoutModal } from "pages/personnes/modal";
import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";

type OrganisationScoutActionsProps = {
  organisation: OrganisationResource;
};

export const OrganisationScoutActions: FC<OrganisationScoutActionsProps> = ({
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
        variant="secondary"
        className="me-2"
        onClick={onSelect("ajouter_membre")}
      >
        <i className="uil uil-plus"></i> Ajouter scout
      </Button>
      {action === "ajouter_membre" && (
        <ScoutModal closeModal={closeModal} organisation={organisation} />
      )}
    </>
  );
};

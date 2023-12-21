import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { CreerPaiementModal } from "pages/paiements/modal";

type ListPaiementActionsProps = {
  personne: PersonneResource;
  annee: string;
};

export const ListPaiementActions: FC<ListPaiementActionsProps> = ({
  personne,
  annee,
}) => {
  const [action, setAction] = useState<string | undefined>();

  const closeModal = () => {
    setAction(undefined);
  };

  const onSelect = (code: string) => () => {
    setAction(code);
  };

  return (
    <>
      <Button
        onClick={onSelect("payer")}
        size="sm"
        className="ms-2"
        variant="primary"
      >
        Payer
      </Button>

      {action === "payer" && (
        <CreerPaiementModal
          closeModal={closeModal}
          personne={personne}
          annee={annee}
        />
      )}
    </>
  );
};

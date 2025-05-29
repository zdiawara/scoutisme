import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { CreerPaiementModal } from "pages/paiements/modal";
import { useDroits } from "hooks/useDroits";

type ListPaiementActionsProps = {
  personne: PersonneResource;
  annee: string;
};

export const ListPaiementActions: FC<ListPaiementActionsProps> = ({
  personne,
  annee,
}) => {
  const [action, setAction] = useState<string | undefined>();
  const { cotisation } = useDroits();
  const closeModal = () => {
    setAction(undefined);
  };

  const onSelect = (code: string) => () => {
    setAction(code);
  };

  if (!cotisation.paiements.creer) {
    return null;
  }
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

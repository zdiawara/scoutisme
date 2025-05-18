import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";

// import { useDroits } from "hooks/useDroits";
import { CreerPaiementModal } from "pages/paiements/modal";

type PayerCotisationActionProps = {
  personne: PersonneResource;
  annee: string;
};

export const PayerCotisationAction: FC<PayerCotisationActionProps> = ({
  personne,
  annee,
}) => {
  const [action, setAction] = useState<string | undefined>();
  // const { cotisation } = useDroits();
  const closeModal = () => {
    setAction(undefined);
  };

  const onSelect = (code: string) => () => {
    setAction(code);
  };

  // if (!cotisation.paiements.creer) {
  //   return null;
  // }
  return (
    <>
      <Button
        size="sm"
        className="ms-1"
        onClick={onSelect("payer")}
        variant="secondary"
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

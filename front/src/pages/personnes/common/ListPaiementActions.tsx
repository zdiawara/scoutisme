import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { AsyncSelectSimple } from "components";
import { PaiementModal } from "pages/paiements/modal";

type ListPaiementActionsProps = {
  personne: PersonneResource;
};

export const ListPaiementActions: FC<ListPaiementActionsProps> = ({
  personne,
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
      <div className="d-flex">
        <AsyncSelectSimple
          name="test"
          onChange={() => {}}
          fetchOptions={() => {
            return Promise.resolve([
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
            ]);
          }}
        />

        <Button
          onClick={onSelect("payer")}
          size="sm"
          className="ms-2"
          variant="primary"
        >
          Payer
        </Button>
      </div>

      {action === "payer" && (
        <PaiementModal closeModal={closeModal} personne={personne} />
      )}
    </>
  );
};

import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { PaiementResource, PersonneResource } from "types/personne.type";
import { PaiementItem } from "./PaiementItem";

type Props = {
  paiements?: PaiementResource[];
  personne: PersonneResource;
};

export const ListPaiement: FC<Props> = ({ paiements, personne }) => {
  if (!paiements?.length) {
    return (
      <ListGroup.Item className="text-center text-muted">
        Aucun paiement effectué
      </ListGroup.Item>
    );
  }
  return (
    <>
      {paiements?.map((paiement) => (
        <ListGroup.Item
          key={paiement.id}
          className="d-flex justify-content-between align-items-start"
        >
          <PaiementItem
            paiement={paiement}
            personne={personne}
            key={paiement.id}
          />
        </ListGroup.Item>
      ))}
    </>
  );
};

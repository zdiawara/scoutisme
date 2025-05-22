import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { PaiementResource } from "types/personne.type";
import { PaiementItem } from "./PaiementItem";

type Props = {
  paiements?: PaiementResource[];
};

export const ListPaiement: FC<Props> = ({ paiements }) => {
  if (!paiements?.length) {
    return (
      <ListGroup.Item className="text-center text-muted">
        Aucun paiement effectué
      </ListGroup.Item>
    );
  }

  if (!paiements?.length) {
    return (
      <ListGroup.Item className="fw-light text-center">
        Aucun paiement trouvé
      </ListGroup.Item>
    );
  }

  return (
    <>
      {paiements.map((paiement) => (
        <ListGroup.Item
          key={paiement.id}
          className="d-flex justify-content-between align-items-start"
        >
          <PaiementItem paiement={paiement} key={paiement.id} />
        </ListGroup.Item>
      ))}
    </>
  );
};

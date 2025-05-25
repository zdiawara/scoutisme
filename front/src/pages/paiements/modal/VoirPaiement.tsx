import { MontantFormatText, View } from "components";
import { FC } from "react";
import { Button, Col, ListGroup, Modal, Row, Stack } from "react-bootstrap";
import { PaiementResource } from "types/personne.type";
import { EtatPaiement } from "../common";
import { DateFormater } from "utils/DateUtils";

type ModalProps = {
  closeModal: () => void;
  paiement: PaiementResource;
};

export const VoirPaiementModal: FC<ModalProps> = ({ closeModal, paiement }) => {
  return (
    <Modal show={true} onHide={closeModal} size="lg" animation={false}>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">
          Paiement N° {paiement.numero}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-gray-100">
        <ListGroup>
          <ListGroup.Item>
            <Row className="g-3">
              <Col xs={6}>
                <View.Item label="Numero">{paiement.numero}</View.Item>
              </Col>
              <Col xs={6}>
                <View.Item label="Montant">
                  <Stack direction="horizontal">
                    <MontantFormatText value={paiement.montant} withDevise />
                    &nbsp;
                    <EtatPaiement etat={paiement.etat} />
                  </Stack>
                </View.Item>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="g-3">
              <Col xs={12}>
                <View.Item label="Date soumission">
                  {DateFormater.toDateTextTime(paiement.created_at)}&nbsp;
                  {paiement.createur?.name && (
                    <>Par {paiement.createur?.name}</>
                  )}
                </View.Item>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="g-3">
              <Col xs={12}>
                <View.Item label="Date traitement">
                  {DateFormater.toDateTextTime(paiement.date_traitement) || "-"}
                  &nbsp;
                  {paiement.valideur?.name && (
                    <>Par {paiement.valideur?.name}</>
                  )}
                </View.Item>
              </Col>
            </Row>
          </ListGroup.Item>
          {paiement.etat === "rejet" && (
            <ListGroup.Item>
              <Row className="g-3">
                <Col xs={12}>
                  <View.Item label="Motif rejet">
                    {paiement.commentaire}
                  </View.Item>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className="shadow-sm" onClick={closeModal}>
          Quitter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

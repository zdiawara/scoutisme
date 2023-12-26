import { MontantFormatText, View } from "components";
import { FC } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { PaiementResource } from "types/personne.type";
import { EtatPaiement } from "../common";
import { dateFormater } from "utils/functions";

type ModalProps = {
  closeModal: () => void;
  paiement: PaiementResource;
};

export const VoirPaiementModal: FC<ModalProps> = ({ closeModal, paiement }) => {
  const { personne } = paiement.cotisation;
  return (
    <Modal show={true} onHide={closeModal} size="lg" animation={false}>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">
          Paiement N° {paiement.numero}
        </Modal.Title>
        <div className="ms-2">
          {personne?.nom} {personne?.prenom}
        </div>
      </Modal.Header>
      <Modal.Body className="p-3">
        <Card body>
          <Row className="g-3">
            <Col xs={4}>
              <View.Item label="Numéro">{paiement.numero}</View.Item>
            </Col>
            <Col xs={4}>
              <View.Item label="Montant">
                <MontantFormatText value={paiement.montant} />
              </View.Item>
            </Col>
            <Col xs={4}>
              <View.Item label="Date soumission">
                {paiement.created_at}
              </View.Item>
            </Col>
            <Col xs={4}>
              <View.Item label="Etat">
                <EtatPaiement etat={paiement.etat} />
              </View.Item>
            </Col>
            <Col xs={8}>
              <View.Item label="Motif rejet">{paiement.commentaire}</View.Item>
            </Col>
          </Row>
        </Card>

        <Card body>
          <Row className="g-3">
            <Col xs={4}>
              <View.Item label="Crée par">{paiement.createur?.name}</View.Item>
            </Col>
            <Col xs={4}>
              <View.Item label="Traité par">
                {paiement.valideur?.name}
              </View.Item>
            </Col>
            <Col xs={4}>
              <View.Item label="Date traitement">
                {dateFormater.formatStr(
                  paiement.date_traitement,
                  "dd/MM/yyyy HH:mm"
                )}
              </View.Item>
            </Col>
          </Row>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className="shadow-sm" onClick={closeModal}>
          Quitter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

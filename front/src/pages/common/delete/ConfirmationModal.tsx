import { FC } from "react";
import { Button, Modal } from "react-bootstrap";

type ModalProps = {
  title?: string;
  description?: string;
  onCancel: () => void;
  onValide: () => void;
};

export const ConfirmationModal: FC<ModalProps> = ({
  onValide,
  onCancel,
  title = "Confirmation",
  description,
}) => {
  return (
    <Modal show={true} onHide={onCancel} size="sm" animation={false}>
      <Modal.Body className="p-4">
        <div className="text-center">
          <i className="dripicons-checkmark h1"></i>
          <h4 className="mt-2 text-primary">{title}</h4>
          <div className="mt-3 mb-3">{description}</div>
          <Button variant="danger" className="me-2" onClick={onCancel}>
            Non
          </Button>
          <Button variant="primary" className="shadow-sm" onClick={onValide}>
            Oui
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";

type ModalProps = {
  closeModal: () => void;
  query_key: string;
  onDelete: () => Promise<void>;
};

export const DeleteConfirmationModal: FC<ModalProps> = ({
  closeModal,
  onDelete,
  query_key,
}) => {
  const query = useQueryClient();

  const deleteTypeUnite = async () => {
    await onDelete();
    query.invalidateQueries([query_key]);
    closeModal();
  };

  return (
    <Modal show={true} onHide={closeModal} size="sm" animation={false}>
      <div className="bg-light">
        <Modal.Body className="p-4">
          <div className="text-center">
            <i className="dripicons-checkmark h1"></i>
            <h4 className="mt-2">Confirmation</h4>
            <p className="mt-3">
              Vous voulez vraiment continuer la suppression ?
            </p>
            <Button variant="primary" className="me-2" onClick={closeModal}>
              Non
            </Button>
            <Button
              variant="danger"
              className="shadow-sm"
              onClick={deleteTypeUnite}
            >
              Oui
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

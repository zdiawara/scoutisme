import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { typeOrganisationApi } from "api";
import { TypeOrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { useQueries, useQueryClient } from "@tanstack/react-query";

type TypeUniteModalProps = {
  closeModal: () => void;
  selected: TypeOrganisationResource;
};

/**
 * Creer ou modifier un type d'unité
 * @param param0
 * @returns
 */
export const DeleteTypeUniteModal: FC<TypeUniteModalProps> = ({
  closeModal,
  selected,
}) => {
  const query = useQueryClient();

  const deleteTypeUnite = () => {
    return typeOrganisationApi.delete(selected.id).then(() => {
      query.invalidateQueries([QUERY_KEY.typesUnites]);
      closeModal();
    });
  };

  return (
    <Modal show={true} onHide={closeModal} size="sm" animation={false}>
      <div className="modal-filled bg-danger">
        <Modal.Body className="p-4">
          <div className="text-center">
            <i className="dripicons-checkmark h1"></i>
            <h4 className="mt-2">Confirmation</h4>
            <p className="mt-3">
              Vous voulez vraiment continuer la suppression ?
            </p>
            <Button
              variant="outline-light"
              className="me-2"
              onClick={closeModal}
            >
              Non
            </Button>
            <Button
              variant="light"
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

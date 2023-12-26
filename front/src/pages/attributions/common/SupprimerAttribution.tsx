import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attributionApi } from "api";
import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { AttributionResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";

type SupprimerAttributionProps = {
  closeModal: () => void;
  attribution: AttributionResource;
};

export const SupprimerAttribution: FC<SupprimerAttributionProps> = ({
  closeModal,
  attribution,
}) => {
  const query = useQueryClient();

  const { mutate, isLoading } = useMutation({
    networkMode: "offlineFirst",
    mutationFn: () => {
      return attributionApi.delete(attribution.id);
    },
    onSuccess: () => {
      const { personne, organisation } = attribution;
      query.invalidateQueries([QUERY_KEY.attributions, personne.id]);
      query.invalidateQueries([QUERY_KEY.personnes, personne.id]);
      query.invalidateQueries([QUERY_KEY.scouts, organisation.id]);
      query.invalidateQueries([QUERY_KEY.direction, organisation.id]);
      closeModal();
    },
  });

  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className="text-black">
          Supprimer une attribution
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Vous êtes sur le point de supprimer la mission de&nbsp;
          <strong className="text-black">
            {attribution.personne.prenom} {attribution.personne.nom}
          </strong>
          &nbsp; au poste de&nbsp;
          <strong className="text-black">{attribution.fonction.nom}</strong>
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="light" onClick={closeModal} disabled={isLoading}>
          Annuler
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            mutate();
          }}
          disabled={isLoading}
        >
          Continuer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

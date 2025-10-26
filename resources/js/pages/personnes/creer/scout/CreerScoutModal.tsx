import { FC } from "react";
import { Modal } from "react-bootstrap";
import { CoordonneeForm } from "../CoordonneeForm";
import { IdentiteForm } from "../IdentiteForm";
import { ReferentForm } from "../ReferentForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buildMessageError, NotificationError, NotificationSuccess } from "utils/notification";
import { toast } from "react-toastify";
import { QUERY_KEY } from "utils/constants";
import { personneConverter } from "pages/personnes/form";
import { DateFormater } from "utils/DateUtils";
import { PersonneInput } from "types/personne.type";
import { useCreatePersonneStep } from "../../hooks/useCreatePersonneStep";
import { ResumeForm } from "../ResumeForm";
import { personneApi } from "api/index";

type Props = {
  closeModal: () => void;
  uniteId: string;
};

export const CreerScoutModal: FC<Props> = ({ closeModal, uniteId }) => {
  const createPersonneStep = useCreatePersonneStep();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: PersonneInput) => {
      const body = personneConverter.toBody(data);
      body.attribution = {
        organisation_id: uniteId,
        date_debut: DateFormater.toISO(new Date()),
      };
      await personneApi.createScout(body);
    },
    onSuccess: () => {
      toast("Le scout a été créé avec succès !", NotificationSuccess);
      queryClient.invalidateQueries([QUERY_KEY.personnes]);
      queryClient.invalidateQueries([QUERY_KEY.scouts, uniteId]);
      closeModal();
    },
    onError: (e: unknown) => {
      toast(buildMessageError(e), NotificationError);
    },
  });

  const renderContent = () => {
    switch (createPersonneStep.currentStep) {
      case 1:
        return (
          <IdentiteForm
            defaultValues={createPersonneStep.personneInput.identite}
            save={createPersonneStep.saveIdentite}
            prevStep={closeModal}
            prevLabel="Quitter"
            nomEtape="Etape 1 / 4"
          />
        );
      case 2:
        return (
          <CoordonneeForm
            prevStep={createPersonneStep.prevStep}
            save={createPersonneStep.saveCoordonnee}
            defaultValues={createPersonneStep.personneInput.coordonnee}
            nomEtape="Etape 2 / 4"
          />
        );
      case 3:
        return (
          <ReferentForm
            prevStep={createPersonneStep.prevStep}
            save={createPersonneStep.savePersonneAContacter}
            defaultValues={createPersonneStep.personneInput.personneAContacter}
            nomEtape="Etape 3 / 4"
          />
        );
      case 4:
        return (
          <ResumeForm
            onSave={() => {
              mutate(createPersonneStep.personneInput);
            }}
            prevStep={createPersonneStep.prevStep}
            nomPersonne={`${createPersonneStep.personneInput.identite.prenom} ${createPersonneStep.personneInput.identite.nom}`}
            nomFonction="Scout"
            nomEtape="Etape 4 / 4"
          />
        );
      default:
        break;
    }
  };

  return (
    <Modal centered size="lg" show={true}>
      <Modal.Header>
        <Modal.Title className="fw-semibold">Créer un scout</Modal.Title>
      </Modal.Header>
      {renderContent()}
    </Modal>
  );
};

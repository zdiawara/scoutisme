import { FC } from "react";
import { Modal, Stack } from "react-bootstrap";
import { CoordonneeForm } from "../CoordonneeForm";
import { IdentiteForm } from "../IdentiteForm";
import { ReferentForm } from "../ReferentForm";
import { personneApi } from "api/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buildMessageError, NotificationError, NotificationSuccess } from "utils/notification";
import { toast } from "react-toastify";
import { QUERY_KEY } from "utils/constants";
import { personneConverter } from "pages/personnes/form";
import { DateFormater } from "utils/DateUtils";
import { PersonneInput } from "types/personne.type";
import { useCreatePersonneStep } from "../../hooks/useCreatePersonneStep";
import { ResumeForm } from "../ResumeForm";

type Props = {
  closeModal: () => void;
  organisationId: string;
};

export const CreerSoutienAuxAdultesModal: FC<Props> = ({ closeModal, organisationId }) => {
  const createPersonneStep = useCreatePersonneStep();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: PersonneInput) => {
      const body = personneConverter.toBody(data);
      body.attribution = {
        organisation_id: organisationId,
        date_debut: DateFormater.toISO(new Date()),
      };
      await personneApi.createSoutienAuxAdultes(body);
    },
    onSuccess: () => {
      toast("Le soutien aux adultes a bien été créé !", NotificationSuccess);
      queryClient.invalidateQueries([QUERY_KEY.soutien_aux_adultes]);
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
            nomFonction="Soutien aux adultes"
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
        <Stack>
          <Modal.Title className="fw-semibold">Créer un adulte</Modal.Title>
          <div className="mt-1">
            Au poste de <b>soutien aux adultes</b>
          </div>
        </Stack>
      </Modal.Header>
      {renderContent()}
    </Modal>
  );
};

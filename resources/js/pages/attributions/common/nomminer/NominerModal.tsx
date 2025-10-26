import { FC, useState } from "react";
import { Modal, Stack } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { FonctionResource } from "types/personne.type";
import { ChoixPersonne } from "./ChoixPersonne";
import { NomminerPersonneExistante } from "./NomminerPersonneExistante";
import { NomminerNouvellePersonne } from "./NomminerNouvellePersonne";

type NominerModalProps = {
  organisation: OrganisationResource;
  fonction: FonctionResource;
  closeModal: () => void;
};

export enum Etape {
  CHOISIR_PERSONNE_EXISTANTE = 1,
  PERSONNE_IDENTITE = 2,
  PERSONNE_COORDONNEE = 3,
  PERSONNE_A_CONTACTER = 4,
  RESUME = 5,
}

export const NominerModal: FC<NominerModalProps> = ({ organisation, fonction, closeModal }) => {
  const [currentStep, setCurrentStep] = useState(Etape.CHOISIR_PERSONNE_EXISTANTE);
  const [action, setAction] = useState<string>("exist");

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderContent = () => {
    if (currentStep === Etape.CHOISIR_PERSONNE_EXISTANTE) {
      return <ChoixPersonne value={action} setValue={setAction} nextStep={nextStep} closeModal={closeModal} />;
    }

    if (action === "new") {
      return (
        <NomminerNouvellePersonne
          closeModal={closeModal}
          currentStep={currentStep}
          fonction={fonction}
          organisation={organisation}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    }

    return (
      <NomminerPersonneExistante
        prevStep={prevStep}
        closeModal={closeModal}
        organisationId={organisation.id}
        fonctionId={fonction.id}
      />
    );
  };

  return (
    <Modal centered size="lg" show={true}>
      <Modal.Header className="">
        <Stack>
          <Modal.Title className="fw-semibold">Nommination</Modal.Title>
          <div className="mt-1">
            Au poste de <b>{fonction.nom}</b>
          </div>
        </Stack>
      </Modal.Header>
      {renderContent()}
    </Modal>
  );
};

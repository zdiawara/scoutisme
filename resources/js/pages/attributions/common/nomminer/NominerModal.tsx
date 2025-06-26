import { FC, useState } from "react";
import { Modal, Stack } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { FonctionResource } from "types/personne.type";
import { ChoixPersonne } from "./ChoixPersonne";
import { NomminerNouvellePersonne } from "./NomminerNouvellePersonne";
import { NomminerPersonneExistante } from "./NomminerPersonneExistante";

type NominerModalProps = {
  organisation: OrganisationResource;
  fonction: FonctionResource;
  closeModal: () => void;
};

/**
 *
 * @param param0
 * @returns
 */
export const NominerModal: FC<NominerModalProps> = ({ organisation, fonction, closeModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [action, setAction] = useState<string>("exist");

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return <ChoixPersonne value={action} setValue={setAction} nextStep={nextStep} closeModal={closeModal} />;
    }
    if (action === "new") {
      return (
        <NomminerNouvellePersonne
          closeModal={closeModal}
          prevStep={prevStep}
          organisationId={organisation.id}
          fonctionId={fonction.id}
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
    <Modal centered show={true}>
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

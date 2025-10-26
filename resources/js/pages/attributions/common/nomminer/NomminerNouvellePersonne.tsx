import { useMutation, useQueryClient } from "@tanstack/react-query";
import { personneApi } from "api";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import {
  CoordonneeInput,
  FonctionResource,
  IdentiteInput,
  PersonneAContacterInput,
  PersonneDebutFonctionInput,
  PersonneInput,
} from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { DateFormater } from "utils/DateUtils";
import { buildMessageError, NotificationError, NotificationSuccess } from "utils/notification";
import { Etape } from "./NominerModal";
import { IdentiteForm } from "pages/personnes/creer/IdentiteForm";
import { CoordonneeForm } from "pages/personnes/creer/CoordonneeForm";
import { ReferentForm } from "pages/personnes/creer/ReferentForm";
import { ResumeForm } from "pages/personnes/creer/ResumeForm";
import { personneConverter } from "pages/personnes/form";
import { OrganisationResource } from "types/organisation.type";

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  closeModal: () => void;
  organisation: OrganisationResource;
  fonction: FonctionResource;
  currentStep: number;
};

export const NomminerNouvellePersonne: FC<Props> = ({
  currentStep,
  closeModal,
  prevStep,
  nextStep,
  organisation,
  fonction,
}) => {
  const query = useQueryClient();

  const [personneInput, setPersonneInput] = useState<PersonneInput & PersonneDebutFonctionInput>(
    {} as PersonneInput & PersonneDebutFonctionInput
  );

  const saveCoordonnee = (coordonnee: CoordonneeInput) => {
    setPersonneInput((prev) => ({ ...prev, coordonnee }));
    nextStep();
  };

  const savePersonneAContacter = (personneAContacter: PersonneAContacterInput) => {
    setPersonneInput((prev) => ({ ...prev, personneAContacter }));
    nextStep();
  };

  const saveIdentite = (identite: IdentiteInput) => {
    setPersonneInput((prev) => ({ ...prev, identite }));
    nextStep();
  };

  const { mutate } = useMutation({
    mutationFn: async (data: PersonneInput & PersonneDebutFonctionInput) => {
      const body = personneConverter.toBody(data);
      body.attribution = {
        organisation_id: organisation.id,
        fonction_id: fonction.id,
        date_debut: DateFormater.toISO(data.date_debut),
      };
      await personneApi.createMembreDirection(body);
    },
    onSuccess: () => {
      toast("Personne nomminée avec succès !", NotificationSuccess);
      query.invalidateQueries([QUERY_KEY.direction, organisation.id]);
      query.invalidateQueries([QUERY_KEY.personnes]);
      closeModal();
    },
    onError: (e: unknown) => {
      toast(buildMessageError(e), NotificationError);
    },
  });

  const createPersonne = (data: PersonneDebutFonctionInput) => {
    mutate({ ...personneInput, date_debut: data.date_debut });
  };

  if (currentStep === Etape.PERSONNE_IDENTITE) {
    return (
      <IdentiteForm
        save={saveIdentite}
        defaultValues={personneInput.identite}
        prevStep={prevStep}
        prevLabel="Précédent"
        nomEtape="Etape 1 / 4"
      />
    );
  }
  if (currentStep === Etape.PERSONNE_COORDONNEE) {
    return (
      <CoordonneeForm
        save={saveCoordonnee}
        defaultValues={personneInput.coordonnee}
        prevStep={prevStep}
        nomEtape="Etape 2 / 4"
      />
    );
  }

  if (currentStep === Etape.PERSONNE_A_CONTACTER) {
    return (
      <ReferentForm
        save={savePersonneAContacter}
        defaultValues={personneInput.personneAContacter}
        prevStep={prevStep}
        nomEtape="Etape 3 / 4"
      />
    );
  }

  return (
    <ResumeForm
      prevStep={prevStep}
      onSave={createPersonne}
      nomEtape="Etape 4 / 4"
      nomPersonne={`${personneInput.identite.prenom} ${personneInput.identite.nom}`}
      nomFonction={fonction.nom}
    />
  );
};

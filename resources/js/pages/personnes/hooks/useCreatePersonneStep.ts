import { useCallback, useState } from "react";
import { CoordonneeInput, IdentiteInput, PersonneAContacterInput, PersonneInput } from "types/personne.type";

export const useCreatePersonneStep = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [personneInput, setPersonneInput] = useState<PersonneInput>({} as PersonneInput);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
  }, []);

  const saveCoordonnee = useCallback(
    (coordonnee: CoordonneeInput) => {
      setPersonneInput((prev) => ({ ...prev, coordonnee }));
      nextStep();
    },
    [nextStep]
  );

  const savePersonneAContacter = useCallback(
    (personneAContacter: PersonneAContacterInput) => {
      setPersonneInput((prev) => ({ ...prev, personneAContacter }));
      nextStep();
    },
    [nextStep]
  );

  const saveIdentite = useCallback(
    (identite: IdentiteInput) => {
      setPersonneInput((prev) => ({ ...prev, identite }));
      nextStep();
    },
    [nextStep]
  );

  return { saveIdentite, savePersonneAContacter, saveCoordonnee, prevStep, personneInput, currentStep };
};

import { SubmitButton } from "components/buttons";
import { PersonneAContacterForm } from "pages/personnes/form";
import { FC } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { PersonneAContacterInput } from "types/personne.type";

type Props = {
  prevStep: () => void;
  save: (personneAContacter: PersonneAContacterInput) => void;
  defaultValues?: PersonneAContacterInput;
  nomEtape: string;
};

export const ReferentForm: FC<Props> = ({ prevStep, save, defaultValues, nomEtape }) => {
  const methods = useForm<PersonneAContacterInput>({
    defaultValues: { personne_a_contacter: defaultValues?.personne_a_contacter },
  });

  return (
    <FormProvider {...methods}>
      <Modal.Body className="bg-gray-100">
        <Row className="g-2">
          <Col xs={12}>
            <strong>{nomEtape}</strong> - Personne à contacter
          </Col>
          <PersonneAContacterForm />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="me-auto" variant="outline-primary" onClick={() => prevStep()}>
          Précédent
        </Button>
        <SubmitButton onClick={methods.handleSubmit(save)}>Suivant</SubmitButton>
      </Modal.Footer>
    </FormProvider>
  );
};

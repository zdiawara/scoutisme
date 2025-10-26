import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitButton } from "components/buttons";
import { PersonneIdentiteForm, personneIdentiteSchema } from "pages/personnes/form";
import { FC } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { IdentiteInput } from "types/personne.type";

type Props = {
  save: (identite: IdentiteInput) => void;
  prevStep: () => void;
  defaultValues: IdentiteInput;
  prevLabel: string;
  nomEtape: string;
};

export const IdentiteForm: FC<Props> = ({ prevStep, save, defaultValues, prevLabel, nomEtape }) => {
  const methods = useForm<IdentiteInput>({
    resolver: yupResolver(personneIdentiteSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Modal.Body className="bg-gray-100">
        <Row className="g-2">
          <Col xs={12}>
            <strong>{nomEtape}</strong> - Identité de la personne
          </Col>
          <PersonneIdentiteForm />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="me-auto" variant="outline-primary" onClick={prevStep}>
          {prevLabel}
        </Button>
        <SubmitButton onClick={methods.handleSubmit(save)}>Suivant</SubmitButton>
      </Modal.Footer>
    </FormProvider>
  );
};

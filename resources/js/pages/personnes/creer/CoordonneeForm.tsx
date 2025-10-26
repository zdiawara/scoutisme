import { SubmitButton } from "components/buttons";
import { PersonneCoordonneForm, personneCoordonneSchema } from "pages/personnes/form";
import { FC } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CoordonneeInput } from "types/personne.type";

type Props = {
  prevStep: () => void;
  save: (coordonnee: CoordonneeInput) => void;
  defaultValues: CoordonneeInput;
  nomEtape: string;
};

export const CoordonneeForm: FC<Props> = ({ prevStep, save, defaultValues, nomEtape }) => {
  const methods = useForm<CoordonneeInput>({
    resolver: yupResolver(personneCoordonneSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Modal.Body className="bg-gray-100">
        <Row className="g-2">
          <Col xs={12}>
            <strong>{nomEtape}</strong> - Coordonnées de la personne
          </Col>
          <PersonneCoordonneForm />
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

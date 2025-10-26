import { SubmitButton } from "components/buttons";
import { DatePicker } from "components/index";
import { FC } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { PersonneDebutFonctionInput } from "types/personne.type";

type Props = {
  onSave: (data: PersonneDebutFonctionInput) => void;
  prevStep: () => void;
  nomEtape: string;
  nomPersonne: string;
  nomFonction: string;
};

export const ResumeForm: FC<Props> = ({ prevStep, onSave, nomEtape, nomPersonne, nomFonction }) => {
  const methods = useForm<PersonneDebutFonctionInput>({
    defaultValues: { date_debut: new Date() },
  });

  return (
    <FormProvider {...methods}>
      <Modal.Body className="bg-gray-100">
        <Row className="g-2">
          <Col xs={12}>
            <strong>{nomEtape}</strong> - Résumé
          </Col>
          <Col xs={12}>
            <p>
              Vous êtes sur le point de créer&nbsp;
              <strong className="fs-4">{nomPersonne}</strong>
              &nbsp;au poste de&nbsp;<strong className="fs-4">{nomFonction}</strong>
            </p>
            <Col xs={12} sm={6}>
              <DatePicker name="date_debut" label="Date de prise de fonction" useHookForm maxDate={new Date()} />
            </Col>
            <p className="mt-3">
              <strong>Enregistrer</strong> pour finaliser la création.
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="me-auto" variant="outline-primary" onClick={prevStep}>
          Précedent
        </Button>
        <SubmitButton onClick={methods.handleSubmit(onSave)}>Enregistrer</SubmitButton>
      </Modal.Footer>
    </FormProvider>
  );
};

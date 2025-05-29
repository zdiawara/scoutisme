import {
  DatePicker,
  HookModalForm,
  SelectFonction,
  SelectPersonne,
} from "components";
import { WrapperProps, withForm } from "hoc";
import { FC } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { organisationMembreSchema } from "./attributionSchema";

const Form: FC<WrapperProps> = (props) => {
  const { watch } = useFormContext();
  const natureOrganisationId = watch("nature");
  return (
    <HookModalForm
      {...props}
      onClose={props.goBack}
      title={"Ajouter un membre"}
    >
      <Alert variant="info">
        Ajouter un nouveau membre dans l'organe de direction de
        l'organisation&nbsp;
        <strong>Zama</strong>
      </Alert>

      <Row className="g-2 bg-light">
        <Col sm={12}>
          <SelectPersonne
            label="Personne"
            name="personne"
            isClearable
            isRequired
            requestParams={{
              type: "adulte",
            }}
          />
        </Col>
        <Col sm={12}>
          <SelectFonction
            label="Fonction"
            name="fonction"
            isClearable
            isRequired
            requestParams={{
              nature: natureOrganisationId,
            }}
          />
        </Col>
        <Col sm={6}>
          <DatePicker
            name="date_debut"
            label="Date début"
            useHookForm
            required
          />
        </Col>

        <Col sm={6}>
          <DatePicker name="date_fin" label="Date fin" useHookForm />
        </Col>
      </Row>
    </HookModalForm>
  );
};

export const AttributionModal = withForm(Form, organisationMembreSchema);

import { FC } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { PageHeader } from "pages/common";
import {
  Radio,
  SelectFonction,
  SelectNature,
  SelectOrganisation,
  SelectTypePersonne,
  TextInput,
  View,
} from "components";
import { WrapperProps, withForm } from "hoc";
import { useFormContext } from "react-hook-form";

const FormContainer: FC<WrapperProps> = ({
  renderButtons,
  title,
  subtitle,
}) => {
  return (
    <>
      <PageHeader.View
        title={title!}
        subtitle={subtitle}
        className="my-4"
        right={renderButtons()}
      />

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            label="Information générale"
            description="Définir les informations générales de l'evenement"
            className="mb-4"
          />
          <Row className="g-3">
            <Col xs={12}>
              <TextInput name="nom" label="Nom" isRequired />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            label="Composition"
            description="Les fonctions invitées"
            className="mb-4"
          />
          <Row className="g-3">
            <Col xs={8}>
              <SelectFonction
                name="fonction1"
                //label="Fonction"
                placeholder=""
                description="Fonction impactée"
              />
            </Col>
            <Col xs={4}>
              <TextInput
                name="quato2"
                //label="Quata"
                description="Nombre de personnes maximum"
              />
            </Col>

            <Col xs={8}>
              <SelectFonction
                name="fonction2"
                //label="Fonction"
                placeholder=""
                description="Fonction impactée"
              />
            </Col>
            <Col xs={4}>
              <TextInput
                name="quato2"
                //label="Quata"
                description="Nombre de personnes maximum"
              />
            </Col>

            <Col xs={12}>
              <Button>Ajouter une </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export const InstanceForm = withForm(FormContainer);

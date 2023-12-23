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
import { messageSchema } from "./messageUtils";
import { TextEditor } from "./TextEditor";

const FormContainer: FC<WrapperProps> = ({ onSubmit, title, subtitle }) => {
  const { watch } = useFormContext();

  const renderContent = () => {
    const mode = watch("critere.mode");
    switch (mode) {
      case "personne":
        return (
          <Col xs={12}>
            <SelectTypePersonne
              name="critere.value.type"
              label="Type de personne"
              isClearable
              isRequired
            />
          </Col>
        );
      case "profil":
        return (
          <>
            <Col sm={4}>
              <SelectNature
                name="critere.value.nature"
                label="Nature"
                isClearable
              />
            </Col>
            <Col sm={4}>
              <SelectOrganisation
                name="critere.value.organisation"
                label="Organisation"
                isClearable
              />
            </Col>
            <Col sm={4}>
              <SelectFonction
                name="critere.value.fonction"
                label="Fonction"
                isClearable
              />
            </Col>
          </>
        );

      default:
        return (
          <Col sm={12}>
            <Alert variant="warning" className="mb-0">
              Attention, le mail sera envoyé à toutes les persones
            </Alert>
          </Col>
        );
    }
  };

  return (
    <>
      <PageHeader.View title={title!} subtitle={subtitle} className="my-4" />

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            label="Critères"
            description="Définir les personnes ciblées par ce mail"
            className="mb-4"
          />
          <Row className="g-3">
            <Col xs={12}>
              <Radio
                name="critere.mode"
                id="mode-1"
                label="Tout le monde"
                type="radio"
                inline
                value="all"
              />
              <Radio
                name="critere.mode"
                id="mode-2"
                label="Par profil"
                type="radio"
                inline
                value="profil"
              />
              <Radio
                name="critere.mode"
                id="mode-3"
                label="Par type de personne"
                type="radio"
                inline
                value="personne"
              />
            </Col>
            {renderContent()}
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            label="Mail"
            description="Rédiger l'objet du mail et son contenu"
            className="mb-4"
          />
          <Row className="g-3">
            <Col xs={12}>
              <TextInput name="objet" label="Objet du mail" isRequired />
            </Col>

            <Col xs={12}>
              <TextEditor name="contenu" />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Button onSubmit={onSubmit} type="submit">
        Envoyer le mail
      </Button>
    </>
  );
};

export const MessageForm = withForm(FormContainer, messageSchema);

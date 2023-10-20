import { FC, Fragment } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { PageHeader } from "pages/common";
import { SelectFonction, TextInput, View } from "components";
import { WrapperProps, withForm } from "hoc";
import { useFieldArray, useFormContext } from "react-hook-form";
import { instanceSchema } from "../instanceUtils";

const FormContainer: FC<WrapperProps> = ({
  renderButtons,
  title,
  subtitle,
}) => {
  const { control } = useFormContext();
  const fonctionArray = useFieldArray({ control, name: "compositions" });

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
              <TextInput
                name="nom"
                label="Nom"
                placeholder="Nom de l'instance"
                isRequired
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            label="Compositions"
            description="Les fonctions invitées"
            className="mb-4"
          />
          <Row className="g-3">
            {fonctionArray.fields.map((field, i) => (
              <Fragment key={field.id}>
                <Col xs={4}>
                  <SelectFonction
                    name={`compositions.${i}.fonction`}
                    placeholder="Fonction de la personne"
                    description="Fonction impactée"
                  />
                </Col>
                <Col xs={2}>
                  <TextInput
                    name={`compositions.${i}.quota`}
                    placeholder="Quota"
                  />
                </Col>
                <Col xs={5}>
                  <TextInput
                    name={`compositions.${i}.commentaire`}
                    placeholder="Commentaire"
                  />
                </Col>
                <Col xs={1} className="align-self-end">
                  <Button variant="danger">Supprimer</Button>
                </Col>
              </Fragment>
            ))}
            <Col xs={12}>
              <Button
                onClick={() => {
                  fonctionArray.append({
                    fonction: null,
                    quota: "",
                  });
                }}
              >
                Ajouter une fonction
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export const InstanceForm = withForm(FormContainer, instanceSchema);

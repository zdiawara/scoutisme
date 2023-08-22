import { ChangeEvent, FC, Fragment } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Header, PageHeader } from "pages/common";
import {
  AsyncSelect,
  DatePicker,
  SelectRefFormation,
  SelectVille,
  TextInput,
  View,
} from "components";
import { WrapperProps, withForm } from "hoc";
import { personneSchema } from "./personneSchema";
import { useFormContext } from "react-hook-form";
import { PersonneBox } from "../view";
import { MASK } from "utils/constants";

const FormContainer: FC<WrapperProps> = ({
  renderButtons,
  title,
  subtitle,
}) => {
  const { setValue, watch } = useFormContext();

  const loadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = function () {
      if (reader.result) {
        setValue("photo", reader.result as string);
      }
    };
    reader.readAsDataURL(e.target.files?.[0] as File);
  };

  const typePersonne = watch("type")?.value;

  return (
    <>
      <PageHeader.View
        title={title!}
        subtitle={subtitle}
        right={renderButtons()}
      />

      <Row>
        <Col xl={3} lg={3}>
          <PersonneBox source={watch("photo")}>
            <div className="text-center mt-3">
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => setValue("photo", null)}
              >
                Effacer
              </Button>
              <Button as="label" variant="info" size="sm">
                Choisir
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={loadFiles}
                />
              </Button>
            </div>
          </PersonneBox>
        </Col>
        <Col xl={9} lg={9} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <View.Header {...Header.infoGenerale} className="mb-3" />
              <Row className="g-3">
                <Col sm={4}>
                  <AsyncSelect
                    name="type"
                    label="Type"
                    placeholder="Scout ou adulte"
                    isRequired
                    fetchOptions={() =>
                      Promise.resolve([
                        { label: "Adulte", value: "adulte" },
                        { label: "Scout", value: "scout" },
                      ])
                    }
                  />
                </Col>
                <Col sm={4}>
                  <TextInput
                    name="nom"
                    label="Nom"
                    placeholder="Ex. Ouattara"
                    isRequired
                  />
                </Col>
                <Col sm={4}>
                  <TextInput
                    name="prenom"
                    label="Prénom"
                    placeholder="Ex. Moussa"
                    isRequired
                  />
                </Col>

                <Col sm={6}>
                  <TextInput
                    name="lieu_naissance"
                    label="Lieu naissance"
                    placeholder="Ex. Bobo Dioulasso"
                    isRequired
                  />
                </Col>

                <Col sm={6}>
                  <DatePicker
                    name="date_naissance"
                    label="Date naissance"
                    useHookForm
                    required
                    maxDate={new Date()}
                  />
                </Col>
                {typePersonne === "adulte" && (
                  <Fragment key="adulte">
                    <Col sm={6}>
                      <TextInput
                        name="profession"
                        label="Profession"
                        placeholder="Profession"
                      />
                    </Col>

                    <Col sm={6}>
                      <SelectRefFormation
                        name="niveau_formation"
                        label="Formation"
                        placeholder="Niveau formation"
                        isRequired
                      />
                    </Col>
                  </Fragment>
                )}
              </Row>

              <View.Header {...Header.contact} className="my-3" />

              <Row className="g-3">
                <Col sm={6}>
                  <TextInput
                    name="email"
                    label="Email"
                    placeholder="Adresse email"
                  />
                </Col>
                <Col sm={6}>
                  <TextInput
                    name="telephone"
                    label="Téléphone"
                    placeholder="00 00 00 00"
                    mask={MASK.telephone}
                  />
                </Col>

                <Col sm={4}>
                  <TextInput
                    name="personne_a_contacter.nom"
                    label="Personne à contacter"
                    placeholder="Nom et prénom"
                  />
                </Col>
                <Col sm={4}>
                  <TextInput
                    name="personne_a_contacter.relation"
                    label="Rélation"
                    placeholder="Père"
                  />
                </Col>
                <Col sm={4}>
                  <TextInput
                    name="personne_a_contacter.telephone"
                    label="Téléphone"
                    placeholder="00 00 00 00"
                    mask={MASK.telephone}
                  />
                </Col>
              </Row>

              <View.Header {...Header.adresse} className="my-3" />

              <Row className="g-3">
                <Col sm={6}>
                  <SelectVille
                    name="ville"
                    label="Ville"
                    placeholder="Ville de résidence"
                    isRequired
                    isClearable
                  />
                </Col>

                <Col sm={6}>
                  <TextInput
                    name="adresse"
                    label="Lieu de résidence"
                    placeholder="Quartier"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* <Card>
            <Card.Body>
              <View.Header label="Role" className="mb-3" />
              <Button variant="dark" size="sm">
                Ajouter un role
              </Button>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </>
  );
};

// Sous groupe == Saka ==> Nombre max de scouts
// Nom du saka ==> Toto
// Affecter 5 scoutes
// Il reste 27
// Créer un autre saka

export const PersonneForm = withForm(FormContainer, personneSchema);

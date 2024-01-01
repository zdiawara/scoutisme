import { ChangeEvent, FC, Fragment } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Header, PageHeader } from "pages/common";
import {
  DatePicker,
  SelectGenre,
  SelectRefFormation,
  SelectVille,
  TextInput,
  View,
} from "components";
import { WrapperProps, withForm } from "hoc";
import { personneSchema } from "./personneSchema";
import { useFormContext } from "react-hook-form";
import { PersonneBox } from "../view";
import { MASK, TYPE_PERSONNES } from "utils/constants";

export const PersonneFormInputs = () => {
  const { setValue, watch } = useFormContext();
  const typePersonne = watch("type")?.value;

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

  return (
    <>
      <Row>
        <Col xl={3} lg={3}>
          <PersonneBox source={watch("photo")}>
            <div className="text-center mt-3">
              <Button
                variant="text"
                className="me-2"
                onClick={() => setValue("photo", null)}
              >
                Effacer
              </Button>
              <Button as="label" variant="outline-primary">
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
              <View.Header
                {...Header.infoGenerale}
                description="Informations générales de la personne"
                className="mb-3"
              />

              <Row className="g-3">
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
                <Col sm={4}>
                  <SelectGenre name="genre" label="Genre" isRequired />
                </Col>
                <Col sm={4}>
                  <DatePicker
                    name="date_naissance"
                    label="Date naissance"
                    useHookForm
                    maxDate={new Date()}
                    isClearable
                  />
                </Col>

                <Col sm={4}>
                  <TextInput
                    name="lieu_naissance"
                    label="Lieu naissance"
                    placeholder="Ex. Bobo Dioulasso"
                  />
                </Col>
              </Row>

              {/* <View.Header
                label="Organisation"
                description="La fonction occupée par la personne au sein d'une organisation"
                className="mb-3 mt-3"
                icon={ICONS.organisation}
              />
              <Row className="g-2">
                <Col sm={4}>
                  <SelectOrganisation
                    name="attribution.organisation"
                    label="Organisation"
                    isRequired
                    isClearable
                    requestParams={organisationParams}
                  />
                </Col>
                <Col sm={4}>
                  <SelectFonction
                    name="attribution.fonction"
                    label="Fonction"
                    isRequired
                    isClearable
                    requestParams={fonctionParams}
                  />
                </Col>
                <Col sm={2}>
                  <DatePicker
                    name="attribution.date_debut"
                    label="Date début"
                    useHookForm
                    isClearable
                    required
                  />
                </Col>
                <Col sm={2}>
                  <DatePicker
                    name="attribution.date_fin"
                    label="Date fin"
                    useHookForm
                    isClearable
                  />
                </Col>
              </Row> */}

              <View.Header
                {...Header.contact}
                description="Email et numéro de la personne et de son representant"
                className="mb-3 mt-3"
              />

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
                    placeholder="Ex: Père"
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

              <View.Header
                {...Header.adresse}
                description="Ville et lieu de résidence de la personne"
                className="mb-3 mt-3"
              />

              <Row className="g-3">
                <Col sm={6}>
                  <SelectVille
                    name="ville"
                    label="Ville de résidence"
                    placeholder="Choisir"
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
          {typePersonne === TYPE_PERSONNES.ADULTE && (
            <Card className="shadow-sm">
              <Card.Body>
                <View.Header
                  {...Header.formation}
                  description="Profession et formation de la personne"
                  className="mb-3"
                />
                <Row className="g-3">
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
                        isClearable
                      />
                    </Col>
                  </Fragment>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};
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
        right={renderButtons()}
        className="my-4"
      />
      <PersonneFormInputs />
    </>
  );
};

export const PersonneForm = withForm(FormContainer, personneSchema);

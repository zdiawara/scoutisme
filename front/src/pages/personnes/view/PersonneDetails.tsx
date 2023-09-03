import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Header } from "pages/common";
import { PersonneResource } from "types/personne.type";
import { View } from "components";

type PersonneDetailsProps = {
  personne: PersonneResource;
};
export const PersonneDetails: FC<PersonneDetailsProps> = ({ personne }) => {
  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            {...Header.infoGenerale}
            description="Informations générales de la personne"
            className="mb-0"
          />

          <Card className="shadow-sm">
            <Card.Body>
              <Row className="g-3">
                <Col sm={4}>
                  <View.Item label="Code">{personne.code}</View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Nom">
                    {personne.nom} {personne.prenom}
                  </View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Etat">
                    <View.Etat value={personne.etat} />
                  </View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Genre">{personne.genre?.nom}</View.Item>
                </Col>

                <Col sm={4}>
                  <View.Item label="Date naissance">
                    {personne.date_naissance}
                  </View.Item>
                </Col>

                <Col sm={4}>
                  <View.Item label="Lieu naissance">
                    {personne.lieu_naissance}
                  </View.Item>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <View.Header
            {...Header.contact}
            description="Email et numéro de la personne et de son representant"
            className="mt-4"
          />

          <Card className="shadow-sm">
            <Card.Body>
              <Row className="g-3">
                <Col sm={4}>
                  <View.Item label="Email">{personne.email}</View.Item>
                </Col>
                <Col sm={8}>
                  <View.Item label="Téléphone">{personne.telephone}</View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Personne à contacter">
                    {personne.personne_a_contacter?.nom}
                  </View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Rélation">
                    {personne.personne_a_contacter?.relation}
                  </View.Item>
                </Col>
                <Col sm={4}>
                  <View.Item label="Téléphone">
                    {personne.personne_a_contacter?.telephone}
                  </View.Item>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <View.Header
            {...Header.adresse}
            className="mt-4"
            description="Ville et lieu de résidence de la personne"
          />

          <Card className="shadow-sm mb-0">
            <Card.Body>
              <Row className="g-3">
                <Col sm={4}>
                  <View.Item label="Ville">{personne.ville?.nom}</View.Item>
                </Col>
                <Col sm={8}>
                  <View.Item label="Adresse">{personne?.adresse}</View.Item>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            {...Header.formation}
            description="Profession et formation de la personne"
            className="mb-0"
          />

          <Card className="shadow-sm mb-0">
            <Card.Body>
              <Row className="g-3">
                <Col sm={4}>
                  <View.Item label="Profession">
                    {personne.profession}
                  </View.Item>
                </Col>

                <Col sm={4}>
                  <View.Item label="Niveau formation">
                    {personne.niveau_formation?.nom}
                  </View.Item>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </>
  );
};

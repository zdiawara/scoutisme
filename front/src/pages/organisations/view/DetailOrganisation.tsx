import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Header } from "pages/common";
import { OrganisationResource } from "types/organisation.type";
import { View } from "components";

type DetailOrganisationProps = {
  organisation: OrganisationResource;
};

export const DetailOrganisation: FC<DetailOrganisationProps> = ({
  organisation,
}) => {
  return (
    <>
      {/*       <Card className="shadow-sm">
        <Card.Header className="bg-light shadow-sm border-bottom-0">
          <Card.Title className="text-black">Informations générales</Card.Title>
        </Card.Header>
        <Card.Body className="p-0 bg-white">
          <table className="table mb-0">
            <tbody>
              <tr>
                <td>Etat</td>
                <td>
                  <View.Etat value={organisation.etat} />
                </td>
              </tr>
              <tr>
                <td style={{ width: "200px" }}>Code</td>
                <td className="text-black fs-5">{organisation.code}</td>
              </tr>
              <tr>
                <td>Nom</td>
                <td className="text-black fs-5">{organisation.nom}</td>
              </tr>
              <tr>
                <td>Nature</td>
                <td className="text-black fs-5">
                  {organisation.nature.nom} {organisation.type?.nom}
                </td>
              </tr>

              <tr>
                <td className="border-bottom-0">Parent</td>
                <td className="text-black fs-5 border-bottom-0">
                  {organisation.parent?.nom}
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>

        <Card.Header className="bg-light shadow-sm border-bottom-0">
          <Card.Title className="text-black">Adresse</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          <table className="table mb-0">
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>Ville</td>
                <td className="text-black fs-5">{organisation.ville.nom}</td>
              </tr>
              <tr>
                <td>Secteur</td>
                <td className="text-black fs-5">
                  <View.Item>{organisation.adresse?.secteur}</View.Item>
                </td>
              </tr>
              <tr>
                <td className="border-bottom-0">Emplacement</td>
                <td className="text-black fs-5 border-bottom-0">
                  <View.Item>{organisation.adresse?.emplacement}</View.Item>
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card> */}

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            {...Header.infoGenerale}
            description="Les informations générales de l'organisation"
          />

          <Card className="shadow-sm">
            <Card.Body>
              <Row className="g-3">
                <Col sm={3}>
                  <View.Item label="Code">{organisation.code}</View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Nom">{organisation.nom}</View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Nature">
                    {organisation.nature?.nom}
                  </View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Type">{organisation.type?.nom}</View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Parent">
                    {organisation.parent?.nom}
                  </View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Etat">
                    <View.Etat value={organisation.etat} />
                  </View.Item>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <View.Header
            {...Header.adresse}
            description="Adresse physique de l'organisation"
            className="mt-4"
          />

          <Card className="shadow-sm mb-0">
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <View.Item label="Ville">{organisation.ville?.nom}</View.Item>
                </Col>
                <Col sm={3}>
                  <View.Item label="Secteur">
                    {organisation.adresse?.secteur}
                  </View.Item>
                </Col>
                <Col sm={6}>
                  <View.Item label="Emplacement">
                    {organisation.adresse?.emplacement}
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

import { FC } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { View } from "components";
import { PersonneResource } from "types/personne.type";

type ViewPersonneCoordonneeProps = {
  personne: PersonneResource;
};

export const ViewPersonneCoordonnee: FC<ViewPersonneCoordonneeProps> = ({
  personne,
}) => {
  return (
    <>
      <ListGroup.Item>
        <View.Item label="Num. Tel">{personne.telephone}</View.Item>
      </ListGroup.Item>
      <ListGroup.Item>
        <View.Item label="Email">{personne.email}</View.Item>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row className="g-3">
          <Col xs={6}>
            <View.Item label="Ville de residence">
              {personne.ville?.nom}
            </View.Item>
          </Col>
          <Col xs={6}>
            <View.Item label="Adresse de residence">
              {personne?.adresse}
            </View.Item>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

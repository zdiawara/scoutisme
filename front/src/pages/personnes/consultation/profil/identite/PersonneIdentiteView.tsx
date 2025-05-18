import { FC } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { View } from "components";
import { DateFormater } from "utils/DateUtils";
import { PersonneResource } from "types/personne.type";

type PersonneIdentiteViewProps = {
  personne: PersonneResource;
};

export const PersonneIdentiteView: FC<PersonneIdentiteViewProps> = ({
  personne,
}) => {
  return (
    <>
      <ListGroup.Item>
        <Row className="g-3">
          <Col xs={6}>
            <View.Item label="Nom">{personne.nom}</View.Item>
          </Col>
          <Col xs={6}>
            <View.Item label="Prenom">{personne.prenom}</View.Item>
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row className="g-3">
          <Col xs={6}>
            <View.Item label="Genre">{personne.genre?.nom}</View.Item>
          </Col>
          <Col xs={6}>
            <View.Item label="Profession">{personne.profession}</View.Item>
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row className="g-3">
          <Col xs={6}>
            <View.Item label="Date de naissance">
              {DateFormater.toDateText(personne.date_naissance) || undefined}
            </View.Item>
          </Col>
          <Col xs={6}>
            <View.Item label="Lieu de naissance">
              {personne.lieu_naissance}
            </View.Item>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

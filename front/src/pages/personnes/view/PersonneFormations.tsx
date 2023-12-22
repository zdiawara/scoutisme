import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Header } from "pages/common";
import { PersonneResource } from "types/personne.type";
import { View } from "components";

type PersonneFormationsProps = {
  personne: PersonneResource;
};
export const PersonneFormations: FC<PersonneFormationsProps> = ({
  personne,
}) => {
  return (
    <>
      {personne.type === "adulte" && (
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

                  <Col sm={4}>
                    <View.Item label="Date de Formations">
                      {personne.date_formation}
                    </View.Item>
                  </Col>

                </Row>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

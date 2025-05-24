import { FC } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { View } from "components";
import { PersonneResource } from "types/personne.type";
import useToggle from "hooks/useToggle";
import { EditPersonneAContacter } from "./EditPersonneAContacter";
import { useDroits } from "hooks/useDroits";

type PersonneCoordonneeProps = {
  personne: PersonneResource;
};

export const PersonneAContacter: FC<PersonneCoordonneeProps> = ({
  personne,
}) => {
  const [show, toggleForm] = useToggle();
  const droits = useDroits();
  return (
    <>
      <View.Toolbar
        icon={<Icon.Person size="1.1rem" className="me-1" />}
        label="Personne à contacter"
        right={
          droits.personne.modifier(personne) && (
            <Button
              variant="secondary"
              onClick={() => toggleForm()}
              disabled={show}
            >
              <Icon.Pencil />
            </Button>
          )
        }
      />
      {show ? (
        <EditPersonneAContacter
          personne={personne}
          onClose={() => toggleForm()}
          key="edit"
        />
      ) : (
        <>
          <ListGroup.Item>
            <Row className="g-3">
              <Col xs={6}>
                <View.Item label="Nom">
                  {personne.personne_a_contacter?.nom}
                </View.Item>
              </Col>
              <Col xs={6}>
                <View.Item label="Relation">
                  {personne.personne_a_contacter?.relation}
                </View.Item>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="g-3">
              <Col sm={3}>
                <View.Item label="Telephone">
                  {personne.personne_a_contacter?.telephone}
                </View.Item>
              </Col>
            </Row>
          </ListGroup.Item>
        </>
      )}
    </>
  );
};

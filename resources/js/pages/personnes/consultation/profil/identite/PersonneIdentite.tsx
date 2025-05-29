import { FC } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { View } from "components";
import { PersonneResource } from "types/personne.type";
import { PersonneIdentiteEdit } from "./PersonneIdentiteEdit";
import useToggle from "hooks/useToggle";
import { DateFormater } from "utils/DateUtils";
import { useDroits } from "hooks/useDroits";

type PersonneIdentiteProps = {
  personne: PersonneResource;
};

export const PersonneIdentite: FC<PersonneIdentiteProps> = ({ personne }) => {
  const [show, toggleForm] = useToggle();
  const droits = useDroits();
  return (
    <>
      <View.Toolbar
        icon={<Icon.InfoCircle size="1.2rem" className="me-1" />}
        label="Identite"
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
        <PersonneIdentiteEdit
          personne={personne}
          onClose={() => toggleForm()}
          key="edit"
        />
      ) : (
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
                  {DateFormater.toDateText(personne.date_naissance) ||
                    undefined}
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
      )}
    </>
  );
};

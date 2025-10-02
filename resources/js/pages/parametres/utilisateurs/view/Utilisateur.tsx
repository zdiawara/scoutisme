import { View } from "components/view";
import { Col, ListGroup, Row } from "react-bootstrap";
import { UserResource } from "types/auth.type";
import { DateFormater } from "utils/DateUtils";
import * as Icon from "react-bootstrap-icons";
import { FC } from "react";

type UtilisateurProps = {
  user: UserResource;
};

export const Utilisateur: FC<UtilisateurProps> = ({ user }) => {
  return (
    <>
      <ListGroup className="mb-2 mt-4">
        <View.Toolbar icon={<Icon.InfoCircle size="1.2rem" className="me-1" />} label="Identite" />
        <ListGroup.Item>
          <View.Item label="Nom">{user.name}</View.Item>
        </ListGroup.Item>

        <ListGroup.Item>
          <View.Item label="Email">{user.email}</View.Item>
        </ListGroup.Item>

        <ListGroup.Item>
          <View.Item label="Date creation">{DateFormater.toDateText(user.created_at)}</View.Item>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup className="mb-2">
        <View.Toolbar icon={<Icon.Briefcase size="1.2rem" className="me-1" />} label="Fonction" />

        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={12} sm={6}>
              <View.Item label="Perimetre">{user.personne?.organisation?.nature.nom}</View.Item>
            </Col>
            <Col xs={12} sm={6}>
              <View.Item label="Fonction">{user.personne?.fonction?.nom}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup className="mb-2">
        <View.Toolbar icon={<Icon.Sliders size="1.2rem" className="me-1" />} label="Rôle" />
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={12}>
              <View.Item label="Roles">
                <ul>{user.roles && user.roles.map((role) => <li key={role.id}>{role.nom}</li>)}</ul>
              </View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

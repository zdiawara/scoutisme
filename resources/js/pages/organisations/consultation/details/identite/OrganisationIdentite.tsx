import { FC } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { View } from "components";
import * as Icon from "react-bootstrap-icons";
import useToggle from "hooks/useToggle";
import { EditOrganisationIdentite } from "./EditOrganisationIdentite";

type Props = {
  organisation: OrganisationResource;
};

export const OrganisationIdentite: FC<Props> = ({ organisation }) => {
  const [show, toggleForm] = useToggle();
  return (
    <>
      <View.Toolbar
        icon={<Icon.InfoCircle size="1.1rem" className="me-1" />}
        label="Informations générales"
        right={
          <Button
            className="ms-auto d-block"
            size="sm"
            variant="secondary"
            onClick={toggleForm}
            disabled={show}
          >
            <Icon.Pencil className="me-0" />
          </Button>
        }
      />
      {show ? (
        <EditOrganisationIdentite
          organisation={organisation}
          onClose={toggleForm}
        />
      ) : (
        <>
          <ListGroup.Item>
            <Row className="g-3">
              <Col xs={6}>
                <View.Item label="Nom">{organisation.nom}</View.Item>
              </Col>
              <Col xs={6}>
                <View.Item label="Code">{organisation.code}</View.Item>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="g-3">
              <Col xs={6}>
                <View.Item label="Nature">{organisation.nature.nom}</View.Item>
              </Col>
              <Col xs={6}>
                <View.Item label="Type">{organisation.type?.nom}</View.Item>
              </Col>
            </Row>
          </ListGroup.Item>
        </>
      )}
    </>
  );
};

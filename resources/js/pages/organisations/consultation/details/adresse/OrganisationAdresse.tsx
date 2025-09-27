import { FC } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { View } from "components";
import * as Icon from "react-bootstrap-icons";
import useToggle from "hooks/useToggle";
import { EditOrganisationAdresse } from "./EditOrganisationAdresse";
import { useDroits } from "hooks/useDroits";

type Props = {
  organisation: OrganisationResource;
};

export const OrganisationAdresse: FC<Props> = ({ organisation }) => {
  const [show, toggleForm] = useToggle();
  const droits = useDroits();
  return (
    <>
      <View.Toolbar
        icon={<Icon.GeoAlt size="1.1rem" className="me-1" />}
        label="Adresse"
        right={
          droits.organisation.modifier(organisation) && (
            <Button size="sm" variant="secondary" onClick={() => toggleForm()} disabled={show}>
              <Icon.Pencil />
            </Button>
          )
        }
      />
      {show ? (
        <EditOrganisationAdresse organisation={organisation} onClose={toggleForm} />
      ) : (
        <ListGroup.Item>
          <Row>
            <Col xs={6}>
              <View.Item label="Ville">{organisation.ville?.nom}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Lieu">{organisation.adresse}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
      )}
    </>
  );
};

import { useQuery } from "@tanstack/react-query";
import { logApi } from "api/index";
import { View } from "components/view";
import { Header } from "layout/Header";
import { FC } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LogActivityResource } from "types/log-activity.type";
import { QUERY_KEY } from "utils/constants";
import { DateFormater } from "utils/DateUtils";

const ViewLog: FC = () => {
  const logId = useParams().id!;

  const { data: log, isLoading } = useQuery({
    queryKey: [QUERY_KEY.logs, logId],
    queryFn: () => logApi.findById<LogActivityResource>(logId),
  });

  if (isLoading || !log) {
    return <span>chargement ...</span>;
  }

  return (
    <>
      <Header title="Consulter log d'activité" />

      <ListGroup className="mb-2 mt-4">
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              <View.Item label="Nom de la log">{log.log_name}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Description">{log.description}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Type evenement">{log.event}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Date creation">{DateFormater.toDateTextTime(log.created_at)}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Auteur">{log.causer?.name}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Adresse IP">{log.ip_address}</View.Item>
            </Col>
            <Col xs={12}>
              <View.Item label="Navigateur">{log.user_agent}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
        {/* <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              <View.Item label="Fonction">{personne.fonction?.nom}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Organisation">
                {personne?.organisation && (
                  <Link
                    to={LINKS.organisations.view(personne.organisation.id)}
                    className="text-decoration-underline text-black"
                  >
                    <Icon.Link size="1.2rem" className="me-1" />
                    {personne.organisation.nom}
                  </Link>
                )}
              </View.Item>
            </Col>
          </Row>
        </ListGroup.Item> */}
      </ListGroup>
    </>
  );
};

export default ViewLog;

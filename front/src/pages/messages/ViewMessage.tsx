import { useQuery } from "@tanstack/react-query";
import { messageApi } from "api";
import { View } from "components";
import { PageHeader } from "pages/common";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MessageResource } from "types/message.type";
import { QUERY_KEY } from "utils/constants";

const ViewMessage = () => {
  const id = useParams().id!;

  const { data: message, isLoading } = useQuery({
    queryKey: [QUERY_KEY.messages, id],
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      return messageApi.findById<MessageResource>(queryKey[1] as string);
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <>
      <PageHeader.View title="Consultation message" className="my-4" />

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            label="Critères"
            description="Définir les personnes ciblées par ce mail"
            className="mb-4"
          />
          <Row className="g-3">
            <Col xs={2}>
              <View.Item label="Mode">{message?.critere?.mode}</View.Item>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            label="Mail"
            description="Rédiger l'objet du mail et son contenu"
            className="mb-4"
          />
          <Row className="g-3">
            <Col xs={12}>
              <View.Item label="Objet">{message?.titre}</View.Item>
            </Col>

            <Col xs={12}>
              <div
                dangerouslySetInnerHTML={{ __html: message?.content || "" }}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header
            label="Destinataires"
            description="Les destinataires du mail"
            className="mb-4"
          />
          <Row className="g-3">
            <Col xs={12}>
              <Table>
                <thead className="text-dark">
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {message?.destinataires.map((d) => {
                    return (
                      <tr>
                        <td>{d.nom}</td>
                        <td>{d.prenom}</td>
                        <td>{d.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewMessage;

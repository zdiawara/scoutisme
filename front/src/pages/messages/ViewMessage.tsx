import { useQuery } from "@tanstack/react-query";
import { messageApi } from "api";
import classNames from "classnames";
import { ICONS, PageHeader } from "pages/common";
import { useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MessageResource } from "types/message.type";
import { QUERY_KEY } from "utils/constants";
import { ViewDestinataires, ViewMail } from "./common";

const TABS = [
  { label: "Informations", code: "info", icon: ICONS.info },
  { label: "Destinataires", code: "destinataires", icon: ICONS.personne },
];

const ViewMessage = () => {
  const id = useParams().id!;

  const [page, setPage] = useState<string>("info");

  const onSelectPage = (pageSelected: string) => () => {
    setPage(pageSelected);
  };

  const { data: message, isLoading } = useQuery({
    queryKey: [QUERY_KEY.messages, id],
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      return messageApi.findById<MessageResource>(queryKey[1] as string);
    },
  });

  const renderContent = () => {
    if (!message) {
      return null;
    }
    switch (page) {
      case "destinataires":
        return <ViewDestinataires destinataires={message?.destinataires} />;
      default:
        return <ViewMail message={message} />;
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <PageHeader.View title="Consulter mail" className="my-4" />

      <Row>
        <Col xl={3} lg={3}>
          <Card className="text-black">
            <Card.Body className="p-1">
              <ListGroup defaultActiveKey="#link1">
                {TABS.map((item) => (
                  <ListGroup.Item
                    key={item.code}
                    className={classNames("border-0 rounded", {
                      active: item.code === page,
                    })}
                    action
                    onClick={onSelectPage(item.code)}
                  >
                    <i className={`${item.icon} me-1`}></i>&nbsp;{item.label}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={9} lg={9}>
          {renderContent()}
        </Col>
      </Row>
    </>
  );
};

export default ViewMessage;

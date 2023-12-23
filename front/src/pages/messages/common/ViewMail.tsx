import { View } from "components";
import { Card } from "react-bootstrap";
import { MessageResource } from "types/message.type";

type ViewMailProps = {
  message: MessageResource;
};

export const ViewMail = ({ message }: ViewMailProps) => {
  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <View.Header label="Objet" className="mb-3" />
          <View.Item>{message?.objet}</View.Item>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <View.Header label="Corps du mail" className="mb-4" />
          <div
            className="text-dark"
            dangerouslySetInnerHTML={{ __html: message?.contenu || "" }}
          />
        </Card.Body>
      </Card>
    </>
  );
};

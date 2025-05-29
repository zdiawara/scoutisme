import { View } from "components";
import { Card } from "react-bootstrap";
import { MessageResource } from "types/message.type";

type ViewMailProps = {
  message: MessageResource;
};

export const ViewMail = ({ message }: ViewMailProps) => {
  return (
    <Card className="shadow-sm">
      <View.Header label="Objet" />
      <Card.Body>
        <View.Item>{message?.objet}</View.Item>
      </Card.Body>
      <View.Header label="Corps du mail" />
      <Card.Body>
        <div
          className="text-dark"
          dangerouslySetInnerHTML={{ __html: message?.contenu || "" }}
        />
      </Card.Body>
    </Card>
  );
};

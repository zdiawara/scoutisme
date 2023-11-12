import { TextInput } from "components";
import { Col } from "react-bootstrap";

export const MontantForm = () => {
  return (
    <Col key="tous-montant">
      <TextInput name="montants.value" label="Montant" />
    </Col>
  );
};

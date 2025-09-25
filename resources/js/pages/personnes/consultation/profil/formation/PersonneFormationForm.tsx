import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { DatePicker, SelectRefFormation } from "components";
import { withForm, WrapperProps } from "hoc";
import { personneFormationSchema } from "pages/personnes/form/personneSchema";

const FormContainer: FC<WrapperProps> = ({ renderButtonsActions }) => {
  return (
    <>
      <Row className="g-3">
        <Col xs={12} sm={6}>
          <SelectRefFormation name="niveau_formation" label="Formation *" placeholder="Choisir" />
        </Col>

        <Col xs={12} sm={6}>
          <DatePicker name="date_formation" label="Date formation" useHookForm maxDate={new Date()} isClearable />
        </Col>
      </Row>

      {renderButtonsActions()}
    </>
  );
};

export const PersonneFormationForm = withForm(FormContainer, personneFormationSchema);

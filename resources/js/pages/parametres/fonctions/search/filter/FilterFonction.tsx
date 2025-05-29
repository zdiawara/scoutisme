import { SelectNature } from "components";
import { withFilterForm } from "hoc";
import { FC } from "react";
import { Col } from "react-bootstrap";

const FilterFonctionForm: FC = () => {
  return (
    <>
      <Col xs={12}>
        <SelectNature name="perimetre" label="Perimetre" isClearable placeholder="" />
      </Col>
    </>
  );
};

export const FilterFonction = withFilterForm(FilterFonctionForm);

import { SelectNature, SelectTypeOrganisation } from "components";
import { withFilterForm } from "hoc";
import { FC } from "react";
import { Col } from "react-bootstrap";

const FilterOrganisationForm: FC = () => {
  return (
    <>
      <Col xs={12}>
        <SelectTypeOrganisation
          name="type"
          label="Type organisation"
          isClearable
        />
      </Col>

      <Col xs={12}>
        <SelectNature name="nature" label="Nature" isClearable />
      </Col>
    </>
  );
};

export const FilterOrganisation = withFilterForm(FilterOrganisationForm);

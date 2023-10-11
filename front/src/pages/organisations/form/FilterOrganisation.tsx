import { SelectNature, SelectOrganisation } from "components";
import { withFilterForm } from "hoc";
import { FC } from "react";
import { Col } from "react-bootstrap";

const FilterOrganisationForm: FC = () => {
  return (
    <>
      <Col xs={12}>
        <SelectNature name="nature" label="Nature" isClearable />
      </Col>

      <Col xs={12}>
        <SelectOrganisation
          name="organisation"
          label="Organisation"
          isClearable
        />
      </Col>
    </>
  );
};

export const FilterOrganisation = withFilterForm(FilterOrganisationForm);

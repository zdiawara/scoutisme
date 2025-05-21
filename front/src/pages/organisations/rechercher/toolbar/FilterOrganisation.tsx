import { SelectNature, SelectTypeOrganisation } from "components";
import { withFilterForm } from "hoc";
import { FC, useMemo } from "react";
import { Col } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { selectHelper } from "utils/functions";

const FilterOrganisationForm: FC = () => {
  const { watch } = useFormContext();

  const nature = selectHelper.getValue(watch("nature"));
  const resetDeps = useMemo(() => {
    return nature ? [nature] : [];
  }, [nature]);
  return (
    <>
      <Col xs={12}>
        <SelectNature name="nature" label="Niveau" isClearable placeholder="" />
      </Col>
      <Col xs={12}>
        <SelectTypeOrganisation
          name="type"
          label="Type organisation"
          isClearable
          placeholder=""
          resetDeps={resetDeps}
          requestParams={nature ? { nature_id: nature } : {}}
        />
      </Col>
    </>
  );
};

export const FilterOrganisation = withFilterForm(FilterOrganisationForm);

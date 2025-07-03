import { SelectNature, SelectTypeOrganisation } from "components";
import { withFilterForm } from "hoc";
import { useAuth } from "hooks/useAuth";
import { FC, useMemo } from "react";
import { Col } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { buildPerimetres, selectHelper } from "utils/functions";

const FilterOrganisationForm: FC = () => {
  const { watch } = useFormContext();

  const { user } = useAuth();

  const codeNature = user?.personne?.organisation?.nature?.code;

  const perimetres = codeNature ? buildPerimetres(codeNature).join(";") : null;

  const nature = selectHelper.getValue(watch("nature"));
  const resetDeps = useMemo(() => {
    return nature ? [nature] : [];
  }, [nature]);
  return (
    <>
      <Col xs={12}>
        <SelectNature requestParams={{ code: perimetres }} name="nature" label="Niveau" isClearable placeholder="" />
      </Col>
      <Col xs={12}>
        <SelectTypeOrganisation
          name="type"
          label="Type organisation"
          isClearable
          placeholder=""
          resetDeps={resetDeps}
          isDisabled={!nature}
          requestParams={nature ? { nature_id: nature } : {}}
        />
      </Col>
    </>
  );
};

export const FilterOrganisation = withFilterForm(FilterOrganisationForm);

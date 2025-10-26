import { HookModalForm, Radio, SelectCategorie, SelectNature, SelectTypeOrganisation, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, Fragment } from "react";
import { Col, Form, Row, Stack } from "react-bootstrap";
import { NATURE } from "utils/constants";
import { fonctionSchema } from "./FonctionUtils";
import { useFormContext } from "react-hook-form";

/**
 * Formulaire d'ajout et de modification d'une fonction
 * @param props
 * @returns
 */
const Form1: FC<WrapperV2Props> = (props) => {
  const { watch } = useFormContext();
  const codeNature = watch("nature")?.item?.code;

  return (
    <HookModalForm {...props} modalBodyClassName="bg-light p-3" onClose={props.onExit}>
      <Row className="g-2">
        {[NATURE.national].includes(codeNature) ? (
          <Fragment key="nature_and_type_organisation">
            <Col sm={6}>
              <SelectNature
                label="Perimetre"
                name="nature"
                isRequired
                description="Une fonction est associée un périmètre d'action"
              />
            </Col>
            <Col sm={6}>
              <SelectTypeOrganisation
                label="Type organisation"
                name="type"
                requestParams={{ nature_code: NATURE.national }}
                isRequired
              />
            </Col>
          </Fragment>
        ) : (
          <Fragment key="only_nature">
            <Col sm={12}>
              <SelectNature
                label="Perimetre"
                name="nature"
                isRequired
                description="Une fonction est associée un périmètre d'action"
              />
            </Col>
          </Fragment>
        )}
        <Col xs={12}>
          <TextInput label="Nom" placeholder="Nom de la fonction" name="nom" isRequired />
        </Col>
        <Col xs={12}>
          <Form.Label className="text-muted text-uppercase fs-6">Responsable</Form.Label>
          <Stack direction="horizontal">
            <Radio id="mode-1" value={"1"} name="responsable" label="Oui" className="text-muted me-3" />
            <Radio id="mode-2" value={"0"} name="responsable" label="Non" className="text-muted" />
          </Stack>
        </Col>

        <Col xs={12}>
          <SelectCategorie placeholder="" label="Categorie" name="categorie" isRequired />
        </Col>
      </Row>
    </HookModalForm>
  );
};

export const FonctionForm = withMutationForm(Form1, fonctionSchema);

import { HookModalForm, Radio, SelectNature, SelectTypeOrganisation, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { NATURE } from "utils/constants";
import { fonctionSchema } from "./FonctionUtils";
import { useFormContext } from "react-hook-form";

/**
 * Formulaire d'ajout et de modification d'une fonction
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
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
                isClearable
                isRequired
                description="Une fonction est associée un périmètre d'action"
              />
            </Col>
            <Col sm={6}>
              <SelectTypeOrganisation
                label="Type organisation"
                name="type"
                requestParams={{ nature_code: NATURE.national }}
                isClearable
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
                isClearable
                isRequired
                description="Une fonction est associée un périmètre d'action"
              />
            </Col>
          </Fragment>
        )}
        <Col sm={6}>
          <TextInput label="Nom" placeholder="Nom de la fonction" name="nom" isRequired />
        </Col>
        <Col sm={6}>
          <TextInput
            label="Durée mandat"
            name="duree_mandat"
            type="number"
            placeholder="En nombre d'année"
            isRequired
            description={
              <div className="text-start">
                Durée d'occupation de la fonction.
                <p> Mettre 0 si durée infinie</p>
              </div>
            }
          />
        </Col>
        <Col xs={12}>
          <Radio
            name="responsable"
            label="Responsable d'organisation"
            type="switch"
            inline
            value="true"
            className="text-primary mt-2"
          />
        </Col>
      </Row>
    </HookModalForm>
  );
};

export const FonctionForm = withMutationForm(Form, fonctionSchema);

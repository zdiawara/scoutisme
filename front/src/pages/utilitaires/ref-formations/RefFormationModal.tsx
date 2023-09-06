import { HookModalForm, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { refFormationApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { refFormationConverter } from "./refFormationConverter";
import { QUERY_KEY } from "utils/constants";
import { refFormationSchema } from "./refFormationSchema";
import { RefFormationResource } from "types/organisation.type";

/**
 * Formulaire d'ajout et de modification d'une formation
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Row className="g-2">
        <Col sm={12}>
          <TextInput label="Nom de la formation" name="nom" isRequired />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const FormationForm = withMutationForm(Form, refFormationSchema);

type FonctionModalProps = {
  closeModal: () => void;
  refFormation?: RefFormationResource;
};

/**
 * Modifier une fonction
 * @param param0
 * @returns
 */
export const RefFormationModal: FC<FonctionModalProps> = ({
  closeModal,
  refFormation,
}) => {
  const query = useQueryClient();

  const save = (data: Record<string, any>) => {
    const body = refFormationConverter.toBody(data);
    if (refFormation?.id) {
      return refFormationApi.update(refFormation.id, body);
    }
    return refFormationApi.create(body);
  };

  return (
    <FormationForm
      onSave={save}
      title={`${refFormation?.id ? "Modifier" : "Ajouter"} une formation`}
      defaultValues={
        refFormation?.id ? refFormationConverter.toInput(refFormation) : {}
      }
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.refFormations]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

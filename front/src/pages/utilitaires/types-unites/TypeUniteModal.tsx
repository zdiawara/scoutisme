import { HookModalForm, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { typeOrganisationApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { typeUniteSchema, typeUniteConverter } from "./typeUniteUtils";
import { TypeOrganisationResource } from "types/organisation.type";

/**
 * Formulaire d'ajout et de modification d'un type d'unité
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <Row className="g-2">
        <Col sm={12}>
          <TextInput label="Nom" name="nom" isRequired />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const TypeUniteForm = withMutationForm(Form, typeUniteSchema);

type TypeUniteModalProps = {
  closeModal: () => void;
  selected?: TypeOrganisationResource;
};

/**
 * Creer ou modifier un type d'unité
 * @param param0
 * @returns
 */
export const TypeUniteModal: FC<TypeUniteModalProps> = ({
  closeModal,
  selected,
}) => {
  const query = useQueryClient();

  const save = (data: Record<string, any>) => {
    const body = typeUniteConverter.toBody(data);
    if (selected?.id) {
      return typeOrganisationApi.update(selected.id, body);
    }
    return typeOrganisationApi.create(body);
  };

  return (
    <TypeUniteForm
      onSave={save}
      title={`${selected?.id ? "Modifier" : "Ajouter"} un type d'unité`}
      defaultValues={selected?.id ? typeUniteConverter.toInput(selected) : {}}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.typesUnites]);
        closeModal();
      }}
      modalProps={{ centered: false }}
      onExit={closeModal}
    />
  );
};

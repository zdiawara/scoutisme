import { HookModalForm, SelectNature, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { fonctionApi } from "api";
import { FonctionResource } from "types/personne.type";
import { useQueryClient } from "@tanstack/react-query";
import { fonctionConverter } from "./fonctionConverter";
import { QUERY_KEY } from "utils/constants";
import { fonctionSchema } from "./fonctionSchema";
import { SelectItem } from "types/form.type";

/**
 * Formulaire d'ajout et de modification d'une fonction
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <Row className="g-2">
        <Col sm={12}>
          <SelectNature
            label="Nature organisation"
            name="nature"
            isClearable
            isRequired
            description="Une fonction est associée à la nature de l'organisation"
          />
        </Col>
        <Col sm={12}>
          <TextInput label="Nom fonction" name="nom" isRequired />
        </Col>
        <Col sm={12}>
          <TextInput
            label="Durée mandat"
            name="duree_mandat"
            type="number"
            placeholder="En nombre d'année"
            description="Durée d'occupation de la fonction"
          />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const FonctionForm = withMutationForm(Form, fonctionSchema);

type FonctionModalProps = {
  closeModal: () => void;
  fonction?: FonctionResource;
  nature?: SelectItem;
};

/**
 * Modifier une fonction
 * @param param0
 * @returns
 */
export const FonctionModal: FC<FonctionModalProps> = ({
  closeModal,
  fonction,
  nature,
}) => {
  const query = useQueryClient();

  const save = (data: Record<string, any>) => {
    const body = fonctionConverter.toBody(data);
    if (fonction?.id) {
      return fonctionApi.update(fonction.id, body);
    }
    return fonctionApi.create(body);
  };

  return (
    <FonctionForm
      onSave={save}
      title={`${fonction?.id ? "Modifier" : "Ajouter"} une fonction`}
      subtitle="Fonction occupée par les membres de l'organe de direction"
      defaultValues={
        fonction?.id ? fonctionConverter.toInput(fonction) : { nature }
      }
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.fonctions]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

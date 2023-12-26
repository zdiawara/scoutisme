import {
  HookModalForm,
  SelectNature,
  SelectTypeOrganisation,
  TextInput,
} from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { fonctionApi } from "api";
import { FonctionResource } from "types/personne.type";
import { useQueryClient } from "@tanstack/react-query";
import { NATURE, QUERY_KEY } from "utils/constants";
import { fonctionConverter, fonctionSchema } from "./fonctionUtils";
import { SelectItem } from "types/form.type";
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
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Row className="g-2">
        {[NATURE.national].includes(codeNature) ? (
          <Fragment key="nature_and_type_organisation">
            <Col sm={6}>
              <SelectNature
                label="Nature organisation"
                name="nature"
                isClearable
                isRequired
                description="Une fonction est associée à la nature de l'organisation"
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
                label="Nature organisation"
                name="nature"
                isClearable
                isRequired
                description="Une fonction est associée à la nature de l'organisation"
              />
            </Col>
          </Fragment>
        )}
        <Col sm={6}>
          <TextInput
            label="Nom"
            placeholder="Nom de la fonction"
            name="nom"
            isRequired
          />
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

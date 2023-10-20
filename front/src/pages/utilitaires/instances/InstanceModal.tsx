import { HookModalForm, SelectFonction, TextInput, View } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { instanceApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { instanceConverter, instanceSchema } from "./instanceUtils";
import { useFieldArray, useFormContext } from "react-hook-form";
import { InstanceResource } from "types/events.type";

const Form: FC<WrapperV2Props> = (props) => {
  const { control } = useFormContext();
  const fonctionArray = useFieldArray({ control, name: "compositions" });

  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <View.Header
        label="Information générale"
        description="Définir les informations générales de l'evenement"
      />
      <Row>
        <Col xs={12}>
          <TextInput
            name="nom"
            label="Nom"
            placeholder="Nom de l'instance"
            isRequired
          />
        </Col>
      </Row>

      <View.Header
        className="mt-2"
        label="Compositions"
        description="Les fonctions invitées"
      />

      <Row className="g-3">
        {fonctionArray.fields.map((field, i) => (
          <Fragment key={field.id}>
            <Col xs={8}>
              <SelectFonction
                name={`compositions.${i}.fonction`}
                placeholder="Fonction de la personne"
                description="Fonction impactée"
              />
            </Col>
            <Col xs={3}>
              <TextInput name={`compositions.${i}.quota`} placeholder="Quota" />
            </Col>
            <Col xs={1} className="align-self-end">
              <Button
                variant="link"
                size="sm"
                className="action-icon"
                onClick={() => {
                  fonctionArray.remove(i);
                }}
              >
                <i className="mdi mdi-delete fs-4 text-danger"></i>
              </Button>
            </Col>
          </Fragment>
        ))}
        <Col xs={12} className="mt-3">
          <Button
            onClick={() => {
              fonctionArray.append({
                fonction: null,
                quota: "",
              });
            }}
          >
            Ajouter une fonction
          </Button>
        </Col>
      </Row>
    </HookModalForm>
  );
};

const InstanceForm = withMutationForm(Form, instanceSchema);

type InstanceModalProps = {
  closeModal: () => void;
  selected?: InstanceResource;
};

export const InstanceModal: FC<InstanceModalProps> = ({
  closeModal,
  selected,
}) => {
  const query = useQueryClient();

  const save = (data: Record<string, any>) => {
    const body = instanceConverter.toBody(data);
    if (selected?.id) {
      return instanceApi.update(selected.id, body);
    }
    return instanceApi.create(body);
  };

  return (
    <InstanceForm
      onSave={save}
      title={`${selected?.id ? "Modifier" : "Ajouter"} une instance`}
      defaultValues={selected?.id ? instanceConverter.toInput(selected) : {}}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.instances]);
        closeModal();
      }}
      modalProps={{ size: "lg" }}
      onExit={closeModal}
    />
  );
};

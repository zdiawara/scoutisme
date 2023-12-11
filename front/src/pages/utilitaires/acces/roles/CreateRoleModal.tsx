import { CheckBox, HookModalForm, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { roleApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { RoleResource } from "types/auth.type";
import { roleConverter } from "./roleUtils";
import { NATURE } from "utils/constants";

/**
 * Formulaire d'ajout et de modification d'un role
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
      <Row className="g-3">
        <Col sm={6}>
          <TextInput
            placeholder="Nom du rôle"
            label="Nom"
            name="nom"
            isRequired
          />
        </Col>

        <Col xs={6}>
          <label className="d-block mb-2 text-dark">Périmètre d'action</label>
          <CheckBox
            name="perimetres"
            id="national"
            label="National"
            type="checkbox"
            inline
            value={NATURE.national}
          />
          <CheckBox
            name="perimetres"
            id="region"
            label="Région"
            type="checkbox"
            inline
            value={NATURE.region}
          />
          <CheckBox
            name="perimetres"
            id="groupe"
            label="Groupe"
            type="checkbox"
            inline
            value={NATURE.groupe}
          />
          <CheckBox
            name="perimetres"
            id="unite"
            label="Unité"
            type="checkbox"
            inline
            value={NATURE.unite}
          />
        </Col>
        {/* 
        <View.Header
          label="Habilitations"
          description="Profession et formation de la personne"
          icon={ICONS.direction}
        />
        <Col sm={12}>
          <Accordion defaultActiveKey="0" alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="mt-0 ">
                Module Personne
              </Accordion.Header>
              <Accordion.Body className="bg-white">OK</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col sm={12}>
          <Accordion defaultActiveKey="0" alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="mt-0">
                Module Organisation
              </Accordion.Header>
              <Accordion.Body>OK</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
       */}
      </Row>
    </HookModalForm>
  );
};

const RoleForm = withMutationForm(Form);

type CreateRoleModalProps = {
  closeModal: () => void;
  role?: RoleResource;
};

/**
 * Modifier une fonction
 * @param param0
 * @returns
 */
export const CreateRoleModal: FC<CreateRoleModalProps> = ({
  closeModal,
  role,
}) => {
  const query = useQueryClient();

  const save = (data: Record<string, any>) => {
    const body = roleConverter.toBody(data);
    if (role?.id) {
      return roleApi.update(role.id, body);
    }
    return roleApi.create(data);
  };

  return (
    <RoleForm
      onSave={save}
      title={`${role?.id ? "Modifier" : "Ajouter"} un rôle`}
      subtitle="Rôle occupé par les utilisateurs de l'application"
      defaultValues={role?.id ? roleConverter.toInput(role) : {}}
      onSuccess={() => {
        query.invalidateQueries(["roles"]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

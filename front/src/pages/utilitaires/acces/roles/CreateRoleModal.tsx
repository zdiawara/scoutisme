import { CheckBox, HookModalForm, TextInput, View } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, Fragment, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { moduleApi, roleApi } from "api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ModuleResource, RoleResource } from "types/auth.type";
import { roleConverter } from "./roleUtils";
import { NATURE } from "utils/constants";
import classNames from "classnames";

/**
 * Formulaire d'ajout et de modification d'un role
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  const [page, setPage] = useState<string>("personne");

  const { data: modules } = useQuery({
    queryKey: ["modules"],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: async () => {
      const results = await moduleApi.findAll<ModuleResource>({
        noParentId: "true",
      });
      return results.data;
    },
  });

  const onSelectPage = (pageSelected: string) => () => {
    setPage(pageSelected);
  };

  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      modalProps={{
        size: "xl",
        scrollable: true,
      }}
      onClose={props.onExit}
    >
      <Row className="g-3">
        <Col sm={12}>
          <TextInput
            placeholder="Nom du rôle"
            label="Nom"
            name="nom"
            isRequired
          />
        </Col>

        <Col sm={12}>
          <label className="d-block mb-2 text-dark">Périmètre d'action</label>
          <CheckBox
            name="perimetres"
            id="national"
            label="National"
            type="checkbox"
            inline
            value={NATURE.national}
            className="text-primary"
          />
          <CheckBox
            name="perimetres"
            id="region"
            label="Région"
            type="checkbox"
            inline
            value={NATURE.region}
            className="text-primary"
          />
          <CheckBox
            name="perimetres"
            id="groupe"
            label="Groupe"
            type="checkbox"
            inline
            value={NATURE.groupe}
            className="text-primary"
          />
          <CheckBox
            name="perimetres"
            id="unite"
            label="Unité"
            type="checkbox"
            inline
            value={NATURE.unite}
            className="text-primary"
          />
        </Col>

        <Col xs={12}>
          <Row>
            <Col xl={3} lg={3}>
              <Card className="text-black">
                <Card.Body className="p-1">
                  <ListGroup defaultActiveKey="#link1">
                    {modules?.map((item) => (
                      <ListGroup.Item
                        key={item.id}
                        className={classNames("border-0 rounded", {
                          active: item.code === page,
                        })}
                        action
                        onClick={onSelectPage(item.code)}
                      >
                        {/* <i className={`${item.icon} me-1`}></i>&nbsp; */}
                        {item.nom}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={9} lg={9}>
              <Card body>
                <Row>
                  {modules
                    ?.filter((e) => e.code === page)
                    ?.map((module) => (
                      <Fragment>
                        {module.sous_modules.map((sousModule, i) => (
                          <Col
                            xs={12}
                            key={sousModule.id}
                            className={`mb-${
                              i + 1 === module.sous_modules.length ? 0 : 3
                            }`}
                          >
                            <View.Header
                              label={sousModule.nom}
                              className="mb-3 text-primary"
                            />
                            <Row className="g-2">
                              {sousModule.fonctionnalites.map((sm) => (
                                <Col xs={4} key={sm.id}>
                                  <CheckBox
                                    name="fonctionnalites"
                                    id={sm.id}
                                    label={sm.nom}
                                    type="checkbox"
                                    inline
                                    value={sm.id}
                                    className="text-dark"
                                  />
                                </Col>
                              ))}
                            </Row>
                          </Col>
                        ))}
                      </Fragment>
                    ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
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
  const queryClient = useQueryClient();

  const roleQuery = useQuery({
    queryKey: ["roles", role?.id],
    networkMode: "offlineFirst",
    queryFn: () => roleApi.findById<RoleResource>(role?.id!),
    enabled: Boolean(role?.id),
  });

  console.log(roleQuery.data, role);

  const save = (data: Record<string, any>) => {
    const body = {
      ...roleConverter.toBody(data),
      fonctionnalites: data.fonctionnalites,
    };
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
        queryClient.invalidateQueries(["roles"]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

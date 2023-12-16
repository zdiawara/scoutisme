import { CheckBox, HookModalForm } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, useMemo, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { habilitationApi, moduleApi, roleApi } from "api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HabilitationResource,
  ModuleResource,
  RoleResource,
} from "types/auth.type";
import classNames from "classnames";

const Form: FC<WrapperV2Props> = (props) => {
  const [page, setPage] = useState<string>("personne");

  const { data: modules } = useQuery({
    queryKey: ["modules"],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    //select : (data) => data.data,
    queryFn: async () => {
      const results = await moduleApi.findAll<ModuleResource>();
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
      onClose={props.onExit}
    >
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
            <Row className="g-2">
              {modules
                ?.flatMap((e) => e.fonctionnalites)
                .filter((e) => e.module.code === page)
                .map((e) => (
                  <Col xs={6} key={e.id}>
                    <CheckBox
                      name="fonctionnalites"
                      id={e.id}
                      label={e.nom}
                      type="checkbox"
                      inline
                      value={e.id}
                    />
                  </Col>
                ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </HookModalForm>
  );
};

const HabilitationForm = withMutationForm(Form);

type HabilitationModalProps = {
  closeModal: () => void;
  role: RoleResource;
};

/**
 * Modifier une fonction
 * @param param0
 * @returns
 */
export const HabilitationModal: FC<HabilitationModalProps> = ({
  closeModal,
  role,
}) => {
  const { data: habilitations, isLoading } = useQuery({
    queryKey: ["habilitations", role.id],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    //select : (data) => data.data,
    queryFn: ({ queryKey }) => {
      return habilitationApi
        .findAll<HabilitationResource>({ roleId: role.id })
        .then((e) => e.data);
    },
  });

  const query = useQueryClient();

  const save = (data: Record<string, any>) => {
    return roleApi.updateFonctionnalites(role.id, data.fonctionnalites);
  };

  const fonctionnalites = useMemo(() => {
    return habilitations?.map((item) => item.fonctionnalite.id) || [];
  }, [habilitations]);

  if (isLoading) {
    return null;
  }

  return (
    <HabilitationForm
      onSave={save}
      title={`${role?.id ? "Modifier" : "Ajouter"} un rôle`}
      subtitle="Rôle occupé par les utilisateurs de l'application"
      defaultValues={{
        fonctionnalites,
      }}
      onSuccess={() => {
        query.invalidateQueries(["habilitations", role.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

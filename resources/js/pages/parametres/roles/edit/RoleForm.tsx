import { HookModalForm, SelectFonction, SelectNature, SwitchBox, TextInput } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, Fragment, useMemo, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { moduleApi } from "api";
import { useQuery } from "@tanstack/react-query";
import { ModuleResource } from "types/auth.type";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";

const fetchModules = async () => {
  const results = await moduleApi.findAll<ModuleResource>({
    noParentId: "true",
  });
  return results.data;
};

/**
 * Formulaire d'ajout et de modification d'un role
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  const [page, setPage] = useState<string>("personnes");
  const { watch } = useFormContext();

  const perimetreId = watch("perimetre")?.value;

  const { data: modules } = useQuery({
    queryKey: ["modules"],
    queryFn: fetchModules,
  });

  const onSelectPage = (pageSelected: string) => () => {
    setPage(pageSelected);
  };

  const resetDepsFonction = useMemo(() => {
    return perimetreId ? [perimetreId] : [];
  }, [perimetreId]);

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
      <Row className="g-2">
        <Col xs={12} md={6}>
          <SelectNature label="Perimetre" name="perimetre" isRequired placeholder="" />
        </Col>
        <Col xs={12} md={6}>
          <TextInput placeholder="" label="Nom du role" name="nom" isRequired />
        </Col>
        <Col xs={12}>
          <SelectFonction
            resetDeps={resetDepsFonction}
            isRequired
            name="fonctions"
            label="Fonctions"
            placeholder=""
            isMulti
            isClearable={false}
            requestParams={{
              nature: perimetreId,
            }}
          />
        </Col>
        <Col xs={12}>
          <Row>
            <Col xl={3} lg={3}>
              <ListGroup>
                {modules?.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    style={{ zIndex: 0 }}
                    className={classNames({
                      active: item.code === page,
                    })}
                    action
                    onClick={onSelectPage(item.code)}
                  >
                    {item.nom}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col xl={9} lg={9}>
              {modules
                ?.filter((e) => e.code === page)
                ?.map((module) => (
                  <Fragment key={module.id}>
                    {module.sous_modules
                      .filter((e) => {
                        if (module.code !== "organisations") {
                          return true;
                        }
                        return e.code.includes(watch("perimetre")?.item?.code);
                      })
                      .map((sousModule, i) => (
                        <Col
                          xs={12}
                          key={sousModule.id}
                          className={`mb-${i + 1 === module.sous_modules.length ? 0 : 3}`}
                        >
                          <ListGroup>
                            <ListGroup.Item>
                              <div className="fw-bold text-dark fs-4">{sousModule.nom}</div>
                            </ListGroup.Item>

                            {sousModule.fonctionnalites.map((sm) => (
                              <ListGroup.Item key={sm.id}>
                                <SwitchBox
                                  name="fonctionnalites"
                                  id={sm.id}
                                  label={
                                    <>
                                      <span className="text-primary">{sm.nom}</span>
                                      <div className="text-muted">{sm.description}</div>
                                    </>
                                  }
                                  type="checkbox"
                                  inline
                                  value={sm.id}
                                  className="text-dark"
                                />
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Col>
                      ))}
                  </Fragment>
                ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </HookModalForm>
  );
};

export const RoleForm = withMutationForm(Form);

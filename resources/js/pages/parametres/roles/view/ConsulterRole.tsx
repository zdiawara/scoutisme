import { useQuery } from "@tanstack/react-query";
import { moduleApi, roleApi } from "api";
import { LoaderSpinner } from "components/loader";
import { View } from "components/view";
import { Header } from "layout/Header";
import { Fragment, useState } from "react";
import { Col, ListGroup, Nav, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ModuleResource, RoleResource } from "types/auth.type";
import { QUERY_KEY } from "utils/constants";
import { Module } from "./Module";

const fetchRole = async ({ queryKey }: Record<string, string[]>) => {
  const result = await roleApi.findById<RoleResource>(queryKey[1] as string);
  return result;
};

const fetchModules = async () => {
  const results = await moduleApi.findAll<ModuleResource>({
    noParentId: "true",
  });
  return results.data;
};

const ConsulterRole = () => {
  const roleId = useParams().id!;
  const [page, setPage] = useState<string>("personnes");

  const { data: role, isLoading } = useQuery({
    queryKey: [QUERY_KEY.roles, roleId],
    queryFn: fetchRole,
  });

  const { data: modules } = useQuery({
    queryKey: ["modules"],
    queryFn: fetchModules,
  });

  const renderContent = () => {
    if (isLoading || !role) {
      return <LoaderSpinner />;
    }

    const menu = (
      <Nav variant="pills" style={{ overflow: "auto" }} className="flex-nowrap py-2">
        {modules?.map((item) => (
          <Nav.Item key={item.code}>
            <Nav.Link
              active={item.code === page}
              onClick={() => setPage(item.code)}
              href="#"
              className="d-flex align-items-center"
            >
              {item.nom}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    );

    if (!modules) {
      return null;
    }

    return (
      <>
        <ListGroup className="mb-2 mt-4">
          <ListGroup.Item>
            <Row className="g-3">
              <Col xs={6}>
                <View.Item label="Nom">{role.nom}</View.Item>
              </Col>
              <Col xs={6}>
                <View.Item label="Nature">{role.perimetres.join(" , ")}</View.Item>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="g-3">
              <Col xs={12}>
                <View.Item label="Fonctions">
                  <ul>
                    {role.fonctions.map((f) => (
                      <li>{f.nom}</li>
                    ))}
                  </ul>
                </View.Item>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        {menu}

        {modules
          .filter((m) => m.code === page)
          // .filter(e => role.)
          .map((module) => (
            <Fragment key={module.id}>
              {module.sous_modules
                .filter((sousModule) => {
                  if (module.code !== "organisations") {
                    return true;
                  }
                  return sousModule.code.includes(role.perimetres[0]);
                })
                .map((sousModule) => (
                  <Module
                    role={role}
                    module={{
                      ...sousModule,
                      fonctionnalites: sousModule.fonctionnalites.filter((f) =>
                        role.habilitations.map((h) => h.fonctionnalite.id).includes(f.id)
                      ),
                    }}
                    key={sousModule.code}
                  />
                ))}
            </Fragment>
          ))}
      </>
    );
  };

  return (
    <>
      <Header title="Consulter" />

      {renderContent()}
    </>
  );
};

export default ConsulterRole;

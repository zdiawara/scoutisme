import { FC, Fragment } from "react";
import { Header } from "layout/Header";
// import { Outlet } from "react-router-dom";
import { ListGroup, Stack } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { LINKS } from "utils/links";

const PARAMETRES = [
  {
    title: "Paramètres généraux",
    Icon: Icon.GearFill,
    id: "p-gen",
    children: [
      {
        title: "Fonctions",
        link: "/parametres/fonctions",
        subtitle: "Gérer les fonctions occupées par les personnes au sein des organisations",
        Icon: Icon.BriefcaseFill,
      },
      {
        title: "Formations",
        link: "/parametres/formations",
        subtitle: "Créer et modifier le référentiel des formations suivi par les adultes",
        Icon: Icon.Activity,
      },
      {
        title: "Cotisations",
        link: "/parametres/cotisations",
        subtitle: "Gérer les frais cotisations",
        Icon: Icon.Back,
      },
      {
        title: "Types Unités",
        link: "/parametres/types-unites",
        subtitle: "Gérer les types d'unités",
        Icon: Icon.Building,
      },
    ],
  },
  {
    title: "Paramètres utilisateurs",
    Icon: Icon.PeopleFill,
    id: "p-users",
    children: [
      {
        title: "Rôles",
        link: LINKS.parametres.roles,
        subtitle: "Gérer les rôles occupés par les utilisateurs qui accèdent à l'application",
        Icon: Icon.PersonFillGear,
      },
      {
        title: "Utilisateurs",
        link: LINKS.parametres.utilisateurs,
        subtitle: "Consulter les utilisateurs qui ont accès à l'application",
        Icon: Icon.PeopleFill,
      },
      {
        title: "Logs",
        link: LINKS.parametres.logs,
        subtitle: "Consulter les activités des utilisateurs",
        Icon: Icon.Activity,
      },
    ],
  },
];

const Parametres: FC = () => {
  return (
    <>
      <Header title="Paramètres" />
      <ListGroup className="my-4">
        {PARAMETRES.map((parametre) => (
          <Fragment key={parametre.id}>
            <ListGroup.Item className="bg-gray-100 d-flex align-items-center">{parametre.title}</ListGroup.Item>
            {parametre.children.map((child) => (
              <ListGroup.Item key={child.link} as={Link} to={child.link} className="d-flex">
                <div>
                  <Stack direction="horizontal">
                    <child.Icon size="1.3rem" className="me-1" />
                    <h3 className="fs-4 m-0 fs-normal">{child.title}</h3>
                  </Stack>
                  <p className="m-0 mt-1 fs-light">{child.subtitle}</p>
                </div>
                <Icon.ArrowRight className="ms-auto align-self-center" />
              </ListGroup.Item>
            ))}
          </Fragment>
        ))}
      </ListGroup>
    </>
  );
};

export default Parametres;

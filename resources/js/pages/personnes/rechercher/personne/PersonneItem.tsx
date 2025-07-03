import { FC } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PersonneResource } from "types/personne.type";
import { LINKS } from "utils";
import { NATURE } from "utils/constants";
import * as Icon from "react-bootstrap-icons";

type PersonneItemProps = {
  personne: PersonneResource;
};

const buidFonction = ({ fonction, organisation }: PersonneResource): string => {
  if (!fonction) {
    return "-";
  }
  if (fonction.code === "scout") {
    return `Scout / ${organisation?.type?.membre}`;
  }
  return fonction?.nom;
};

const buidOrganisation = ({ organisation }: PersonneResource): string => {
  if (!organisation) {
    return "-";
  }
  if (organisation.nature.code === NATURE.national) {
    return organisation.nom;
  }
  return `${organisation.nature.nom} / ${organisation.nom}`;
};

export const PersonneItem: FC<PersonneItemProps> = ({ personne }) => {
  return (
    <>
      <div className="avatar-sm me-1">
        {personne.photo ? (
          <img
            src={personne.photo}
            alt=""
            className="rounded-circle"
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              objectFit: "cover",
              color: "transparent",
              textIndent: "10000px",
            }}
          />
        ) : (
          <span className="avatar-title bg-secondary-lighten text-secondary fs-4 rounded-circle">
            {personne.prenom[0]}
            {personne.nom[0]}
          </span>
        )}
      </div>
      <div className="ms-2 me-auto align-self-center">
        <Link to={LINKS.personnes.view(personne.id)} className="fw-semibold fs-5 text-black">
          {personne?.prenom} {personne?.nom}
        </Link>
        <span className="ms-1 fs-6 fw-light">{personne.code}</span>
        {personne.fonction && <div className="fw-light">{buidFonction(personne)}</div>}
        {personne.organisation && <div className="fw-light text-muted mt-1">{buidOrganisation(personne)}</div>}
      </div>
      <Button
        //@ts-ignore
        as={Link}
        to={LINKS.personnes.view(personne.id)}
        variant="default"
      >
        <Icon.Eye />
      </Button>
    </>
  );
};

import { FC } from "react";
import { Link } from "react-router-dom";
import { PersonneResource } from "types/personne.type";
import { LINKS } from "utils";
import { ScoutItemActions } from "./ScoutItemActions";

type Props = {
  personne: PersonneResource;
};

export const ScoutItem: FC<Props> = ({ personne }) => {
  return (
    <>
      <div className="me-auto">
        <Link className="fw-semibold mb-1 text-black" to={LINKS.personnes.view(personne.id)}>
          {personne?.prenom} {personne?.nom}
        </Link>
        <div className="fw-light">{personne.code}</div>
      </div>
      <ScoutItemActions personne={personne} />
    </>
  );
};

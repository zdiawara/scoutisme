import { FC } from "react";
import { Button, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { FonctionResource } from "types/personne.type";

type Props = {
  fonctions?: FonctionResource[];
  editFormation: (fonction: FonctionResource) => void;
};

export const ListFonction: FC<Props> = ({ fonctions, editFormation }) => {
  if (!fonctions?.length) {
    return <ListGroup.Item className="text-center text-muted">Aucune fonction trouvée</ListGroup.Item>;
  }

  return (
    <>
      {fonctions.map((formation) => {
        const infoSupplementaires = [];
        if (formation.responsable.toString() === "1") {
          infoSupplementaires.push("Responsable");
        }
        if (formation.duree_mandat) {
          infoSupplementaires.push(`Durée ${formation.duree_mandat} an(s)`);
        }
        return (
          <ListGroup.Item key={formation.id} className="d-flex justify-content-between align-items-start">
            <div className="test">
              <div className="fw-semibold fs-5 text-black">{formation.nom}</div>
              <span>{infoSupplementaires.join(" - ")}</span>
              <span className="d-block mt-1 fw-light">{formation.nature.nom}</span>
            </div>

            <Button variant="default" onClick={() => editFormation(formation)}>
              <Icon.Pencil />
            </Button>
          </ListGroup.Item>
        );
      })}
    </>
  );
};

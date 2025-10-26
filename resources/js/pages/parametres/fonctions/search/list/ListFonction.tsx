import { FC } from "react";
import { Button, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { FonctionResource } from "types/personne.type";
import { CATEGORIES } from "utils/constants";

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
      {fonctions.map((fonction) => {
        const infoSupplementaires = [];
        if (fonction.responsable.toString() === "1") {
          infoSupplementaires.push("Responsable");
        }
        infoSupplementaires.push(CATEGORIES.find((e) => fonction.categorie === e.value)?.label, fonction.nature.nom);
        return (
          <ListGroup.Item key={fonction.id} className="d-flex justify-content-between align-items-start">
            <div className="test">
              <div className="fw-semibold fs-5 text-black">{fonction.nom}</div>
              <span className="d-block fw-light">{infoSupplementaires.join(" - ")}</span>
            </div>

            <Button variant="default" onClick={() => editFormation(fonction)}>
              <Icon.Pencil />
            </Button>
          </ListGroup.Item>
        );
      })}
    </>
  );
};

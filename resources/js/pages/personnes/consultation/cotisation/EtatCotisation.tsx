import { FC } from "react";
import { Badge } from "react-bootstrap";

type EtatCotisationProps = {
  etat: string;
};

export const EtatCotisation: FC<EtatCotisationProps> = ({ etat }) => {
  return etat === "a_jour" ? <Badge bg="success">A jour</Badge> : <Badge bg="danger">Non à jour</Badge>;
};

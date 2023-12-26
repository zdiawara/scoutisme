import { Badge } from "react-bootstrap";

const BG: Record<string, string> = {
  valide: "success",
  rejet: "danger",
  en_attente: "warning",
};
const NAMES: Record<string, string> = {
  valide: "Validé",
  rejet: "Rejeté",
  en_attente: "En attente",
};

export const EtatPaiement = ({ etat }: { etat: string }) => {
  return <Badge bg={BG[etat]}>{NAMES[etat]}</Badge>;
};

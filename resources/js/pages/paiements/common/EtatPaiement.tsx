import { Badge } from "react-bootstrap";
import { ETAT_PAIEMENTS } from "utils/constants";

const BG: Record<string, string> = {
  valide: "success",
  rejet: "danger",
  en_attente: "warning",
};

export const EtatPaiement = ({ etat }: { etat: string }) => {
  return <Badge bg={BG[etat]}>{ETAT_PAIEMENTS[etat]}</Badge>;
};

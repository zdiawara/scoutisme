import { MontantFormatText, View } from "components";
import { FC } from "react";
import { Badge } from "react-bootstrap";
import { CotisationResource } from "types/personne.type";

type EtatCotisationProps = {
  cotisation: CotisationResource;
};

export const EtatCotisation: FC<EtatCotisationProps> = ({ cotisation }) => {
  const montantPaye = cotisation.paiements
    .filter(({ etat }) => etat !== "rejet")
    .reduce((prev, curr) => {
      return curr.montant + prev;
    }, 0);

  return (
    <>
      {montantPaye >= (cotisation.montant_total || -1) ? (
        <View.Item label="Etat">
          <Badge bg="success">A jour</Badge>
        </View.Item>
      ) : (
        <View.Item label="Reste a payer">
          <Badge bg="secondary">
            <MontantFormatText
              value={cotisation.montant_total - montantPaye}
              withDevise
            />
          </Badge>
        </View.Item>
      )}
    </>
  );
};

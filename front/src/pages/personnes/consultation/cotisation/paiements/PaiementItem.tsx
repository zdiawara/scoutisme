import { MontantFormatText } from "components";
import { FC } from "react";
import { Stack } from "react-bootstrap";
import { PaiementResource, PersonneResource } from "types/personne.type";
import { DateFormater } from "utils/DateUtils";
import { EtatPaiement } from "pages/paiements/common";
import { PaiementActions } from "pages/personnes/common/PaiementActions";

type Props = {
  paiement: PaiementResource;
  personne: PersonneResource;
};

export const PaiementItem: FC<Props> = ({ paiement, personne }) => {
  return (
    <>
      <div>
        <div className="fw-bold">
          <MontantFormatText value={paiement.montant} withDevise />
        </div>
        <span className="text-muted d-block">
          Paiement N° {paiement.numero}
        </span>
        <Stack direction="horizontal" className="mt-1 fw-light">
          {paiement.date_traitement && (
            <span className="me-1">
              Traité le {DateFormater.toDateText(paiement.date_traitement)}
            </span>
          )}
          <EtatPaiement etat={paiement.etat} />
        </Stack>
      </div>
      <PaiementActions paiement={paiement} personne={personne} />
    </>
  );
};

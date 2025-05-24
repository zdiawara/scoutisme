import { MontantFormatText } from "components";
import { FC } from "react";
import { Stack } from "react-bootstrap";
import { PaiementResource } from "types/personne.type";
import { DateFormater } from "utils/DateUtils";
import { EtatPaiement } from "pages/paiements/common";
import { PaiementActions } from "pages/personnes/common/PaiementActions";

type Props = {
  paiement: PaiementResource;
};

export const PaiementItem: FC<Props> = ({ paiement }) => {
  return (
    <>
      <div>
        <div className="fw-bold d-flex align-items-center">
          <MontantFormatText value={paiement.montant} withDevise />
          &nbsp;
          <EtatPaiement etat={paiement.etat} />
        </div>
        <span className="fw-light d-block">N°{paiement.numero}</span>
        <Stack direction="horizontal" className="mt-1 fw-light">
          <div className="fw-light text-muted">
            Le {DateFormater.toDateTextTime(paiement.created_at)}
          </div>
        </Stack>
      </div>
      <PaiementActions paiement={paiement} />
    </>
  );
};

import { MontantFormatText } from "components";
import { FC } from "react";
import { Stack } from "react-bootstrap";
import { PaiementResource, PersonneResource } from "types/personne.type";
import { DateFormater } from "utils/DateUtils";
import { EtatPaiement } from "pages/paiements/common";
import { PaiementActions } from "pages/personnes/common/PaiementActions";

type Props = {
  paiement: PaiementResource;
  personne?: PersonneResource;
};

export const PaiementItem: FC<Props> = ({ paiement, personne }) => {
  return (
    <>
      <div>
        <div className="fw-semibold d-flex align-items-center">
          <span className="fw-light fs-6 d-block">N° {paiement.numero} /</span>
          &nbsp;
          <MontantFormatText value={paiement.montant} withDevise />
          &nbsp;
          <EtatPaiement etat={paiement.etat} />
        </div>

        <span className="d-block">Par {paiement?.createur?.name || "-"}</span>
        <Stack direction="horizontal" className="mt-1 fw-light">
          <div className="fw-light">Le {DateFormater.toDateTextTime(paiement.created_at)}</div>
        </Stack>
      </div>
      <PaiementActions paiement={paiement} personne={personne} />
    </>
  );
};

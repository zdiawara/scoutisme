import { AsyncSelectSimple, MontantFormatText, View } from "components";
import { ICONS } from "pages/common";
import { FC } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { SelectItem } from "types/form.type";
import { getYear } from "date-fns";
import { CotisationResource, PaiementResource } from "types/personne.type";

const fetchYears = () => {
  const year = getYear(new Date());
  return Promise.resolve(
    new Array(5)
      .fill(1)
      .map((_, i) => year - i)
      .map((item) => ({
        value: `${item}`,
        label: `${item}`,
      }))
  );
};

type CotisationProps = {
  personneId: string;
  paiements?: PaiementResource[];
  annee: SelectItem;
  setAnnee: (item: SelectItem) => void;
  isLoading: boolean;
  cotisation?: CotisationResource;
};

export const Cotisation: FC<CotisationProps> = ({
  paiements,
  annee,
  setAnnee,
  cotisation,
  isLoading,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <>Chargement ...</>;
    }
    if (!cotisation) {
      return null;
    }
    if (cotisation.montant_total <= 0) {
      return <>Aucune ligne de cotisation trouver.</>;
    }
    return (
      <>
        <Row className="g-3">
          <Col sm={3}>
            {cotisation && (
              <View.Item label="Montant cotisation">
                <span className="fs-5 fw-bold text-primary">
                  <MontantFormatText value={cotisation?.montant_total} />
                </span>
              </View.Item>
            )}
          </Col>
          <Col sm={3}>
            <EtatCotisation cotisation={cotisation} paiements={paiements} />
          </Col>
        </Row>
      </>
    );
  };
  return (
    <Card body>
      <View.Header
        icon={ICONS.cotisation}
        label="Cotisation"
        description={`Montant de la cotisation de l'année ${annee.value}`}
        className="mb-2"
        right={
          <AsyncSelectSimple
            name="year"
            value={annee}
            onChange={setAnnee}
            fetchOptions={fetchYears}
          />
        }
      />
      {renderContent()}
    </Card>
  );
};

type EtatCotisationProps = {
  paiements?: PaiementResource[];
  cotisation?: CotisationResource;
};

const EtatCotisation: FC<EtatCotisationProps> = ({ paiements, cotisation }) => {
  if (!paiements || !cotisation) {
    return null;
  }

  const montantPaye = paiements
    .filter(({ etat }) => etat !== "rejet")
    .reduce((prev, curr) => {
      return curr.montant + prev;
    }, 0);

  return (
    <>
      {montantPaye >= (cotisation.montant_total || -1) ? (
        <View.Item label="Etat cotisation">
          <Badge bg="success">A jour</Badge>
        </View.Item>
      ) : (
        <View.Item label="Reste à payer">
          <Badge bg="info">
            <MontantFormatText value={cotisation.montant_total - montantPaye} />
          </Badge>
        </View.Item>
      )}
    </>
  );
};

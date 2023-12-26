import { useQuery } from "@tanstack/react-query";
import { personneApi } from "api";
import { AsyncSelectSimple, MontantFormatText, View } from "components";
import { ICONS } from "pages/common";
import { FC } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { SelectItem } from "types/form.type";
import { getYear } from "date-fns";
import { CotisationResource, PaiementResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";

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
};

export const Cotisation: FC<CotisationProps> = ({
  personneId,
  paiements,
  annee,
  setAnnee,
}) => {
  const cotisationQuery = useQuery({
    queryKey: [QUERY_KEY.personnes, "paiements", annee.value],
    networkMode: "offlineFirst",
    queryFn: () => {
      return personneApi.findCotisation(personneId, annee.value);
    },
    select: ({ data }) => data,
  });

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
      {cotisationQuery.isLoading ? (
        <>Chargement ...</>
      ) : (
        <Row className="g-3">
          <Col sm={3}>
            {cotisationQuery.data && (
              <View.Item label="Montant cotisation">
                <span className="fs-5 fw-bold text-primary">
                  <MontantFormatText
                    value={cotisationQuery.data?.montant_total}
                  />
                </span>
              </View.Item>
            )}
          </Col>
          <Col sm={3}>
            <EtatCotisation
              cotisation={cotisationQuery.data}
              paiements={paiements}
            />
          </Col>
        </Row>
      )}
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
          <Badge bg="warning">
            <MontantFormatText value={cotisation.montant_total - montantPaye} />
          </Badge>
        </View.Item>
      )}
    </>
  );
};

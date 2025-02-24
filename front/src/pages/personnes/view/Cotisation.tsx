import { AsyncSelectSimple, MontantFormatText, View } from "components";
import { ICONS } from "pages/common";
import { FC } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { SelectItem } from "types/form.type";
import { getYear } from "date-fns";
import { CotisationResource, PaiementResource } from "types/personne.type";
import * as Icon from "react-bootstrap-icons";
import { DateFormater } from "utils/DateUtils";
import { EtatPaiement } from "pages/paiements/common";

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
                  <MontantFormatText
                    value={cotisation?.montant_total}
                    withDevise
                  />
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
    <>
      <ListGroup>
        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          <div>
            <Icon.InfoCircle size="1.1rem" className="me-1" />
            <span className="fs-5">Cotisation</span>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              {cotisation && (
                <View.Item label="Montant">
                  <MontantFormatText
                    value={cotisation?.montant_total}
                    withDevise
                  />
                </View.Item>
              )}
            </Col>
            <Col xs={6}>
              <EtatCotisation cotisation={cotisation} paiements={paiements} />
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          <span>
            <Icon.List size="1.1rem" className="me-1" />
            <span className="fs-5">Paiements</span>
          </span>
          <Button
            className="ms-auto d-block"
            size="sm"
            variant="outline-primary"
          >
            Payer
          </Button>
        </ListGroup.Item>

        {paiements?.map((paiement) => (
          <ListGroup.Item
            key={paiement.id}
            className="d-flex justify-content-between align-items-start"
          >
            <div>
              <div className="fw-bold">
                Montant : &nbsp;
                <MontantFormatText value={paiement.montant} withDevise />
              </div>
              <span className="fw-light d-block">N° {paiement.numero}</span>
              <Stack direction="horizontal" className="mt-1 fw-light">
                <span className="me-1">
                  {DateFormater.toDate(paiement.date_traitement)}
                </span>
                <EtatPaiement etat={paiement.etat} />
              </Stack>
            </div>
            <Button className="ms-auto d-block" size="sm" variant="default">
              <Icon.ThreeDotsVertical />
              {/* modidier */}
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {/* <Accordion className="mb-4">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Paiements</Accordion.Header>
          <Accordion.Body className="p-1">
            <ListGroup variant="flush">

            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      {/* <Card> */}
      {/* <View.Header
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
              /> */}
      {/* <Card.Header>
          <Stack direction="vertical">
            <h3 className="mb-1 d-flex align-items-center">
              <Icon.CurrencyDollar className="me-2" />
              Cotisation
            </h3>
            <div className="text-muted">
              Montant de la cotisation de l'année {annee.value}
            </div>
          </Stack>
        </Card.Header>
        <Card.Body>
          {renderContent()}
          
        </Card.Body>
        <Card.Header>
          <Stack direction="vertical">
            <h3 className="mb-1 d-flex align-items-center">
              <Icon.ListUl className="me-2" />
              Paiements
            </h3>
            <div className="text-muted">
              Paiements effectués pour la cotisation de l'année {annee.value}
            </div>
          </Stack>
        </Card.Header>
        <Card.Body>
          <div className="table-responsivse">
            <table className="table table-striped table-md">
              <thead>
                <tr>
                  <th scope="col">
                    <Stack direction="horizontal">
                      Fonction
                      <span className="ms-auto">
                        <Icon.SortUp />
                      </span>
                    </Stack>
                  </th>
                  <th scope="col">Organisation</th>
                  <th scope="col">
                    <Stack direction="horizontal">
                      Date début
                      <span className="ms-auto text-muted">
                        <Icon.SortUp />
                      </span>
                    </Stack>
                  </th>
                  <th scope="col">Date fin</th>
                  <th scope="col">Etat</th>
                  {/* <th scope="col">Cotisation</th>
                                <th scope="col" className="text-end">
                                  Actions
                                </th> */}
      {/* </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Scout</td>
                  <td>Chaka</td>
                  <td>28/01/1900</td>
                  <td></td>
                  <td>
                    <Badge bg="success">actif</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body> */}
      {/* </Card>  */}
    </>
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
        <View.Item label="Etat">
          <Badge bg="success">A jour</Badge>
        </View.Item>
      ) : (
        <View.Item label="Reste a payer">
          <Badge bg="info">
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

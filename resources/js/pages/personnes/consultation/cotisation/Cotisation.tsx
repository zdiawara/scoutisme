import { MontantFormatText, View } from "components";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { CotisationResource } from "types/personne.type";
import { EtatCotisation } from "./EtatCotisation";

type CotisationProps = {
  cotisation: CotisationResource;
  resteAPayer: number;
};

export const Cotisation: FC<CotisationProps> = ({ cotisation, resteAPayer }) => {
  return (
    <Row className="g-3">
      <Col xs={6} sm={4}>
        <View.Item label="Montant a payer">
          <MontantFormatText value={cotisation?.montant_total} withDevise />
        </View.Item>
      </Col>
      <Col xs={6} sm={4}>
        <View.Item label="Reste a payer">
          <MontantFormatText value={resteAPayer} withDevise />
        </View.Item>
      </Col>
      <Col xs={6} sm={4}>
        <View.Item label="Etat cotisation">
          <EtatCotisation etat={cotisation.etat} />
        </View.Item>
      </Col>
    </Row>
  );
};

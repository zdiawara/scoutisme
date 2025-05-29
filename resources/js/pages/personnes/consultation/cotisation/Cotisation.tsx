import { MontantFormatText, View } from "components";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { CotisationResource } from "types/personne.type";
import { EtatCotisation } from "./EtatCotisation";

type CotisationProps = {
  cotisation: CotisationResource;
};

export const Cotisation: FC<CotisationProps> = ({ cotisation }) => {
  return (
    <Row className="g-3">
      <Col xs={6}>
        {cotisation && (
          <View.Item label="Montant a payer">
            <MontantFormatText value={cotisation?.montant_total} withDevise />
          </View.Item>
        )}
      </Col>
      <Col xs={6}>
        <EtatCotisation cotisation={cotisation} />
      </Col>
    </Row>
  );
};

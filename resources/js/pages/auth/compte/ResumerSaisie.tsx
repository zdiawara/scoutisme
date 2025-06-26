import { FC } from "react";
import { Button, Col, Row, Stack } from "react-bootstrap";
import { AuthPersonne } from "types/personne.type";

type Props = {
  prevStep: () => void;
  enregistrer: () => void;
  personne: AuthPersonne;
};

export const ResumerSaisie: FC<Props> = ({ prevStep, enregistrer, personne }) => {
  return (
    <Row className="g-3">
      <Col xs={12}>
        <p>
          Terminer l'ouverture de compte en cliquant sur le bouton <b>Enregistrer</b>
        </p>
        <p>
          Un mail de vérification sera envoyé à votre adresse email &nbsp;
          <b>{personne.email}</b>
        </p>
      </Col>
      <Stack direction="horizontal" className="mb-0 text-center ">
        <Button onClick={prevStep} variant="outline-primary" className="w-100 me-1">
          Précédent
        </Button>
        <Button variant="primary" className="w-100" onClick={enregistrer}>
          Enregistrer
        </Button>
      </Stack>
    </Row>
  );
};

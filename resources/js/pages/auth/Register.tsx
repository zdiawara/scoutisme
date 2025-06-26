import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { authApi } from "api/index";
import { SaisirLogin } from "./compte/SaisirLogin";
import { SaisirMotDePasse } from "./compte/SaisirMotDePasse";
import { AuthPersonne } from "types/personne.type";
import { ResumerSaisie } from "./compte/ResumerSaisie";

export type UserData = {
  email: string;
  password: string;
};

const Register = () => {
  // const auth = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [personne, setPersonne] = useState<AuthPersonne | undefined>();
  const [password, setPassword] = useState<string>("");

  // const navigate = useNavigate();

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const enregistrer = async () => {
    if (!personne) {
      return;
    }
    await authApi.register({ code: personne?.code, password });
    nextStep();
  };

  const gotoSaisirMotDePasse = (personne: AuthPersonne) => {
    setPersonne(personne);
    nextStep();
  };

  const gotoResumePage = (password: string) => {
    setPassword(password);
    nextStep();
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return <SaisirLogin defaultCode={personne?.code} nextStep={gotoSaisirMotDePasse} />;
    }
    if (currentStep === 2) {
      return <SaisirMotDePasse nextStep={gotoResumePage} prevStep={prevStep} password={password} />;
    }
    if (currentStep === 3 && personne) {
      return <ResumerSaisie enregistrer={enregistrer} prevStep={prevStep} personne={personne} />;
    }
    if (currentStep === 4) {
      return (
        <Alert variant="success">
          <Alert.Heading>Création de compte</Alert.Heading>
          <p>Votre compte a été créé avec succès.</p>
          <p>
            Un mail de vérification a été envoyé à l'adresse email&nbsp;
            <b>{personne?.email}</b>
          </p>
        </Alert>
      );
    }
  };

  return (
    <Container className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5} xxl={4}>
          <Card>
            <Card.Header className="pt-3 pb-3 text-center bg-primary">
              <div className="text-white fs-3">ASBF</div>
            </Card.Header>
            <Card.Body className="p-4">
              {currentStep !== 4 && <h3 className="text-center mb-3">Création d'un compte</h3>}
              {renderContent()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

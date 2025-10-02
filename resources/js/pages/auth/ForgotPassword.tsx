import { authApi } from "api/index";
import { TextInput } from "components/index";
import { withForm, WrapperProps } from "hoc/withForm";
import { Header } from "layout/Header";
import { FC } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";

const Form: FC<WrapperProps> = ({ onSubmit }) => (
  <Row className="g-3">
    <Col xs={12}>
      <TextInput name="email" label="Email" placeholder="Votre adresse email" isRequired />
    </Col>

    <div>
      <Button variant="primary" onClick={onSubmit} className="d-block w-100" disabled={false}>
        Envoyer le lien
      </Button>

      <span className="my-2 d-block text-center">OU</span>

      <Button variant="outline-primary" onClick={onSubmit} className="d-block w-100" disabled={false}>
        Quitter la page
      </Button>
    </div>
  </Row>
);

const ForgotPasswordForm = withForm(Form);

const ForgotPassword = () => {
  const envoyerLien = async (body: { email: string }) => {
    return await authApi.forgotPassword(body);
  };

  return (
    <Container className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5} xxl={4}>
          <Header title="Mot de passe oublié ?" />

          <Card className="mt-3">
            <Card.Header className="pt-3 pb-3 text-center bg-primary">
              <div className="text-white fs-3">ASBF</div>
            </Card.Header>
            <Card.Body className="p-4">
              <Alert variant="warning">
                Saisissez votre adresse e-mail afin de recevoir un lien de réinitialisation de votre mot de passe.
              </Alert>
              <ForgotPasswordForm
                onSave={envoyerLien}
                notificationOptions={{ message: "Lien de réinitialisation envoyé" }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;

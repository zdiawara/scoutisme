import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { withForm, WrapperProps } from "hoc/withForm";
import { TextInput } from "components";
import { FC } from "react";
import { authApi } from "api/index";
import { LINKS } from "utils/links";

const Form: FC<WrapperProps> = ({ onSubmit }) => (
  <Row className="g-3">
    <Col xs={12}>
      <TextInput name="email" label="Email" placeholder="Votre adresse email" isRequired />
    </Col>

    <Col xs={12}>
      <TextInput type="password" name="password" label="Mot de passe" placeholder="Votre mot de passe" isRequired />
    </Col>

    <Button variant="primary" onClick={onSubmit} className="d-block w-100" disabled={false}>
      Connexion
    </Button>
  </Row>
);

const AuthForm = withForm(Form);

export type UserData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const logUser = async (body: UserData) => {
    await authApi.login(body);
  };

  return (
    <>
      <Container className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5} xxl={4}>
            <Card>
              <Card.Header className="pt-3 pb-3 text-center bg-primary">
                <div className="text-white fs-3">ASBF</div>
              </Card.Header>
              <Card.Body className="p-4">
                <AuthForm
                  onSave={logUser}
                  onFinished={() => {
                    navigate(LINKS.home);
                  }}
                  withNotification={false}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;

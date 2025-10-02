import { authApi } from "api/index";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PasswordForm } from "./PasswordForm";
import { notifier } from "utils/notification";
import { LINKS } from "utils/links";

export type PasswordData = {
  password: string;
  confirmedPassword: string;
};

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    async function verify(email: string, token: string) {
      try {
        await authApi.verifyResetToken({ email, token });
        setIsValid(true);
      } catch (e: any) {
        notifier.erreur(e.errors.message);
        navigate(LINKS.login);
      }
    }

    if (email && token) {
      verify(email, token);
    }
  }, [email, navigate, token]);

  if (isValid === null) {
    return <p>Vérification en cours...</p>;
  }

  if (!isValid) {
    return <p>Les paramètres de réinitialisation ne sont pas valides</p>;
  }

  const resetPassword = async (body: PasswordData) => {
    return await authApi.resetPassword({
      password: body.password,
      password_confirmation: body.confirmedPassword,
      email: email || "",
      token: token || "",
    });
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
              <PasswordForm
                onSave={resetPassword}
                onFinished={() => {
                  navigate(LINKS.home);
                }}
                notificationOptions={{ message: "Mot de passe réinitialiser" }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;

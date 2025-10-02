import { authApi } from "api/index";
import { Card, Col, Row } from "react-bootstrap";
import { PasswordForm } from "./PasswordForm";
import { Header } from "layout/Header";
import { useNavigate } from "react-router-dom";

export type PasswordData = {
  password: string;
  confirmedPassword: string;
};

const UpdatePassword = () => {
  const navigate = useNavigate();

  const updatePassword = async (body: PasswordData) => {
    return await authApi.updatePassword({
      password: body.password,
      password_confirmation: body.confirmedPassword,
    });
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Header title="Modifier mot de passe" />
        <Card className="mt-4">
          <Card.Body className="p-4">
            <PasswordForm
              onSave={updatePassword}
              onFinished={() => {
                navigate(-1);
              }}
              notificationOptions={{ message: "Mot de passe mis à jour" }}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdatePassword;

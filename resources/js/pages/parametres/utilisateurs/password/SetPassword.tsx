import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authApi } from "api/index";
import { LINKS } from "utils/links";
import { PasswordForm } from "pages/auth/PasswordForm";

export type UserData = {
  password: string;
  confirmedPassword: string;
};

const SetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const logUser = async (userData: UserData) => {
    return await authApi.setPassword({
      password: userData.password,
      password_confirmation: userData.confirmedPassword,
      hash: searchParams.get("hash") || "",
    });
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
                <PasswordForm
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

export default SetPassword;

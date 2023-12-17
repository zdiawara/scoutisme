import { Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AccountLayout from "./common/AccountLayout";
import { VerticalForm } from "./common/VerticalForm";
import FormInput from "./common/FormInput";
import { authApi } from "api";
import { useAuth } from "hooks";
import { LINKS } from "utils";

export type UserData = {
  email: string;
  password: string;
};

const Login = () => {
  /*   const {
    loading,
    userLoggedIn,
    user,
    error,
    schemaResolver,
    onSubmit,
    redirectUrl,
  } = useLogin(); */
  const auth = useAuth();
  const navigate = useNavigate();

  const logUser = async (body: UserData) => {
    authApi.login(body).then(({ access_token }) => {
      localStorage.setItem("@token", access_token);
      navigate(LINKS.home, {
        replace: true,
      });
    });
  };

  return (
    <>
      {auth.user && <Navigate to="/" replace />}

      <AccountLayout>
        <div className="text-center">
          <h4 className="text-primary text-center mt-0 fw-bold">
            Authentification
          </h4>
          <p className="text-muted mb-4">
            Entrez votre adresse mail et mot de passe pour vous accèder à
            l'application
          </p>
        </div>

        {/*         {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )} */}

        <VerticalForm<UserData>
          onSubmit={logUser}
          //resolver={}
          defaultValues={{
            email: "admin@asbf.bf",
            password: "secret",
          }}
        >
          <FormInput
            label="Email"
            type="text"
            name="email"
            placeholder="Adresse email"
            containerClass="mb-3"
          />
          <FormInput
            label={"Mot de passe"}
            type="password"
            name="password"
            placeholder="Mot de passe"
            containerClass="mb-3"
          >
            <Link
              to="/account/forget-password"
              className="text-muted float-end"
            >
              <small>Mot de passe oublié ?</small>
            </Link>
          </FormInput>

          <div className="mb-3 mb-0 text-center">
            <Button variant="primary" type="submit" disabled={false}>
              Se connecter
            </Button>
          </div>
        </VerticalForm>
      </AccountLayout>
    </>
  );
};

export default Login;

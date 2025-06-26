import { authApi } from "api/index";
import { TextInput } from "components/index";
import { FC, useState } from "react";
import { Alert, Button, Col, Row, Stack } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthPersonne } from "types/personne.type";
import { LINKS } from "utils/links";

type Props = {
  nextStep: (personne: AuthPersonne) => void;
  defaultCode?: string;
};

export const SaisirLogin: FC<Props> = ({ nextStep, defaultCode }) => {
  const methods = useForm<{ code: string }>({
    defaultValues: { code: defaultCode },
  });

  const [error, setError] = useState<string | undefined>();

  const verifierCode = async () => {
    const { code } = methods.getValues();
    try {
      const personne = await authApi.verifierCode(code);
      nextStep(personne);
    } catch (error) {
      setError((error as Record<string, { message: string }>)?.errors?.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <Row className="g-3">
        <p className="text-center fw-light text-muted mb-0">
          Renseigner votre code attribué lors de votre inscription.
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Col xs={12}>
          <TextInput name="code" label="Code" placeholder="Votre identifiant unique" isRequired />
        </Col>
        <Stack direction="horizontal" className="mb-0 text-center ">
          <Link to={LINKS.login} className="btn-outline-primary btn w-100 me-1">
            Précédent
          </Link>
          <Button variant="primary" className="w-100" onClick={verifierCode}>
            Suivant
          </Button>
        </Stack>
      </Row>
    </FormProvider>
  );
};

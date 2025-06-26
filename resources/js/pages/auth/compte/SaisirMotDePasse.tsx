import { TextInput } from "components/index";
import { FC } from "react";
import { Button, Col, Row, Stack } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  prevStep: () => void;
  nextStep: (password: string) => void;
  password: string;
};

export const SaisirMotDePasse: FC<Props> = ({ prevStep, nextStep, password }) => {
  const methods = useForm<{ password: string }>({
    defaultValues: { password },
  });
  return (
    <FormProvider {...methods}>
      <Row className="g-3">
        <p className="text-center fw-light text-muted mb-0">Renseigner votre mot de passe.</p>
        <Col xs={12}>
          <TextInput type="password" name="password" label="Mot de passe" placeholder="Votre mot de passe" isRequired />
        </Col>
        <Stack direction="horizontal" className="mb-0 text-center ">
          <Button onClick={prevStep} variant="outline-primary" className="w-100 me-1">
            Précédent
          </Button>
          <Button variant="primary" className="w-100" onClick={() => nextStep(methods.getValues().password)}>
            Suivant
          </Button>
        </Stack>
      </Row>
    </FormProvider>
  );
};

import { Button, Col, Row } from "react-bootstrap";
import { withForm, WrapperProps } from "hoc/withForm";
import { TextInput } from "components";
import { FC, useMemo } from "react";
import * as yup from "yup";
import { useFormContext } from "react-hook-form";
import zxcvbn from "zxcvbn";

const schema = yup.object({
  password: yup.string().required().min(8).nullable(),
  confirmedPassword: yup
    .string()
    .nullable()
    .required()
    .test({
      message: "Doit être égal au mot de passe",
      test: (_, ctx) => {
        const { password, confirmedPassword } = ctx.parent;
        return password === confirmedPassword;
      },
    }),
});

const getProgressBarClass = (score: number) => {
  switch (score) {
    case 0:
      return "bg-light"; // Gris si vide
    case 1:
      return "bg-danger"; // Rouge si faible
    case 2:
      return "bg-danger"; // Jaune si moyen
    case 3:
      return "bg-warning"; // Bleu si bon
    case 4:
      return "bg-success"; // Vert si très fort
    default:
      return "bg-secondary";
  }
};

const getLabel = (score: number) => {
  switch (score) {
    case 0:
      return ""; // Gris si vide
    case 1:
      return "Faible"; // Rouge si faible
    case 2:
      return "Faible"; // Jaune si moyen
    case 3:
      return "Bon"; // Bleu si bon
    case 4:
      return "Très fort"; // Vert si très fort
    default:
      return "";
  }
};

const Form: FC<WrapperProps> = ({ onSubmit }) => {
  const { watch } = useFormContext();
  const password = watch("password");

  const result = useMemo(() => {
    const score = password && password.length > 0 ? zxcvbn(password).score : 0;
    const bg = getProgressBarClass(score);
    return {
      score,
      bg,
      label: getLabel(score),
    };
  }, [password]);

  return (
    <Row className="g-3">
      <Col xs={12}>
        <h2 className="h4">Définir un Mot de Passe Sécurisé</h2>
        <div>
          Votre mot de passe sécurisé doit respecter les critères suivants :
          <ul>
            <li>
              Comporter au moins <strong>8 caractères.</strong>
            </li>
            <li>
              Inclure une combinaison <strong>de chiffres, de symboles et de lettres majuscules.</strong>
            </li>
          </ul>
        </div>
      </Col>

      <Col xs={12}>
        <TextInput type="password" name="password" label="Mot de passe" placeholder="Votre mot de passe" isRequired />
      </Col>
      <Col xs={12}>
        <div className="progress" style={{ height: "10px" }}>
          <div
            className={`progress-bar ${result.bg}`}
            role="progressbar"
            style={{ width: `${(result.score + 1) * 25}%` }}
            aria-valuenow={(result.score + 1) * 25}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {result.label}
          </div>
        </div>
      </Col>

      <Col xs={12}>
        <TextInput
          type="password"
          name="confirmedPassword"
          label="Confirmer mot de passe"
          placeholder="Confirmer mot de passe"
          isRequired
        />
      </Col>

      <Button variant="primary" onClick={onSubmit} className="d-block w-100">
        Enregistrer
      </Button>
    </Row>
  );
};

export const PasswordForm = withForm(Form, schema);

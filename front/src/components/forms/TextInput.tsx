import { FC, useMemo } from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

type TextInputProps = {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
  isRequired?: boolean;
};

export const TextInput: FC<TextInputProps> = ({
  label,
  isRequired,
  name,
  ...rest
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  const error = useMemo(() => {
    return errors[name];
  }, [errors, name]);

  return (
    <Form.Group className="position-relative">
      {label && (
        <Form.Label htmlFor={name} className="fw-semibold text-secondary">
          {label}
          {isRequired ? <strong className="text-danger">&nbsp;*</strong> : null}
        </Form.Label>
      )}
      <Form.Control
        className="text-black fw-semibold"
        id={name}
        {...rest}
        {...register(name)}
        name={name}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message?.toString()}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

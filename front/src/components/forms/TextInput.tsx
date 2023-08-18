import { FC, useMemo } from "react";
import { Form } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import MaskedInput, { Mask } from "react-text-mask";

type TextInputProps = {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
  isRequired?: boolean;
  mask?: Mask;
};

export const TextInput: FC<TextInputProps> = ({
  label,
  isRequired,
  name,
  mask,
  ...rest
}) => {
  const {
    formState: { errors },
    register,
    control,
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
      {mask ? (
        <>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <MaskedInput
                mask={mask}
                id={name}
                placeholder="00 00 00 00"
                className="form-control text-black fw-semibold"
                {...field}
              />
            )}
          />
        </>
      ) : (
        <Form.Control
          className="text-black fw-semibold"
          id={name}
          {...rest}
          {...register(name)}
          name={name}
          isInvalid={!!error}
        />
      )}
      <Form.Control.Feedback type="invalid">
        {error?.message?.toString()}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

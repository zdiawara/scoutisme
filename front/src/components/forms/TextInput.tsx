import { TooltipHelper } from "components/view";
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
  description?: string;
};

export const TextInput: FC<TextInputProps> = ({
  label,
  isRequired,
  name,
  mask,
  description,
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
        <Form.Label htmlFor={name}>
          {label}
          {isRequired ? <strong className="text-danger">&nbsp;*</strong> : null}
          {description && <TooltipHelper description={description} />}
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
                className="form-control text-black fw-semibold"
                {...field}
              />
            )}
          />
        </>
      ) : (
        <Form.Control
          className="text-primary fw-semibold"
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

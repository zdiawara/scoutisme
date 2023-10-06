import { useMemo } from "react";
import { Form, FormCheckProps } from "react-bootstrap";
import { BsPrefixRefForwardingComponent } from "react-bootstrap/esm/helpers";
import { useFormContext, Controller } from "react-hook-form";

export const Radio: BsPrefixRefForwardingComponent<"input", FormCheckProps> = (
  props
) => {
  const {
    formState: { errors },
    setValue,
    control,
  } = useFormContext();

  const error = useMemo(() => {
    return props.name && errors[props.name];
  }, [errors, props.name]);

  return (
    <>
      <Controller
        name={props.name || "mode"}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Form.Check
              {...props}
              onChange={(e) => {
                setValue(props.name || "", e.target.value);
              }}
              defaultChecked={value === props.value}
              //value={watch(props.name || "mode")}
              //checked={value === props.value}
            />
          );
        }}
      />

      {/* <Form.Control.Feedback type="invalid">
        {error?.message?.toString()}
      </Form.Control.Feedback> */}
    </>
  );
};

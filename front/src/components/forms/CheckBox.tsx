//import { useMemo } from "react";
import { Form, FormCheckProps } from "react-bootstrap";
import { BsPrefixRefForwardingComponent } from "react-bootstrap/esm/helpers";
import { useFormContext, Controller } from "react-hook-form";

export const Radio: BsPrefixRefForwardingComponent<"input", FormCheckProps> = (
  props
) => {
  const {
    //  formState: { errors },
    setValue,
    control,
  } = useFormContext();

  /*   const error = useMemo(() => {
    return props.name && errors[props.name];
  }, [errors, props.name]); */

  return (
    <>
      <Controller
        name={props.name || "mode"}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Form.Check
              {...props}
              id={props.id || props.name}
              onChange={(e) => {
                const value = e.target.checked ? e.target.value : undefined;
                if (props.name) {
                  setValue(props.name, value);
                }
                if (props.onChange) {
                  props.onChange(e);
                }
              }}
              defaultChecked={value === props.value}
            />
          );
        }}
      />
    </>
  );
};

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
              id={props.name}
              onChange={(e) => {
                if (e.target.checked) {
                  console.log(e.target.checked);
                  setValue(props.name || "", e.target.value);
                } else {
                  setValue(props.name || "", undefined);
                }
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

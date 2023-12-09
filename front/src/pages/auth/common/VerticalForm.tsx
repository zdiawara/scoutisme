import React from "react";
import {
  useForm,
  Resolver,
  SubmitHandler,
  DefaultValues,
  FieldValues,
} from "react-hook-form";

type VerticalFromProps<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  resolver?: Resolver<T>;
  children?: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  formClass?: string;
};

export const VerticalForm = <
  T extends Record<string, any> = Record<string, any>
>({
  defaultValues,
  resolver,
  children,
  onSubmit,
  formClass,
}: VerticalFromProps<T>) => {
  /*
   * form methods
   */
  const methods = useForm<T>({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClass} noValidate>
      {Array.isArray(children)
        ? children.map((child) => {
            if (child.props && child.props.name) {
              return React.createElement(child.type, {
                ...{
                  ...child.props,
                  register,
                  key: child.props.name,
                  errors,
                  control,
                },
              });
            }
            return child;
          })
        : children}
    </form>
  );
};

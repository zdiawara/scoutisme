import classNames from "classnames";
import { TooltipHelper } from "components/view";
import { FC, useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import { AsyncSelectProps, SelectItem, SelectProps } from "types/form.type";

export const Select: FC<SelectProps> = ({
  label,
  isRequired,
  placeholder,
  name,
  isClearable = true,
  initialOptions,
  isDisabled,
}) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const error = useMemo(() => {
    return errors[name];
  }, [errors, name]);

  return (
    <Form.Group className="position-relative">
      {label && (
        <Form.Label className="text-muted text-uppercase fs-6">
          {label}
          {isRequired ? <strong className="text-danger">&nbsp;*</strong> : null}
        </Form.Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            className={classNames("react-select", { "is-invalid": !!error })}
            classNamePrefix="react-select"
            placeholder={placeholder}
            name={name}
            isClearable={isClearable}
            options={initialOptions}
            isDisabled={isDisabled}
            noOptionsMessage={() => "Pas de données"}
          />
        )}
      />
      <Form.Control.Feedback type="invalid">{error?.message?.toString()}</Form.Control.Feedback>
    </Form.Group>
  );
};

Select.defaultProps = {
  isClearable: true,
};

const Option = (props: any) => {
  const { innerProps, innerRef } = props;
  const { label, subtitle } = props.data;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: props.isFocused ? "#e9ecef" : "white", // Bootstrap's 'light' background
        cursor: "pointer",
      }}
      className="border-bottom px-2 py-2"
    >
      {label}
      {subtitle && <div className="fw-light fs-6">{subtitle}</div>}
    </div>
  );
};

export const AsyncSelect: FC<AsyncSelectProps> = ({
  label,
  placeholder,
  name,
  isClearable,
  isRequired,
  isDisabled,
  fetchOptions,
  afterSelected,
  resetDeps,
  description,
  isMulti,
}) => {
  const [options, setOptions] = useState<SelectItem[]>([]);
  const {
    formState: { errors },
    control,
    watch,
  } = useFormContext();

  useEffect(() => {
    setOptions([]);
  }, [resetDeps]);

  const error = useMemo(() => {
    return errors[name];
  }, [errors, name]);

  const maybeLoadOptions = async () => {
    if (!options.length) {
      const data = await fetchOptions();
      setOptions(data);
    }
  };

  return (
    <>
      <Form.Group className="position-relative">
        {label && (
          <Form.Label className="text-muted text-uppercase fs-6">
            {label}
            {isRequired ? <strong className="text-danger">&nbsp;*</strong> : null}
            {description && <TooltipHelper description={description} />}
          </Form.Label>
        )}

        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, ...rest } }) => (
            <ReactSelect
              {...rest}
              isMulti={isMulti}
              value={watch(name)}
              onChange={(newValue, action) => {
                onChange(newValue, action);
                afterSelected && afterSelected(newValue);
              }}
              components={{ Option }}
              className={classNames("react-select", {
                "is-invalid": !!error,
              })}
              placeholder={placeholder}
              isClearable={isClearable}
              classNamePrefix="react-select"
              noOptionsMessage={() => "Pas de données"}
              options={options}
              isDisabled={isDisabled}
              onFocus={maybeLoadOptions}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">{error?.message?.toString()}</Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export const AsyncSelectSimple: FC<
  AsyncSelectProps & {
    onChange: (v: any, action: any) => void;
    value?: SelectItem;
  }
> = ({
  label,
  placeholder,
  name,
  isClearable,
  isRequired,
  isDisabled,
  fetchOptions,
  afterSelected,
  resetDeps,
  description,
  onChange,
  value,
}) => {
  const [options, setOptions] = useState<SelectItem[]>([]);

  useEffect(() => {
    setOptions([]);
  }, [resetDeps]);

  const maybeLoadOptions = async () => {
    if (!options.length) {
      const data = await fetchOptions();
      setOptions(data);
    }
  };

  return (
    <>
      <Form.Group className="position-relative">
        {label && (
          <Form.Label>
            {label}
            {isRequired ? <strong className="text-danger">&nbsp;*</strong> : null}
            {description && <TooltipHelper description={description} />}
          </Form.Label>
        )}

        <ReactSelect
          name={name}
          value={value}
          onChange={(newValue, action) => {
            onChange(newValue, action);
            afterSelected && afterSelected(newValue as SelectItem);
          }}
          className="react-select"
          placeholder={placeholder}
          isClearable={isClearable}
          classNamePrefix="react-select"
          noOptionsMessage={() => "Pas de données"}
          options={options}
          isDisabled={isDisabled}
          onFocus={maybeLoadOptions}
        />
      </Form.Group>
    </>
  );
};

import classNames from "classnames";
import { TooltipHelper } from "components/view";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import { AsyncSelectProps, SelectItem, SelectProps } from "types/form.type";
import SelectAsync from "react-select/async";

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

export const FetchSelect: FC<AsyncSelectProps> = ({
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
  isMulti = false,
}) => {
  const [options, setOptions] = useState<SelectItem[]>([]);
  const {
    formState: { errors },
    control,
    watch,
    // setValue,
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
                if (afterSelected) {
                  afterSelected(newValue);
                }
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

export const AsyncSelect: FC<AsyncSelectProps> = ({
  label,
  placeholder,
  name,
  isClearable,
  isRequired,
  isDisabled,
  fetchOptions,
  afterSelected,
  description,
  isMulti = false,
}) => {
  const {
    formState: { errors },
    control,
    watch,
    // setValue,
  } = useFormContext();

  const timeoutRef = useRef<any | null>(null);

  // const promiseOptions = (inputValue: string) => {
  //   return new Promise<ColourOption[]>((resolve) => {
  //     setTimeout(() => {
  //       resolve(filterColors(inputValue));
  //     }, 1000);
  //   });
  // };

  const loadOptions = (inputValue: string, callback: (options: Array<{ label: string; value: string }>) => void) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (!inputValue) {
        callback([]);
        return [];
      }
      try {
        const data = await fetchOptions(inputValue);
        callback(data);
      } catch (error) {
        console.error("Erreur API :", error);
        return [];
      }
    }, 500); // délai en ms
  };

  const error = useMemo(() => {
    return errors[name];
  }, [errors, name]);

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
            <SelectAsync
              {...rest}
              isMulti={isMulti}
              value={watch(name)}
              onChange={(newValue, action) => {
                onChange(newValue, action);
                if (afterSelected) {
                  afterSelected(newValue);
                }
              }}
              components={{ Option }}
              className={classNames("react-select", {
                "is-invalid": !!error,
              })}
              placeholder={placeholder}
              isClearable={isClearable}
              classNamePrefix="react-select"
              noOptionsMessage={() => "Pas de données"}
              isDisabled={isDisabled}
              loadOptions={loadOptions}
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
            if (afterSelected) {
              afterSelected(newValue as SelectItem);
            }
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

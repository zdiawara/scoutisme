import { FC, forwardRef, useMemo } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import frLocale from "date-fns/locale/fr";
import { getYear, getMonth } from "date-fns";
import { useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import classNames from "classnames";

type DatepickerInputProps = {
  onClick?: () => void;
  value?: string;
  inputClass: string;
  children?: React.ReactNode;
  error?: string;
};

/* Datepicker with Input */
const DatepickerInput = forwardRef<HTMLInputElement, DatepickerInputProps>(
  (props, ref) => {
    const onDateValueChange = () => {
      console.log("date value changed");
    };
    return (
      <>
        <input
          type="text"
          className={classNames("form-control text-black fw-semibold", {
            "is-invalid": !!props.error,
          })}
          onClick={props.onClick}
          value={props.value}
          onChange={onDateValueChange}
          ref={ref}
          placeholder="dd/MM/yyyy"
        />
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </>
    );
  }
);

//const years = range(1990, getYear(new Date()) + 1, 1);
const years = [1900, 2000];
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

type QuantumPerson = Omit<
  ReactDatePickerProps<string, boolean>,
  "onChange" | "name"
>;

const CustumDatePicker: FC<
  QuantumPerson & {
    onChange(date: null, event: React.SyntheticEvent<any> | undefined): void;
    error?: string;
  }
> = ({ error, ...props }) => {
  return (
    <ReactDatePicker
      {...props}
      selected={props.selected}
      onChange={props.onChange}
      customInput={<DatepickerInput error={error} inputClass="" />}
      className="form-control text-black"
      locale={frLocale}
      placeholderText="Date"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="btn btn-sm btn-light"
          >
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => {}}
            className="form-select"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            className="form-select"
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="btn btn-sm btn-light"
          >
            {">"}
          </button>
        </div>
      )}
    />
  );
};

type DatePickerHookFormProps = Omit<QuantumPerson, "selected">;

const DatePickerHookForm: FC<DatePickerHookFormProps & { name: string }> = (
  props
) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const error = useMemo(() => {
    return errors[props.name];
  }, [errors, props.name]);

  return (
    <>
      <CustumDatePicker
        {...props}
        selected={props.name ? watch(props.name) : new Date()}
        error={error?.message?.toString()}
        onChange={(date) => {
          if (props.name) {
            setValue(props.name, date);
          }
        }}
      />
    </>
  );
};

export const DatePicker: FC<
  {
    useHookForm: boolean;
    name: string;
    label?: string;
    onChange?: (date: any) => void;
  } & QuantumPerson
> = ({ useHookForm, name, label, ...props }) => {
  const Input = useHookForm ? (
    <DatePickerHookForm {...props} name={name} dateFormat="dd/MM/yyyy" />
  ) : (
    <CustumDatePicker
      {...props}
      selected={props.selected || new Date()}
      onChange={(data) => {
        props.onChange && props.onChange(data);
      }}
    />
  );

  return (
    <Form.Group className="position-relative">
      {label && (
        <Form.Label htmlFor={name}>
          {label}
          {props.required ? (
            <strong className="text-danger">&nbsp;*</strong>
          ) : null}
        </Form.Label>
      )}
      {Input}
      {/* <Form.Control.Feedback type="invalid">
        {error?.message?.toString()}
      </Form.Control.Feedback> */}
    </Form.Group>
  );
};

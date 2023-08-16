import { FC, forwardRef } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import frLocale from "date-fns/locale/fr";
import { getYear, getMonth } from "date-fns";

type DatepickerInputProps = {
  onClick?: () => void;
  value?: string;
  inputClass: string;
  children?: React.ReactNode;
};

/* Datepicker with Input */
const DatepickerInput = forwardRef<HTMLInputElement, DatepickerInputProps>(
  (props, ref) => {
    const onDateValueChange = () => {
      console.log("date value changed");
    };
    return (
      <input
        type="text"
        className="form-control date"
        onClick={props.onClick}
        value={props.value}
        onChange={onDateValueChange}
        ref={ref}
      />
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

const CustumDatePicker: FC<ReactDatePickerProps<string, boolean>> = () => {
  return (
    <ReactDatePicker
      selected={new Date()}
      onChange={() => {}}
      customInput={<DatepickerInput inputClass="" />}
      className="form-control"
      locale={frLocale}
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

export const DatePicker = () => {
  return <CustumDatePicker selected={new Date()} onChange={() => {}} />;
};

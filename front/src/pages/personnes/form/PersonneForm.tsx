import { ChangeEvent, FC, forwardRef } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Header, PageHeader } from "pages/common";
import { SelectVille, TextInput, View } from "components";
import { WrapperProps, withForm } from "hoc";
import { personneSchema } from "./personneSchema";
import { useFormContext } from "react-hook-form";
import { PersonneBox } from "../view";
import DatePicker from "react-datepicker";
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

const FormContainer: FC<WrapperProps> = ({
  renderButtons,
  title,
  subtitle,
}) => {
  const { setValue, watch } = useFormContext();

  const loadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = function () {
      if (reader.result) {
        setValue("photo", reader.result as string);
      }
    };
    reader.readAsDataURL(e.target.files?.[0] as File);
  };

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

  return (
    <>
      <PageHeader.View
        title={title}
        subtitle={subtitle}
        right={renderButtons()}
      />

      <Row>
        <Col xl={3} lg={3}>
          <PersonneBox source={watch("photo")}>
            <div className="text-center mt-3">
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => setValue("photo", undefined)}
              >
                Effacer
              </Button>
              <Button as="label" variant="info" size="sm">
                Choisir
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={loadFiles}
                />
              </Button>
            </div>
          </PersonneBox>
        </Col>
        <Col xl={9} lg={9} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <View.Header {...Header.infoGenerale} className="mb-4" />
              <Row className="g-3">
                <Col sm={6}>
                  <TextInput
                    name="nom"
                    label="Nom"
                    placeholder="Ex. Ouattara"
                    isRequired
                  />
                </Col>
                <Col sm={6}>
                  <TextInput
                    name="prenom"
                    label="Prénom"
                    placeholder="Ex. Moussa"
                    isRequired
                  />
                </Col>

                <Col sm={6}>
                  <TextInput
                    name="lieu_naissance"
                    label="Lieu naissance"
                    placeholder="Ex. Moussa"
                    isRequired
                  />
                </Col>

                <Col sm={6}>
                  <DatePicker
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
                </Col>
              </Row>

              <View.Header {...Header.contact} className="my-4" />

              <Row className="g-3">
                <Col sm={6}>
                  <TextInput
                    name="email"
                    label="Email"
                    placeholder="Adresse email"
                  />
                </Col>
                <Col sm={6}>
                  <TextInput
                    name="telephone"
                    label="Téléphone"
                    placeholder="Numéro de téléphone"
                  />
                </Col>
              </Row>

              <View.Header {...Header.adresse} className="my-4" />

              <Row className="g-3">
                <Col sm={6}>
                  <SelectVille name="ville" label="Ville" isRequired />
                </Col>

                <Col sm={6}>
                  <TextInput
                    name="adresse"
                    label="Adresse"
                    placeholder="Adresse de la personne"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export const PersonneForm = withForm(FormContainer, personneSchema);

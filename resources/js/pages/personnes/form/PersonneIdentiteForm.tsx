import { FC } from "react";
import { Col } from "react-bootstrap";
import { DatePicker, TextInput, ToggleGenre } from "components";

export const PersonneIdentiteForm: FC = () => {
  return (
    <>
      <Col xs={6} sm={6}>
        <TextInput name="nom" label="Nom" placeholder="Ex. Ouattara" isRequired />
      </Col>
      <Col xs={6} sm={6}>
        <TextInput name="prenom" label="Prenom" placeholder="Ex. Moussa" isRequired />
      </Col>
      <Col xs={6} sm={6}>
        <ToggleGenre name="genre" label="Genre" />
      </Col>
      <Col xs={6} sm={6}>
        <TextInput name="profession" label="Profession" placeholder="Profession" />
      </Col>
      <Col xs={6} sm={6}>
        <DatePicker name="date_naissance" label="Date naissance" useHookForm maxDate={new Date()} isClearable />
      </Col>

      <Col xs={6} sm={6}>
        <TextInput name="lieu_naissance" label="Lieu naissance" placeholder="Ex. Bobo Dioulasso" />
      </Col>
    </>
  );
};

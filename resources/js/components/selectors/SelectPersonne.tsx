import { useQuery } from "@tanstack/react-query";
import { genreApi, personneApi } from "api";
import { FetchSelect } from "components/forms/Select";
import { FC } from "react";
import { ButtonGroup, Form, ToggleButton } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { SelectProps } from "types/form.type";
import { GenreResource, PersonneResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";

export const SelectPersonne: FC<SelectProps> = ({ requestParams, ...props }) => {
  return (
    <FetchSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await personneApi.findAll<PersonneResource>(requestParams);
        return data.map((item) => ({
          label: `${item.prenom} ${item.nom}`,
          value: item.id,
          subtitle: item.code,
        }));
      }}
    />
  );
};

export const SelectPersonneSansFonction: FC<SelectProps> = ({ requestParams, ...props }) => {
  return (
    <FetchSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await personneApi.findPersonnesSansFonction(requestParams);
        return data.map((item) => ({
          label: `${item.prenom} ${item.nom}`,
          value: item.id,
        }));
      }}
    />
  );
};

export const SelectGenre: FC<SelectProps> = ({ requestParams, ...props }) => {
  return (
    <FetchSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await genreApi.findAll<GenreResource>(requestParams);
        return data.map((item) => ({ label: item.nom, value: item.id }));
      }}
    />
  );
};

export const SelectTypePersonne: FC<SelectProps> = ({ requestParams, ...props }) => {
  return (
    <FetchSelect
      {...props}
      fetchOptions={async () => {
        return [
          { label: "Scout", value: "scout" },
          { label: "Adulte", value: "adulte" },
        ];
      }}
    />
  );
};

type ToggleGenreProps = {
  name: string;
  label: string;
};
export const ToggleGenre: FC<ToggleGenreProps> = ({ name, label }) => {
  const { watch, setValue, formState } = useFormContext();

  const queryGenre = useQuery({
    queryKey: [QUERY_KEY.genres],
    queryFn: async () => {
      const result = await genreApi.findAll<GenreResource>();
      return result;
    },
  });

  const genre = watch(name);

  return (
    <>
      <Form.Group className="position-relative">
        <Form.Label className="text-muted d-block text-uppercase fs-6">
          {label}
          <strong className="text-danger">&nbsp;*</strong>
        </Form.Label>
        <ButtonGroup>
          {queryGenre.data?.data.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={genre === radio.id ? "outline-secondary" : "outline-secondary"}
              name="genre"
              value={radio.id}
              checked={genre === radio.id}
              onChange={(e) => setValue("genre", e.currentTarget.value)}
            >
              {radio.nom}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {formState?.errors[name]?.message && (
          <Form.Control.Feedback className="d-block" type="invalid">
            {formState?.errors[name]?.message as string}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </>
  );
};

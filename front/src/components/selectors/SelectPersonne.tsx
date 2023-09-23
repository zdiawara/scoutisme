import { genreApi, personneApi } from "api";
import { AsyncSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { GenreResource, PersonneResource } from "types/personne.type";

export const SelectPersonne: FC<SelectProps> = ({
  requestParams,
  ...props
}) => {
  return (
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await personneApi.findAll<PersonneResource>(
          requestParams
        );
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
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await genreApi.findAll<GenreResource>(requestParams);
        return data.map((item) => ({ label: item.nom, value: item.id }));
      }}
    />
  );
};

export const SelectTypePersonne: FC<SelectProps> = ({
  requestParams,
  ...props
}) => {
  return (
    <AsyncSelect
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

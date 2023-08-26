import { personneApi } from "api";
import { AsyncSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { PersonneResource } from "types/personne.type";

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
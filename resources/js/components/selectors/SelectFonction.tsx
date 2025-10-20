import { fonctionApi } from "api";
import { FetchSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { FonctionResource } from "types/personne.type";

export const SelectFonction: FC<SelectProps> = ({ requestParams, ...props }) => {
  return (
    <FetchSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await fonctionApi.findAll<FonctionResource>(requestParams);
        return data.map((item) => ({
          label: item.nom,
          value: item.id,
          item,
          subtitle: item.nature.nom,
        }));
      }}
    />
  );
};

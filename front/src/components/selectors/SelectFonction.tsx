import { fonctionApi } from "api";
import { AsyncSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { FonctionResource } from "types/personne.type";

export const SelectFonction: FC<SelectProps> = ({
  requestParams,
  ...props
}) => {
  return (
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        const { data } = await fonctionApi.findAll<FonctionResource>(
          requestParams
        );
        return data.map((item) => ({ label: item.nom, value: item.id }));
      }}
    />
  );
};

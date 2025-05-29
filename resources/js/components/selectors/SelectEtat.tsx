import { AsyncSelect } from "components/forms/Select";
import { FC } from "react";
import { SelectProps } from "types/form.type";
import { ETAT_PAIEMENTS } from "utils/constants";

export const SelectEtat: FC<SelectProps> = ({ requestParams, ...props }) => {
  return (
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        return [
          { label: "Actif", value: "true" },
          { label: "Inactif", value: "false" },
        ];
      }}
    />
  );
};

export const SelectEtatPaiement: FC<SelectProps> = ({
  requestParams,
  ...props
}) => {
  return (
    <AsyncSelect
      {...props}
      fetchOptions={async () => {
        return Object.entries(ETAT_PAIEMENTS).map((entry) => ({
          label: entry[1],
          value: entry[0],
        }));
      }}
    />
  );
};

import { FC } from "react";
import { fonctionApi } from "api";
import { FonctionResource } from "types/personne.type";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { fonctionConverter } from "./FonctionUtils";
import { SelectItem } from "types/form.type";
import { FonctionForm } from "./FonctionForm";

type FonctionModalProps = {
  closeModal: () => void;
  fonction?: FonctionResource;
  nature?: SelectItem;
};

/**
 * Modifier une fonction
 * @param param0
 * @returns
 */
export const EditFonction: FC<FonctionModalProps> = ({ closeModal, fonction, nature }) => {
  const query = useQueryClient();

  const save = (data: Record<string, SelectItem | number>) => {
    const body = fonctionConverter.toBody(data);
    if (fonction?.id) {
      return fonctionApi.update(fonction.id, body);
    }
    return fonctionApi.create(body);
  };

  return (
    <FonctionForm
      onSave={save}
      title={`${fonction?.id ? "Modifier" : "Ajouter"} une fonction`}
      subtitle="Fonction occupée par les membres de l'organe de direction"
      defaultValues={fonction?.id ? fonctionConverter.toInput(fonction) : { nature }}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.fonctions]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

import { HookModalForm } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { fonctionApi, personneApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PersonneFormInputs, personneConverter } from "../form";
import { personneSchema } from "../form/personneSchema";
import { FonctionResource } from "types/personne.type";
import { toast } from "react-toastify";

/**
 * Formulaire commun d'ajout et de modification d'une attribution
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <PersonneFormInputs />
    </HookModalForm>
  );
};

const ScoutForm = withMutationForm(Form, personneSchema);

type ScoutModalProps = {
  closeModal: () => void;
  organisation: OrganisationResource;
};

/**
 * Ajouter un scout dans une organisation
 * @param param0
 * @returns
 */
export const ScoutModal: FC<ScoutModalProps> = ({
  closeModal,
  organisation,
}) => {
  const query = useQueryClient();

  const fonctionScoutQuery = useQuery({
    queryKey: [QUERY_KEY.fonctions, "scout"],
    networkMode: "offlineFirst",
    queryFn: () => {
      return fonctionApi
        .findAll<FonctionResource>({ code: "scout" })
        .then((data) => data.data[0] || undefined);
    },
  });

  const ajouterScout = (data: Record<string, any>) => {
    return personneApi.create(personneConverter.toBody(data));
  };

  if (fonctionScoutQuery.isLoading) {
    return null;
  }

  if (!fonctionScoutQuery.data) {
    toast.error("Impossible de trouver la fonction scout", {
      autoClose: false,
      position: "bottom-right",
    });
    closeModal();
    return null;
  }

  const { data: fonction } = fonctionScoutQuery;

  return (
    <ScoutForm
      onSave={ajouterScout}
      title="Ajouter un scout"
      //subtitle={`Ce scout sera ajouté dans l'unité ${organisation.nom}`}
      modalProps={{
        dialogClassName: "modal-90w",
        centered: false,
        scrollable: true,
      }}
      modalBodyClassName="bg-light p-3"
      defaultValues={{
        type: { value: "scout" },
        attribution: {
          organisation: {
            label: organisation.nom,
            value: organisation.id,
          },
          fonction: { label: fonction.nom, value: fonction.id },
          date_debut: new Date(),
        },
      }}
      onSuccess={() => {
        if (organisation?.id) {
          query.invalidateQueries([QUERY_KEY.scouts, organisation.id]);
        }
        query.invalidateQueries([QUERY_KEY.personnes]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

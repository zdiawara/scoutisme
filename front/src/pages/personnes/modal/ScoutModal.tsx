import { HookModalForm } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { personneApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { PersonneFormInputs, personneConverter } from "../form";
import { personneSchema } from "../form/personneSchema";

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
  const ajouterMembre = (data: Record<string, any>) => {
    const body = {
      ...personneConverter.toBody(data),
      attribution: {
        organisation_id: organisation.id,
      },
    };
    return personneApi.create(body);
  };
  return (
    <ScoutForm
      onSave={ajouterMembre}
      title="Ajouter un scout"
      //subtitle=""
      modalProps={{
        dialogClassName: "modal-90w",
        centered: false,
        scrollable: true,
      }}
      modalBodyClassName="bg-light p-3"
      defaultValues={{
        natureId: organisation.nature.id,
        type: { value: "scout" },
      }}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.attributions, organisation.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

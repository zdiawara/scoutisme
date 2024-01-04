import { HookModalForm } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { personneApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { PersonneFormInputs, personneConverter } from "../form";
import { personneSchema } from "../form/personneSchema";
import { FonctionResource } from "types/personne.type";

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <PersonneFormInputs />
    </HookModalForm>
  );
};

const AdulteForm = withMutationForm(Form, personneSchema);

type CreateAdulteModalProps = {
  closeModal: () => void;
  organisation: OrganisationResource;
  fonction: FonctionResource;
};

/**
 * Ajouter un scout dans une organisation
 * @param param0
 * @returns
 */
export const CreateAdulteModal: FC<CreateAdulteModalProps> = ({
  closeModal,
  organisation,
  fonction,
}) => {
  const query = useQueryClient();

  const ajouter = (data: Record<string, any>) => {
    return personneApi.create(personneConverter.toBody(data));
  };

  return (
    <AdulteForm
      onSave={ajouter}
      title="Ajouter un adulte"
      subtitle={`Cette personne aura la fonction ${fonction.nom} dans l'organisation ${organisation.nom}`}
      modalProps={{
        dialogClassName: "modal-90w",
        size: "xl",
        centered: false,
        scrollable: true,
      }}
      modalBodyClassName="bg-light p-3"
      defaultValues={{
        type: { value: "adulte" },
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
          query.invalidateQueries([QUERY_KEY.direction, organisation.id]);
        }
        query.invalidateQueries([QUERY_KEY.personnes]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

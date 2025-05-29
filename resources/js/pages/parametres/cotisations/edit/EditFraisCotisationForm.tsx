import { HookModalForm } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, useMemo } from "react";
import { Row } from "react-bootstrap";
import { montantCotisationApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";

import { useFormContext } from "react-hook-form";
import { MontantForm } from "./MontantForm";
import { TypeOrganisationFraisCotisation } from "./TypeOrganisationFraisCotisation";
import { MontantCotisationResource } from "types/cotisation.type";

/**
 * Formulaire d'ajout et de modification d'un type d'unité
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  const { watch } = useFormContext();
  const type = watch("type");

  const renderMontantForm = () => {
    const profil = watch("profil");
    switch (profil) {
      case "tous":
        return <MontantForm key="tous" />;
      case "type_organisation":
        return <TypeOrganisationFraisCotisation key="type_organisation" type={type} />;
      default:
        throw new Error("Type de profil non prise en charge");
    }
  };

  return (
    <HookModalForm {...props} modalBodyClassName="bg-gray-100 p-3" onClose={props.onExit}>
      <Row className="g-3">{renderMontantForm()}</Row>
    </HookModalForm>
  );
};

const FraisCotisationForm = withMutationForm(Form);

type EditFraisCotisationFormProps = {
  closeModal: () => void;
  selected: MontantCotisationResource;
};

/**
 * Creer ou modifier un type d'unité
 * @param param0
 * @returns
 */
export const EditFraisCotisationForm: FC<EditFraisCotisationFormProps> = ({ closeModal, selected }) => {
  const query = useQueryClient();

  const defaultValues = useMemo(() => {
    return {
      type: selected.type,
      profil: selected.profil,
      montants: selected.montants,
    };
  }, [selected]);

  return (
    <FraisCotisationForm
      onSave={(data) =>
        montantCotisationApi.update(selected.id, {
          montants: data.montants,
        })
      }
      title={`${selected?.id ? "Modifier" : "Ajouter"} un montant`}
      defaultValues={defaultValues}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.fraisCotisations]);
        closeModal();
      }}
      onExit={closeModal}
      modalProps={{
        centered: true,
        scrollable: true,
      }}
    />
  );
};

import { HookModalForm, Radio, SelectNature, View } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { typeOrganisationApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { NATURE, QUERY_KEY } from "utils/constants";
import { typeUniteSchema, typeUniteConverter } from "./typeUniteUtils";
import { TypeOrganisationResource } from "types/organisation.type";
import { useFormContext } from "react-hook-form";
import {
  FonctionMontantForm,
  MontantForm,
  TypeOrganisationMontantForm,
} from "./form";

/**
 * Formulaire d'ajout et de modification d'un type d'unité
 * @param props
 * @returns
 */
const Form: FC<WrapperV2Props> = (props) => {
  const { watch, setValue } = useFormContext();
  const codeNature = watch("nature")?.item?.code;

  const renderMontantForm = () => {
    const profil = watch("profil");
    switch (profil) {
      case "tous":
        return <MontantForm key="tous" />;
      case "type_organisation":
        return (
          <TypeOrganisationMontantForm
            key="type_organisation"
            codeNature={codeNature}
          />
        );
      case "fonction":
        return <FonctionMontantForm key="fonction" codeNature={codeNature} />;
      default:
        throw new Error("Type de profil non prise en charge");
    }
  };

  const afterChangeProfil = (e: any) => {
    console.log("Changement de profil");
  };

  console.log("render");

  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Row className="g-3">
        <Col xs={12}>
          <SelectNature
            name="nature"
            label="Nature organisation"
            afterSelected={() => {
              setValue("profil", "tous");
            }}
          />
        </Col>

        <View.Header
          label="Direction"
          description="Informations générales de la personne"
          className="mb-0"
        />
        <Col xs={12}>
          <Radio
            name="profil"
            id="mode-1"
            label="Tout le monde"
            type="radio"
            inline
            value="tous"
            onChange={afterChangeProfil}
            checked={watch("profil") === "tous"}
          />
          {[NATURE.national].includes(codeNature) && (
            <Radio
              name="profil"
              id="mode-3"
              label="Par type organisation"
              type="radio"
              inline
              value="type_organisation"
              onChange={afterChangeProfil}
              checked={watch("profil") === "type_organisation"}
            />
          )}
          {codeNature !== NATURE.national && (
            <Radio
              name="profil"
              id="mode-2"
              label="Par fonction"
              type="radio"
              inline
              value="fonction"
              onChange={afterChangeProfil}
              checked={watch("profil") === "fonction"}
            />
          )}
        </Col>

        {renderMontantForm()}

        {[NATURE.unite].includes(codeNature) && (
          <>
            <View.Header
              label="Scout"
              description="Informations générales de la personne"
              className="mb-0"
            />

            <TypeOrganisationMontantForm codeNature={codeNature} />
          </>
        )}
      </Row>
    </HookModalForm>
  );
};

const TypeUniteForm = withMutationForm(Form, typeUniteSchema);

type TypeUniteModalProps = {
  closeModal: () => void;
  selected?: TypeOrganisationResource;
};

/**
 * Creer ou modifier un type d'unité
 * @param param0
 * @returns
 */
export const TypeUniteModal: FC<TypeUniteModalProps> = ({
  closeModal,
  selected,
}) => {
  const query = useQueryClient();

  const save = (data: Record<string, any>) => {
    const body = typeUniteConverter.toBody(data);
    if (selected?.id) {
      return typeOrganisationApi.update(selected.id, body);
    }
    return typeOrganisationApi.create(body);
  };

  return (
    <TypeUniteForm
      onSave={save}
      title={`${selected?.id ? "Modifier" : "Ajouter"} un montant`}
      defaultValues={
        selected?.id
          ? typeUniteConverter.toInput(selected)
          : {
              profil: "tous",
            }
      }
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.typesUnites]);
        closeModal();
      }}
      onExit={closeModal}
      modalProps={{
        centered: false,
        scrollable: true,
        size: "xl",
      }}
    />
  );
};

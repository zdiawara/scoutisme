import {
  DatePicker,
  HookModalForm,
  SelectFonction,
  SelectOrganisation,
} from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, useMemo } from "react";
import { startOfYear, addYears } from "date-fns";
import { Col, Row } from "react-bootstrap";
import { attributionApi, fonctionApi } from "api";
import { attributionConverter, personneAttributionSchema } from "../form";
import { FonctionResource, PersonneResource } from "types/personne.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NATURE, QUERY_KEY } from "utils/constants";
import { useFormContext } from "react-hook-form";

const Form: FC<WrapperV2Props> = (props) => {
  const { watch, setValue } = useFormContext();

  const isScout = props.meta.typePersonne === "scout";

  const organisation = watch("organisation");
  const natureId = organisation?.item?.nature?.id;
  const codeNature = organisation?.item?.nature?.code;
  const typeOrganisation = organisation?.item?.type?.id;

  const depNatures = useMemo(() => {
    return [natureId, typeOrganisation];
  }, [natureId, typeOrganisation]);

  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <Row className="g-2">
        <Col sm={12}>
          <SelectOrganisation
            label="Organisation"
            name="organisation"
            isClearable
            isRequired
            requestParams={{
              codeNature: isScout ? NATURE.unite : undefined,
            }}
            afterSelected={() => {
              if (!isScout) {
                setValue("fonction", null);
              }
            }}
          />
        </Col>
        {!isScout && (
          <Col sm={12}>
            <SelectFonction
              label="Fonction"
              name="fonction"
              isClearable
              isRequired
              isDisabled={!organisation}
              requestParams={{
                nature: natureId,
                typeId:
                  codeNature === NATURE.national ? typeOrganisation : null,
                codeExclude: isScout ? undefined : "scout",
              }}
              resetDeps={depNatures}
              afterSelected={(fonction) => {
                const duree_mandat = (fonction as any)?.item?.duree_mandat || 0;
                if (duree_mandat) {
                  const dateDebut = startOfYear(new Date());
                  setValue("date_debut", dateDebut);
                  setValue(
                    "date_fin",
                    addYears(dateDebut, parseInt(duree_mandat))
                  );
                }
              }}
            />
          </Col>
        )}
        <Col sm={6}>
          <DatePicker
            name="date_debut"
            label="Date début"
            useHookForm
            required
          />
        </Col>

        <Col sm={6}>
          <DatePicker name="date_fin" label="Date fin" useHookForm />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const OrganisationMembreForm = withMutationForm(
  Form,
  personneAttributionSchema
);

type AffecterPersonneModalProps = {
  personne: PersonneResource;
  closeModal: () => void;
};

/**
 *
 * @param param0
 * @returns
 */
export const AffecterPersonneModal: FC<AffecterPersonneModalProps> = ({
  personne,
  closeModal,
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

  const isScout = personne.type === "scout";

  const defaultValues = useMemo(() => {
    const fonction = isScout
      ? {
          value: fonctionScoutQuery?.data?.id,
          label: fonctionScoutQuery?.data?.nom,
        }
      : null;

    return { fonction };
  }, [fonctionScoutQuery.data, isScout]);

  const ajouterMembre = (data: Record<string, any>) => {
    const body = attributionConverter.toBody(data);

    return attributionApi.create({ ...body, personne_id: personne.id });
  };

  if (fonctionScoutQuery.isLoading) {
    return null;
  }

  if (!fonctionScoutQuery.data) {
    closeModal();
    return null;
  }

  return (
    <OrganisationMembreForm
      onSave={ajouterMembre}
      title={`Affecter ${personne.nom} ${personne.prenom} dans une ${
        isScout ? "unité" : "organisation"
      }`}
      defaultValues={defaultValues}
      meta={{ typePersonne: personne.type }}
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.attributions, personne.id]);
        query.invalidateQueries([QUERY_KEY.personnes, personne.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

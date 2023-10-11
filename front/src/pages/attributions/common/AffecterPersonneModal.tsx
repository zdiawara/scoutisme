import {
  DatePicker,
  HookModalForm,
  SelectFonction,
  SelectOrganisation,
} from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { fonctionApi, personneApi } from "api";
import { attributionConverter, personneAttributionSchema } from "../form";
import { FonctionResource, PersonneResource } from "types/personne.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NATURE, QUERY_KEY } from "utils/constants";
import { useFormContext } from "react-hook-form";

const Form: FC<WrapperV2Props> = (props) => {
  const { watch, setValue } = useFormContext();

  const isScout = props.meta.typePersonne === "scout";

  const natureId = watch("organisation")?.item?.nature?.id;

  const depNatures = useMemo(() => {
    return [natureId];
  }, [natureId]);

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
              requestParams={{
                nature: natureId,
                codeExclude: isScout ? undefined : "scout",
              }}
              resetDeps={depNatures}
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

  const { data: fonctionScout, isLoading } = useQuery({
    queryKey: ["fonction_scout"],
    networkMode: "offlineFirst",
    queryFn: () => {
      return fonctionApi.findAll<FonctionResource>({ code: "scout" });
    },
  });

  const ajouterMembre = (data: Record<string, any>) => {
    const { personne_id, ...rest } = attributionConverter.toBody(data);

    const body = { ...rest, type: "direction" };

    return personneApi.affecter(personne.id, body);
  };

  if (isLoading || !fonctionScout) {
    return null;
  }

  console.log(fonctionScout.data[0]);

  return (
    <OrganisationMembreForm
      onSave={ajouterMembre}
      title={`Affecter ${personne.nom} ${personne.prenom} dans une ${
        personne.type === "adulte" ? "organisation" : "unité"
      }`}
      defaultValues={{
        fonction:
          personne.type === "scout"
            ? {
                value: fonctionScout.data[0].id,
                label: fonctionScout.data[0].nom,
              }
            : null,
      }}
      meta={{ typePersonne: personne.type }}
      onSuccess={(data) => {
        query.invalidateQueries([QUERY_KEY.direction, data.organisation.id]);
        query.invalidateQueries([QUERY_KEY.attributions, personne.id]);
        query.invalidateQueries([QUERY_KEY.attribution_active, personne.id]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

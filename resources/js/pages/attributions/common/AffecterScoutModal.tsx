import { DatePicker, HookModalForm, SelectPersonne } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { attributionApi, fonctionApi } from "api";
import { affecterScoutSchema, attributionConverter } from "../form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { FonctionResource } from "types/personne.type";

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm {...props} modalBodyClassName="bg-light p-3" onClose={props.onExit}>
      <Row className="g-2">
        <Col sm={12}>
          <SelectPersonne
            label="Scout"
            name="personne"
            isClearable
            isRequired
            requestParams={{
              type: "scout",
            }}
          />
        </Col>

        <Col sm={6}>
          <DatePicker name="date_debut" label="Date début" useHookForm required />
        </Col>

        <Col sm={6}>
          <DatePicker name="date_fin" label="Date fin" useHookForm />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const AffecterScoutForm = withMutationForm(Form, affecterScoutSchema);

type AffecterScoutModalProps = {
  unite: OrganisationResource;
  closeModal: () => void;
};

/**
 *
 * @param param0
 * @returns
 */
export const AffecterScoutModal: FC<AffecterScoutModalProps> = ({ unite, closeModal }) => {
  const query = useQueryClient();

  const fonctionScoutQuery = useQuery({
    queryKey: [QUERY_KEY.fonctions, "scout"],
    networkMode: "offlineFirst",
    queryFn: () => {
      return fonctionApi.findAll<FonctionResource>({ code: "scout" }).then((data) => data.data[0] || undefined);
    },
  });

  const ajouterMembre = (data: Record<string, any>) => {
    const body = attributionConverter.toBody(data);
    return attributionApi.create({
      ...body,
      organisation_id: unite.id,
      fonction_id: fonctionScoutQuery.data?.id,
    });
  };

  if (fonctionScoutQuery.isLoading) {
    return null;
  }

  if (!fonctionScoutQuery.data) {
    closeModal();

    return null;
  }

  return (
    <AffecterScoutForm
      onSave={ajouterMembre}
      title="Affecter un scout"
      onSuccess={() => {
        query.invalidateQueries([QUERY_KEY.scouts, unite.id]);
        query.invalidateQueries([QUERY_KEY.personnes]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

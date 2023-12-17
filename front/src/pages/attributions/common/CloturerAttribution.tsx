import { useQueryClient } from "@tanstack/react-query";
import { DatePicker, HookModalForm } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { AttributionResource } from "types/personne.type";
import { attributionConverter } from "../form";
import { personneApi } from "api";
import { QUERY_KEY } from "utils/constants";

const Form: FC<WrapperV2Props> = (props) => {
  const { watch } = useFormContext();
  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <p className="text-dark">
        Vous êtes sur le point de clôturer la mission de&nbsp;
        <strong className="text-black">{watch("meta.fullname")}</strong>
        &nbsp; au poste de&nbsp;
        <strong className="text-black">{watch("meta.fonction")}</strong>
      </p>

      <Row>
        <Col sm={12}>
          <DatePicker
            name="date_fin"
            label="Date de clôture"
            isClearable
            required
            useHookForm
            minDate={new Date()}
          />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const CloturerAttributionForm = withMutationForm(Form);

type CloturerAttributionProps = {
  closeModal: () => void;
  attribution: AttributionResource;
};

export const CloturerAttribution: FC<CloturerAttributionProps> = ({
  closeModal,
  attribution,
}) => {
  const query = useQueryClient();

  const cloturerAttribution = (data: Record<string, any>) => {
    const body = attributionConverter.toBody(data);
    return personneApi.cloturerAttribution(attribution.personne.id, {
      date_fin: body.date_fin,
    });
  };

  return (
    <CloturerAttributionForm
      onSave={cloturerAttribution}
      title="Clôturer une attribution"
      defaultValues={{
        date_fin: new Date(),
        meta: {
          fullname: `${attribution.personne.prenom} ${attribution.personne.nom}`,
          fonction: attribution.fonction.nom,
        },
      }}
      modalProps={{ centered: true }}
      modalBodyClassName="bg-light"
      onSuccess={() => {
        query.invalidateQueries([
          QUERY_KEY.direction,
          attribution.organisation.id,
        ]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

import { HookModalForm, SelectPersonne } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { natureApi, organisationApi } from "api";
import { NatureResource, OrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { organisationConverter } from "../form";

const Form: FC<WrapperV2Props> = (props) => {
  const { watch, setValue } = useFormContext();
  const codeNature = watch("nature")?.item?.code;
  const parentCodeNature = watch("parent.codeNature");

  const { data: natures, isLoading } = useQuery({
    queryKey: [QUERY_KEY.natures],
    networkMode: "offlineFirst",
    queryFn: () => natureApi.findAll<NatureResource>(),
  });

  return (
    <HookModalForm {...props} onClose={props.onExit}>
      <Row className="g-2">
        <Col sm="12">
          <SelectPersonne name="test1" label="Boucle du mouhoum" />
        </Col>
        <Col sm="12">
          <SelectPersonne name="test2" label="Cascades" />
        </Col>
        <Col sm="12">
          <SelectPersonne name="test2s" label="Centre ESt" />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const ResponsableOrganisationForm = withMutationForm(Form);

type ResponsableOrganisationModalProps = {
  closeModal: () => void;
  organisation: OrganisationResource;
};

export const ResponsableOrganisationModal: FC<
  ResponsableOrganisationModalProps
> = ({ closeModal, organisation }) => {
  const query = useQueryClient();

  const createSousOrganisation = (data: Record<string, any>) => {
    const body = {
      ...organisationConverter.toBody(data),
      parent_id: organisation.id,
    };
    return organisationApi.create(body);
  };

  return (
    <ResponsableOrganisationForm
      onSave={createSousOrganisation}
      title="Nommer les responsables"
      subtitle="Positionner les personnes qui occupent la fonction de commissaire régional"
      modalProps={{
        size: "lg",
      }}
      modalHeaderProps={{
        closeButton: false,
      }}
      modalBodyClassName="bg-light p-3"
      defaultValues={{}}
      onSuccess={() => {
        // query.invalidateQueries([
        //   QUERY_KEY.organisation_enfants,
        //   organisation.id,
        // ]);
        closeModal();
      }}
      onExit={closeModal}
    />
  );
};

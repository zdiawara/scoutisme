import { FC } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { SelectVille, TextInput } from "components";

import { withForm, WrapperProps } from "hoc";
import { organisationApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { OrganisationResource } from "types/organisation.type";
import { organisationConverter } from "pages/organisations/form";

const FormContainer: FC<WrapperProps> = ({ renderButtonsActions }) => {
  return (
    <>
      <Row className="g-2">
        <Col sx={12} sm={6}>
          <SelectVille name="ville" label="Ville" />
        </Col>
        <Col sx={12} sm={6}>
          <TextInput name="adresse" label="Lieu" />
        </Col>
      </Row>

      {renderButtonsActions()}
    </>
  );
};

const Form = withForm(FormContainer);

type Props = {
  organisation: OrganisationResource;
  onClose: () => void;
};

export const EditOrganisationAdresse: FC<Props> = ({
  organisation,
  onClose,
}) => {
  const clientQuery = useQueryClient();

  const update = async (input: any) => {
    const response = await organisationApi.update(
      organisation.id,
      organisationConverter.toAdresseBody(input)
    );
    clientQuery.invalidateQueries([QUERY_KEY.organisations, organisation.id]);
    return response;
  };

  return (
    <ListGroup.Item>
      <Form
        onSave={update}
        defaultValues={organisationConverter.toInput(organisation)}
        goBack={onClose}
      />
    </ListGroup.Item>
  );
};

import { useQuery } from "@tanstack/react-query";
import { typeOrganisationApi } from "api";
import { TextInput } from "components";
import { FC } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { TypeOrganisationResource } from "types/organisation.type";
import { RequestParam } from "types/request.type";
import { NATURE, QUERY_KEY } from "utils/constants";

type TypeOrganisationMontantFormProps = {
  codeNature: string;
};

export const TypeOrganisationMontantForm: FC<
  TypeOrganisationMontantFormProps
> = ({ codeNature }) => {
  const enabled = [NATURE.national, NATURE.unite].includes(codeNature);

  const { data: results } = useQuery({
    queryKey: [QUERY_KEY.typesUnites, { nature_code: codeNature }],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      return typeOrganisationApi.findAll<TypeOrganisationResource>(params);
    },
    enabled,
  });

  if (!enabled) {
    return <Alert variant="warning">Impossible</Alert>;
  }

  if (!results?.data) {
    return null;
  }

  return (
    <Row className="g-2">
      {results.data.map((item, i) => (
        <Col xs={6} key={item.id}>
          <TextInput
            name={`montants.${i}.value`}
            label={item.membre}
            placeholder="Montant de la Cotisation"
          />
        </Col>
      ))}
    </Row>
  );
};

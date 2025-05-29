import { useQuery } from "@tanstack/react-query";
import { typeOrganisationApi } from "api";
import { TextInput } from "components";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { TypeOrganisationResource } from "types/organisation.type";
import { RequestParam } from "types/request.type";
import { NATURE, QUERY_KEY } from "utils/constants";

type TypeOrganisationFraisCotisationProps = {
  type: string;
};

const PERIMETRES: Record<string, string> = {
  direction_conseil_national: NATURE.national,
  direction_equipe_nationale: NATURE.national,
  scout: NATURE.unite,
};

export const TypeOrganisationFraisCotisation: FC<TypeOrganisationFraisCotisationProps> = ({ type }) => {
  const { data: results } = useQuery({
    queryKey: [QUERY_KEY.fonctions, { nature_code: PERIMETRES[type] || "" }],
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      return typeOrganisationApi
        .findAll<TypeOrganisationResource>(params)
        .then((e) => e.data.filter((e) => e.code !== "scout"));
    },
  });

  if (!results) {
    return null;
  }
  return (
    <Row className="g-2">
      {results.map((item, i) => (
        <Col xs={6} key={item.id}>
          <TextInput name={`montants.${i}.value`} label={item.nom} />
        </Col>
      ))}
    </Row>
  );
};

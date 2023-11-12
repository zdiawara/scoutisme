import { useQuery } from "@tanstack/react-query";
import { fonctionApi } from "api";
import { TextInput } from "components";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { FonctionResource } from "types/personne.type";
import { RequestParam } from "types/request.type";
import { QUERY_KEY } from "utils/constants";

type FonctionMontantFormProps = {
  codeNature: string;
};

export const FonctionMontantForm: FC<FonctionMontantFormProps> = ({
  codeNature,
}) => {
  const { data: results } = useQuery({
    queryKey: [QUERY_KEY.fonctions, { codeNature }],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      return fonctionApi
        .findAll<FonctionResource>(params)
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
          <TextInput
            name={`montants.${i}.value`}
            label={item.nom}
            placeholder="Montant de la Cotisation"
          />
        </Col>
      ))}
    </Row>
  );
};

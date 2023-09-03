import { useQuery } from "@tanstack/react-query";
import { attributionApi } from "api";
import { View } from "components";
import { ICONS } from "pages/common";
import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AttributionResource } from "types/personne.type";
import { LINKS } from "utils";
import { QUERY_KEY } from "utils/constants";
import { dateFormater } from "utils/functions";

type PersonneFonctionsProps = {
  personneId: string;
};
export const PersonneFonctions: FC<PersonneFonctionsProps> = ({
  personneId,
}) => {
  const {
    data: attributions,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.attributions, { personneId }],
    queryFn: ({ queryKey }) => {
      return attributionApi.findAll<AttributionResource>({
        personneId: (queryKey[1] as any).personneId,
        actif: true,
        projection: "organisation.nature;fonction",
      });
    },
  });

  const renderContent = () => {
    if (isLoading) {
      return <span>chargement ...</span>;
    }
    if (error) {
      return <span>error</span>;
    }
    if (!attributions?.data?.length) {
      return <View.Empty label="Pas de fonctions trouvées" />;
    }
    return (
      <table className="table mt-3 mb-0">
        <thead className="text-black">
          <tr>
            <th>Fonction</th>
            <th>Organisation</th>
            <th>Date début</th>
            <th>Date fin</th>
          </tr>
        </thead>

        <tbody>
          {attributions?.data.map((attribution) => (
            <tr key={attribution.id}>
              <td className="text-primary">{attribution.fonction.nom}</td>
              <td className="text-primary text-decoration-underline">
                <Link
                  to={LINKS.organisations.view(attribution.organisation.id)}
                >
                  {attribution.organisation.nom}
                </Link>
              </td>
              <td>{dateFormater.formatStr(attribution.date_debut)}</td>
              <td>{dateFormater.formatStr(attribution.date_fin)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Card>
      <Card.Body>
        <View.Header
          icon={ICONS.fonction}
          label="Fonctions"
          description="Toutes les fonctions occupées par la personne"
          className="mb-2"
        />
        {renderContent()}
      </Card.Body>
    </Card>
  );
};

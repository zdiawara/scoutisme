import { useQuery } from "@tanstack/react-query";
import { attributionApi } from "api";
import { View } from "components";
import { AttributionActions } from "pages/attributions/common";
import { Columns, ICONS, ListResult } from "pages/common";
import { isBefore, isAfter } from "date-fns";
import { FC } from "react";
import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AttributionResource } from "types/personne.type";
import { LINKS } from "utils";
import { QUERY_KEY } from "utils/constants";
import { dateFormater, dateParser } from "utils/functions";

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
    queryKey: [QUERY_KEY.attributions, personneId],
    networkMode: "offlineFirst",
    queryFn: () => {
      return attributionApi.findAll<AttributionResource>({
        personneId,
        projection: "organisation.nature;fonction;personne",
      });
    },
  });

  const columns: Columns<AttributionResource>[] = [
    {
      name: "fonction",
      label: "Fonction",
      Cell: ({ fonction }) => (
        <span className="text-primary">{fonction.nom}</span>
      ),
    },
    {
      name: "organisation",
      label: "Organisation",
      Cell: ({ organisation }) => (
        <Link
          to={LINKS.organisations.view(organisation.id)}
          className="text-decoration-underline text-primary fw-bold"
        >
          {organisation.nom}
        </Link>
      ),
    },
    {
      name: "date_debut",
      label: "Date début",
      Cell: ({ date_debut }) =>
        date_debut ? dateFormater.formatStr(date_debut) : <View.Empty />,
    },
    {
      name: "date_fin",
      label: "Date fin",
      Cell: ({ date_fin }) =>
        date_fin ? dateFormater.formatStr(date_fin) : <View.Empty />,
    },
    {
      name: "etat",
      label: "Etat",
      Cell: ({ date_fin, date_debut }) => {
        const dateDebut = dateParser.toDateTime(date_debut);
        if (!dateDebut) {
          return <Badge>Inactif</Badge>;
        }
        const dateFin = dateParser.toDateTime(date_fin);
        const today = new Date();

        const isActive =
          isAfter(today, dateDebut) &&
          (dateFin ? isBefore(today, dateFin) : true);

        return (
          <Badge bg={isActive ? "success" : "danger"}>
            {isActive ? "Actif" : "Inactif"}
          </Badge>
        );
      },
    },
    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (attribution) => {
        return (
          <div className="text-end">
            <AttributionActions attribution={attribution} />
          </div>
        );
      },
    },
  ];

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
      <ListResult.Table<AttributionResource>
        columns={columns}
        data={attributions?.data || []}
      />
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

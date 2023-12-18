import { useQuery } from "@tanstack/react-query";
import { attributionApi } from "api";
import { View } from "components";
import {
  AffecterPersonneModal,
  AttributionActions,
} from "pages/attributions/common";
import { Columns, ICONS, ListResult } from "pages/common";
import { isBefore, isAfter } from "date-fns";
import { FC, useMemo } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AttributionResource, PersonneResource } from "types/personne.type";
import { LINKS } from "utils";
import { QUERY_KEY } from "utils/constants";
import { dateFormater, dateParser } from "utils/functions";
import { useModalAction } from "hooks";
import { useDroits } from "hooks/useDroits";

type PersonneFonctionsProps = {
  personne: PersonneResource;
};
export const PersonneFonctions: FC<PersonneFonctionsProps> = ({ personne }) => {
  const {
    data: attributions,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.attributions, personne.id],
    networkMode: "offlineFirst",
    queryFn: () => {
      return attributionApi.findAll<AttributionResource>({
        personneId: personne.id,
        projection: "organisation.nature;fonction;personne",
      });
    },
  });

  const droits = useDroits();

  const modalAction = useModalAction();

  const columns = useMemo(() => {
    const data: Columns<AttributionResource>[] = [
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
    ];

    if (droits.personne.fonctions.supprimer) {
      data.push({
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
      });
    }

    return data;
  }, [droits.personne]);

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
    <>
      <Card>
        <Card.Body>
          <View.Header
            icon={ICONS.fonction}
            label="Fonctions"
            description="Toutes les fonctions occupées par la personne"
            className="mb-2"
            right={
              droits.personne.fonctions.affecter && (
                <Button size="sm" onClick={modalAction.change("affecter")}>
                  <i className={`uil-link me-1`}></i>Affecter
                </Button>
              )
            }
          />
          {renderContent()}
        </Card.Body>
      </Card>

      {modalAction.action === "affecter" && (
        <AffecterPersonneModal
          closeModal={modalAction.close}
          personne={personne}
        />
      )}
    </>
  );
};

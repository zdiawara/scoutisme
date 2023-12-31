import { useQuery } from "@tanstack/react-query";
import { attributionApi } from "api";
import { View } from "components";
import {
  AffecterPersonneModal,
  AttributionActions,
} from "pages/attributions/common";
import { Columns, ICONS, StaticTable } from "pages/common";
import { FC, useMemo } from "react";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AttributionResource, PersonneResource } from "types/personne.type";
import { LINKS } from "utils";
import { QUERY_KEY } from "utils/constants";
import { useModalAction } from "hooks";
import { useDroits } from "hooks/useDroits";
import { DateFormater, DateUtils } from "utils/DateUtils";

type PersonneFonctionsProps = {
  personne: PersonneResource;
};
export const PersonneFonctions: FC<PersonneFonctionsProps> = ({ personne }) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.attributions, personne.id],
    networkMode: "offlineFirst",
    queryFn: () => {
      return attributionApi.findAll<AttributionResource>({
        personneId: personne.id,
        projection: "organisation.nature;fonction;personne",
      });
    },
    select: ({ data }) => data,
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
          DateFormater.toDate(date_debut) || <View.Empty />,
      },
      {
        name: "date_fin",
        label: "Date fin",
        Cell: ({ date_fin }) => DateFormater.toDate(date_fin) || <View.Empty />,
      },
      {
        name: "etat",
        label: "Etat",
        Cell: ({ date_fin, date_debut }) => {
          const isActive = DateUtils.isActive(new Date(), date_debut, date_fin);
          return (
            <Badge bg={isActive ? "success" : "danger"}>
              {isActive ? "Actif" : "Inactif"}
            </Badge>
          );
        },
      },
    ];

    if (droits.personne.affecter(personne)) {
      data.push({
        name: "actions",
        label: "Actions",
        headClassName: "text-end",
        Cell: (attribution) => {
          const today = new Date();
          const { date_debut, date_fin } = attribution;
          if (DateUtils.isActive(today, date_debut, date_fin)) {
            return (
              <div className="text-end">
                <AttributionActions attribution={attribution} />
              </div>
            );
          }
          return null;
        },
      });
    }

    return data;
  }, [droits.personne, personne]);

  return (
    <>
      <StaticTable
        header={{
          icon: ICONS.fonction,
          label: "Fonctions",
          description: "Toutes les fonctions occupées par la personne",
        }}
        data={query.data}
        columns={columns}
        isLoading={query.isLoading}
        error={query.error}
        actions={
          droits.personne.affecter(personne) && (
            <Button size="sm" onClick={modalAction.change("affecter")}>
              <i className={`uil-link me-1`}></i>Affecter
            </Button>
          )
        }
      />
      {modalAction.action === "affecter" && (
        <AffecterPersonneModal
          closeModal={modalAction.close}
          personne={personne}
        />
      )}
    </>
  );
};

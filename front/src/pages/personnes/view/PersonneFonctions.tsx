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
import { dateFormater, isActive } from "utils/functions";
import { useModalAction } from "hooks";
import { useDroits } from "hooks/useDroits";

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
          const today = new Date();
          const active = isActive(today, date_debut, date_fin);
          return (
            <Badge bg={active ? "success" : "danger"}>
              {active ? "Actif" : "Inactif"}
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
          const today = new Date();
          const { date_debut, date_fin } = attribution;
          const active = isActive(today, date_debut, date_fin);
          if (active) {
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
  }, [droits.personne]);

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
          droits.personne.fonctions.affecter && (
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

import { useQuery } from "@tanstack/react-query";
import { attributionApi } from "api";
import { View } from "components";
import {
  AffecterPersonneModal,
  AttributionActions,
} from "pages/attributions/common";
import { Columns, ICONS, StaticTable } from "pages/common";
import { FC, useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AttributionResource, PersonneResource } from "types/personne.type";
import { LINKS } from "utils";
import { QUERY_KEY } from "utils/constants";
import { useModalAction } from "hooks";
import { useDroits } from "hooks/useDroits";
import { DateFormater, DateUtils } from "utils/DateUtils";
import * as Icon from "react-bootstrap-icons";

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
      <ListGroup className="mb-3">
        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          <span>
            <Icon.InfoCircle size="1.1rem" className="me-1" />
            <span className="fs-5">Liste des fonctions</span>
          </span>
          <Button
            className="ms-auto d-block"
            size="sm"
            variant="outline-primary"
          >
            <Icon.PlusLg className="me-0" />
          </Button>
        </ListGroup.Item>

        {query.data?.map((item) => {
          const isActive = DateUtils.isActive(
            new Date(),
            item.date_debut,
            item.date_fin
          );
          return (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-start"
            >
              <div>
                <div className="fw-bold">{item.fonction.nom}</div>
                <span className="fw-light d-block">
                  {item.organisation.nature.nom} / {item.organisation.nom}
                </span>
                <Stack direction="horizontal" className="mt-1 fw-light">
                  {DateFormater.toDate(item.date_debut)}&nbsp; - &nbsp;
                  {DateFormater.toDate(item.date_fin) || "Maintenant"}
                  <Badge bg={isActive ? "success" : "danger"} className="ms-1">
                    {isActive ? "Actif" : "Inactif"}
                  </Badge>
                </Stack>
              </div>
              <Button className="ms-auto d-block" size="sm" variant="default">
                <Icon.ThreeDotsVertical />
                {/* modidier */}
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      {/* <StaticTable
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
      )} */}
    </>
  );
};

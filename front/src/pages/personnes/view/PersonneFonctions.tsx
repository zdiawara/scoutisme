import { useQuery } from "@tanstack/react-query";
import { attributionApi } from "api";
import { FC } from "react";
import { Badge, Button, ListGroup, Stack } from "react-bootstrap";
import { AttributionResource, PersonneResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
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

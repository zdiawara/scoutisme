import { View } from "components";
import { Columns, ICONS, ListResult } from "pages/common";
import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { organisationApi } from "api";
import { NATURE, QUERY_KEY } from "utils/constants";
import { useQuery } from "@tanstack/react-query";
import {
  AttributionResource,
  FonctionResource,
  OrganisationAttribution,
  PersonneResource,
} from "types/personne.type";
import { dateFormater } from "utils/functions";
import { AttributionActions } from "pages/attributions/common";
import { AddOrganisationMembreModal } from "pages/attributions/common/AddOrganisationMembreModal";
import { Link } from "react-router-dom";
import { LINKS } from "utils";

type OrganisationMembresProps = {
  organisation: OrganisationResource;
};

export const OrganisationMembres: FC<OrganisationMembresProps> = ({
  organisation,
}) => {
  const {
    data: attributions,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.direction, organisation.id],
    networkMode: "offlineFirst",
    queryFn: () =>
      organisationApi.findDirection(organisation.id, {
        typeId:
          organisation.nature.code === NATURE.national
            ? organisation.type?.id
            : null,
      }),
  });

  const [attributionSelected, setAttributionSelected] = useState<
    OrganisationAttribution | undefined
  >();

  const columns: Columns<OrganisationAttribution>[] = [
    {
      name: "fonction",
      label: "Fonction",
      Cell: ({ fonction }) => (
        <span className="text-primary">{fonction.nom}</span>
      ),
    },
    {
      name: "personne",
      label: "Personne",
      Cell: (attribution) => {
        if (!attribution.personne) {
          return <View.Empty />;
        }
        return (
          <Link to={LINKS.personnes.view(attribution.personne.id)}>
            <span className="text-primary fw-semibold">
              {attribution.personne.prenom} {attribution.personne.nom}
            </span>
          </Link>
        );
      },
    },
    {
      name: "date_debut",
      label: "Date",
      Cell: ({ date_debut, date_fin }) => {
        if (!date_debut) {
          return <View.Empty />;
        }
        const dateDebut = dateFormater.formatStr(date_debut);

        if (date_debut && !date_fin) {
          return `Depuis le ${dateDebut}`;
        }
        return `Du ${dateFormater.formatStr(
          date_debut
        )} au ${dateFormater.formatStr(date_fin)}`;
      },
    },
    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (attribution) => {
        return (
          <div className="text-end d-flex justify-content-end">
            {!attribution.personne ? (
              <Button
                variant="primary"
                onClick={() => {
                  setAttributionSelected(attribution);
                }}
              >
                Ajouter
              </Button>
            ) : (
              <AttributionActions
                attribution={
                  {
                    ...attribution,
                    fonction: attribution.fonction as FonctionResource,
                    organisation,
                    personne: attribution.personne as PersonneResource,
                  } as AttributionResource
                }
              />
            )}
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
    if (!attributions?.length) {
      return <View.Empty label="Pas de membres" />;
    }
    return (
      <ListResult.Table<OrganisationAttribution>
        columns={columns}
        data={attributions || []}
      />
    );

    /*     console.log(attributions);

    return (
      <>
        <Row className="g-2 mt-1">
          {(attributions || []).map((attribution) => (
            <Col sm={12} key={attribution.id}>
              <Card>
                <Card.Header>
                 
                  <p className="m-0 fw-normal text-primary">
                    {attribution.fonction.nom}
                  </p>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    {attribution.personne ? (
                      <PersonneAvatar
                        nom={attribution.personne?.nom || ""}
                        prenom={attribution.personne?.prenom || ""}
                        id="test"
                      />
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          setAttributionSelected(attribution);
                        }}
                      >
                        Ajouter
                      </Button>
                    )}
                    <div className="ms-auto">
                      <AttributionActions
                        attribution={
                          {
                            ...attribution,
                            fonction: attribution.fonction as FonctionResource,
                            organisation,
                            personne: attribution.personne as PersonneResource,
                          } as AttributionResource
                        }
                      />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    ); */
  };

  return (
    <Card>
      <Card.Body>
        <View.Header
          icon={ICONS.direction}
          label="Organe de direction"
          description="Membres de l'organe de direction"
          className="mb-2"
        />
        {renderContent()}
        {attributionSelected && (
          <AddOrganisationMembreModal
            fonction={attributionSelected.fonction as FonctionResource}
            organisation={organisation}
            closeModal={() => setAttributionSelected(undefined)}
          />
        )}
      </Card.Body>
    </Card>
  );
};

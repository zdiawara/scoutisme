import { PersonneAvatar, View } from "components";
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
      Cell: ({ fonction }) => fonction.nom,
    },
    {
      name: "personne",
      label: "Personne",
      Cell: (attribution) => {
        if (!attribution.personne) {
          return (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setAttributionSelected(attribution);
              }}
            >
              Choisir une personne
            </Button>
          );
        }
        return <PersonneAvatar {...attribution.personne} />;
      },
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
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (attribution) => {
        return (
          <div className="text-end">
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

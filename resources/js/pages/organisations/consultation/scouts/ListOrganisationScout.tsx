import { FC, useMemo, useState } from "react";
import { OrganisationResource } from "types/organisation.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { attributionApi } from "api";
import { Alert, Form, ListGroup } from "react-bootstrap";

import { View } from "components";
import { AttributionResource } from "types/personne.type";
import { ScoutItem } from "./scout/ScoutItem";
import { ListOrganisationScoutActions } from "./ListOrganisationScoutActions";
import { LoaderSpinner } from "components/loader";

type Props = {
  organisation: OrganisationResource;
};

const searchByCriteres = (term: string, attributions: AttributionResource[]) => {
  return attributions.filter(({ personne: { nom, prenom, code } }) =>
    `${nom} ${prenom} ${code}`.match(new RegExp(term, "gi"))
  );
};

const fetchScouts = async ({ queryKey }: any) => {
  const params = {
    organisationId: queryKey[1],
    fonctionCode: "scout",
  };

  const response = await attributionApi.findAll<AttributionResource>(params);

  return response.data;
};

export const ListOrganisationScout: FC<Props> = ({ organisation }) => {
  const [searchText, setSearchText] = useState<string | undefined>();

  const query = useQuery({
    queryKey: [QUERY_KEY.scouts, organisation.id],
    queryFn: fetchScouts,
  });

  const { data } = query;

  const scouts = useMemo(() => {
    if (searchText) {
      return searchByCriteres(searchText, data || []);
    }
    return data;
  }, [data, searchText]);

  const renderContent = () => {
    if (query.isLoading) {
      return (
        <ListGroup.Item className="text-center">
          <LoaderSpinner />
        </ListGroup.Item>
      );
    }
    if (scouts?.length) {
      return (
        <>
          {scouts?.map(({ personne }) => (
            <ListGroup.Item className="d-flex justify-content-between align-items-start" key={organisation.id}>
              <ScoutItem personne={personne} />
            </ListGroup.Item>
          ))}
        </>
      );
    }
    return (
      <ListGroup.Item className="text-muted text-center">
        {searchText ? "aucun résultat" : "Aucun scout à afficher"}
      </ListGroup.Item>
    );
  };

  const nombreScout = data?.length;
  const hasScoutLimite = nombreScout && nombreScout >= 32;
  return (
    <>
      <ListGroup className="mb-3">
        <View.Toolbar right={!hasScoutLimite && <ListOrganisationScoutActions organisation={organisation} />}>
          <div className="w-100">
            {Boolean(hasScoutLimite) && (
              <div>
                <Alert variant="warning">
                  Le nombre limite de scout dans une unité est atteint (32 scouts par unité).
                </Alert>
              </div>
            )}
            <Form.Control
              placeholder="Rechercher ..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
        </View.Toolbar>
        {renderContent()}
      </ListGroup>
    </>
  );
};

import { FC, useMemo, useState } from "react";
import { OrganisationResource } from "types/organisation.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { attributionApi } from "api";
import { Form, ListGroup, Spinner } from "react-bootstrap";

import { View } from "components";
import { AttributionResource } from "types/personne.type";
import { ScoutItem } from "./scout/ScoutItem";
import { ListOrganisationScoutActions } from "./ListOrganisationScoutActions";

type Props = {
  organisation: OrganisationResource;
};

const searchByCriteres = (
  term: string,
  attributions: AttributionResource[]
) => {
  return attributions.filter(({ personne: { nom, prenom, code } }) =>
    `${nom} ${prenom} ${code}`.match(new RegExp(term, "gi"))
  );
};

export const ListOrganisationScout: FC<Props> = ({ organisation }) => {
  const [searchText, setSearchText] = useState<string | undefined>();

  const query = useQuery({
    queryKey: [QUERY_KEY.scouts, organisation.id],
    queryFn: async () => {
      const params = {
        organisationId: organisation.id,
        fonctionCode: "scout",
      };
      const response = await attributionApi.findAll<AttributionResource>(
        params
      );
      return response.data;
    },
  });

  const { data } = query;

  const scouts = useMemo(() => {
    if (searchText) {
      return searchByCriteres(searchText, data || []);
    }
    return data;
  }, [data, searchText]);

  return (
    <>
      <ListGroup className="mb-3 shadow-sm">
        <View.Toolbar
          right={<ListOrganisationScoutActions organisation={organisation} />}
        >
          <div className="w-100">
            <Form.Control
              placeholder="Rechercher ..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              size="sm"
            />
          </div>
        </View.Toolbar>
        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </ListGroup.Item>
        ) : scouts?.length ? (
          scouts?.map(({ personne }) => (
            <ListGroup.Item
              className="d-flex justify-content-between align-items-start"
              key={organisation.id}
            >
              <ScoutItem personne={personne} />
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-muted text-center">
            {searchText ? "aucun résultat" : "Aucun scout à afficher"}
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
};

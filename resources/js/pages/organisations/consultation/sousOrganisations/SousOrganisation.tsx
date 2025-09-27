import { FC, useMemo, useState } from "react";
import { OrganisationResource } from "types/organisation.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { organisationApi } from "api";
import { Form, ListGroup, Stack, Spinner } from "react-bootstrap";
import { OrganisationItem } from "./organisation";
import { View } from "components";
import { SousOrganisationActions } from "./SousOrganisationActions";

type SousOrganisationProps = {
  organisation: OrganisationResource;
};

const searchByCriteres = (term: string, attributions: OrganisationResource[]) => {
  return attributions.filter(({ code, nom, type }) => {
    return [code, nom, type?.nom].filter(Boolean).join(" ").match(new RegExp(term, "gi"));
  });
};

export const SousOrganisation: FC<SousOrganisationProps> = ({ organisation }) => {
  const [searchText, setSearchText] = useState<string | undefined>();

  const query = useQuery({
    queryKey: [QUERY_KEY.organisation_enfants, organisation.id],
    queryFn: async () => {
      const r = await organisationApi.findAll<OrganisationResource>({
        parentId: organisation.id,
      });
      return r.data;
    },
  });

  const { data } = query;

  const organisations = useMemo(() => {
    if (searchText) {
      return searchByCriteres(searchText, data || []);
    }
    return data;
  }, [data, searchText]);

  return (
    <>
      <ListGroup className="mb-3">
        <View.Toolbar right={<SousOrganisationActions organisation={organisation} />}>
          <Form.Control
            placeholder="Rechercher ..."
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            // size="sm"
          />
        </View.Toolbar>
        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </ListGroup.Item>
        ) : organisations?.length ? (
          organisations?.map((organisation) => (
            <ListGroup.Item className="d-flex justify-content-between align-items-start" key={organisation.id}>
              <OrganisationItem organisation={organisation} />
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-muted text-center">
            {searchText ? "aucun résultat" : "Aucune sous organisation à afficher"}
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
};

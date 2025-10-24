import { FC, useMemo, useState } from "react";
import { OrganisationResource } from "types/organisation.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { attributionApi } from "api";
import { Button, Form, ListGroup } from "react-bootstrap";

import { View } from "components";
import { AttributionResource } from "types/personne.type";

import { LoaderSpinner } from "components/loader";
import { Link } from "react-router-dom";
import { LINKS } from "utils/links";

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
    actif: "true",
  };

  const response = await attributionApi.findAll<AttributionResource>(params);

  return response.data;
};

export const ListSoutienAdulte: FC<Props> = ({ organisation }) => {
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
            <ListGroup.Item className="d-flex justify-content-between align-items-start" key={personne.id}>
              <div className="me-auto">
                <Link className="fw-semibold mb-1 text-black" to={LINKS.personnes.view(personne.id)}>
                  {personne.prenom} {personne.nom}
                </Link>
                <div className="fw-light">{personne.code}</div>
              </div>
            </ListGroup.Item>
          ))}
        </>
      );
    }
    return (
      <ListGroup.Item className="text-muted text-center">
        {searchText ? "aucun résultat" : "Aucun adulte à afficher"}
      </ListGroup.Item>
    );
  };

  return (
    <>
      <ListGroup className="mb-3">
        <View.Toolbar
          right={
            <Button className="ms-1" variant="secondary">
              Ajouter
            </Button>
          }
        >
          <div className="w-100">
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

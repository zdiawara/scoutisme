import { FC, useMemo, useState } from "react";
import { OrganisationResource } from "types/organisation.type";
import { useQuery } from "@tanstack/react-query";
import { attributionApi } from "api";
import { Button, Form, ListGroup } from "react-bootstrap";

import { View } from "components";
import { AttributionResource } from "types/personne.type";

import { LoaderSpinner } from "components/loader";
import { Link } from "react-router-dom";
import { LINKS } from "utils/links";
import useToggle from "hooks/useToggle";
import { QUERY_KEY } from "utils/constants";
import { CreerSoutienAuxAdultesModal } from "pages/personnes/creer";

type Props = {
  organisation: OrganisationResource;
};

const searchByCriteres = (term: string, attributions: AttributionResource[]) => {
  return attributions.filter(({ personne: { nom, prenom, code } }) =>
    `${nom} ${prenom} ${code}`.match(new RegExp(term, "gi"))
  );
};

const fetchSoutienAuxAdultes = async ({ queryKey }: { queryKey: Array<string> }) => {
  const params = {
    organisationId: queryKey[1],
    fonctionCategorie: "soutien",
    actif: "true",
  };

  const response = await attributionApi.findAll<AttributionResource>(params);

  return response.data;
};

export const ListSoutienAuxAdultes: FC<Props> = ({ organisation }) => {
  const [searchText, setSearchText] = useState<string | undefined>();
  const [isOpen, toggle] = useToggle();

  const query = useQuery({
    queryKey: [QUERY_KEY.soutien_aux_adultes, organisation.id],
    queryFn: fetchSoutienAuxAdultes,
  });

  const { data } = query;

  const adultes = useMemo(() => {
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
    if (adultes?.length) {
      return (
        <>
          {adultes?.map(({ personne }) => (
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
    <ListGroup className="mb-3">
      <View.Toolbar
        right={
          <Button className="ms-1" variant="secondary" onClick={toggle}>
            Ajouter
          </Button>
        }
      >
        <Form.Control
          placeholder="Rechercher ..."
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="w-100"
        />
      </View.Toolbar>
      {renderContent()}
      {isOpen && <CreerSoutienAuxAdultesModal organisationId={organisation.id} closeModal={toggle} />}
    </ListGroup>
  );
};

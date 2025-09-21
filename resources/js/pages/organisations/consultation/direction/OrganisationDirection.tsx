import { FC, useMemo, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { NATURE, QUERY_KEY } from "utils/constants";
import { useQuery } from "@tanstack/react-query";
import { organisationApi } from "api";
import { OrganisationMembre } from "./membre/OrganisationMembre";
import { View } from "components";
import { OrganisationAttribution } from "types/personne.type";

type Props = {
  organisation: OrganisationResource;
};

const searchByCriteres = (term: string, attributions: OrganisationAttribution[]) => {
  return attributions.filter(({ personne, fonction }) => {
    return [personne?.nom, personne?.prenom, personne?.code, fonction.nom]
      .filter(Boolean)
      .join(" ")
      .match(new RegExp(term, "gi"));
  });
};

export const OrganisationDirection: FC<Props> = ({ organisation }) => {
  const [searchText, setSearchText] = useState<string | undefined>();

  const typeId = organisation.nature.code === NATURE.national ? organisation.type?.id : null;

  const { data: direction } = useQuery({
    queryKey: [QUERY_KEY.direction, organisation.id],
    queryFn: () => organisationApi.findDirection(organisation.id, { typeId }),
  });

  const data = useMemo(() => {
    if (searchText) {
      return searchByCriteres(searchText, direction || []);
    }
    return direction;
  }, [direction, searchText]);

  return (
    <>
      <ListGroup className="mb-3">
        <View.Toolbar>
          <Form.Control
            placeholder="Rechercher ..."
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </View.Toolbar>
        {data?.map((item) => (
          <ListGroup.Item className="d-flex justify-content-between align-items-start" key={item.fonction.id}>
            <OrganisationMembre attribution={item} organisation={organisation} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

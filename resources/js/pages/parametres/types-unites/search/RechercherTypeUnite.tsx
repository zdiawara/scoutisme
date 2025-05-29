import { useQuery } from "@tanstack/react-query";
import { typeOrganisationApi } from "api";
import { FC, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { NATURE, QUERY_KEY } from "utils/constants";
import { TypeOrganisationResource } from "types/organisation.type";
import { Header } from "layout/Header";
import * as Icon from "react-bootstrap-icons";
import { LoaderSpinner } from "components/loader";
import { ListTypeUnite } from "./list/ListTypeUnite";
import { EditTypeUnite } from "../edit/EditTypeUnite";

type Action = {
  code: "create" | "edit";
  selected?: TypeOrganisationResource;
};

const searchTypeUnite = () =>
  typeOrganisationApi.findAll<TypeOrganisationResource>({
    nature_code: NATURE.unite,
  });

const RechercherTypeUnite: FC = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.typesUnites],
    queryFn: searchTypeUnite,
  });

  const [action, setAction] = useState<Action | undefined>();

  const edit = (selected: TypeOrganisationResource) => {
    setAction({
      code: "edit",
      selected,
    });
  };

  return (
    <>
      <Header
        title="Types unités"
        right={
          <Button variant="secondary" onClick={() => setAction({ code: "create" })}>
            <Icon.PlusLg /> <span className="d-none d-sm-inline-block">Ajouter un type</span>
          </Button>
        }
      />

      <ListGroup className="mt-4">
        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <LoaderSpinner />
          </ListGroup.Item>
        ) : (
          <ListTypeUnite edit={edit} types={query.data?.data} />
        )}
      </ListGroup>

      {action && <EditTypeUnite closeModal={() => setAction(undefined)} selected={action.selected} />}
    </>
  );
};

export default RechercherTypeUnite;

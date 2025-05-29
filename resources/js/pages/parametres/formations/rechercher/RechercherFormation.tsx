import { useQuery } from "@tanstack/react-query";
import { refFormationApi } from "api";
import { FC, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { QUERY_KEY } from "utils/constants";
import { RefFormationResource } from "types/organisation.type";
import { Header } from "layout/Header";
import { ListFormation } from "./list/ListFormation";
import * as Icon from "react-bootstrap-icons";
import { RefFormationModal } from "../creer/RefFormationModal";
import { LoaderSpinner } from "components/loader";

type Action = {
  code: "create" | "edit";
  selected?: RefFormationResource;
};

const searchFormations = () => refFormationApi.findAll<RefFormationResource>();

const ListRefFormation: FC = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.refFormations],
    keepPreviousData: true,
    queryFn: searchFormations,
  });

  const [action, setAction] = useState<Action | undefined>();

  const editFormation = (selected: RefFormationResource) => {
    setAction({
      code: "edit",
      selected,
    });
  };

  const formations = query.data?.data;

  return (
    <>
      <Header
        title="Formations"
        right={
          <Button variant="secondary" onClick={() => setAction({ code: "create" })}>
            <Icon.PlusLg /> <span className="d-none d-sm-inline-block">Ajouter formation</span>
          </Button>
        }
      />

      <ListGroup className="mt-4">
        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <LoaderSpinner />
          </ListGroup.Item>
        ) : (
          <ListFormation editFormation={editFormation} formations={formations} />
        )}
      </ListGroup>

      {action && <RefFormationModal closeModal={() => setAction(undefined)} refFormation={action.selected} />}
    </>
  );
};

export default ListRefFormation;

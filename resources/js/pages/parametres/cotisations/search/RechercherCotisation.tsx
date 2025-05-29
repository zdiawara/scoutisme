import { useQuery } from "@tanstack/react-query";
import { montantCotisationApi } from "api";
import { FC, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Header } from "layout/Header";
import { LoaderSpinner } from "components/loader";
import { ListFraisCotisation } from "./list/ListFraisCotisation";
import { MontantCotisationResource } from "types/cotisation.type";
import { EditFraisCotisationForm } from "../edit/EditFraisCotisationForm";
import { QUERY_KEY } from "utils/constants";

type Action = {
  code: "create" | "edit";
  selected?: MontantCotisationResource;
};

const searchFraisCotisations = () => montantCotisationApi.findAll<MontantCotisationResource>();

const RechercherCotisation: FC = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.fraisCotisations],
    queryFn: searchFraisCotisations,
  });

  const [action, setAction] = useState<Action | undefined>();

  const edit = (selected: MontantCotisationResource) => {
    setAction({
      code: "edit",
      selected,
    });
  };

  return (
    <>
      <Header title="Frais de cotisations" />

      <ListGroup className="mt-4">
        {query.isLoading ? (
          <ListGroup.Item className="text-center">
            <LoaderSpinner />
          </ListGroup.Item>
        ) : (
          <ListFraisCotisation edit={edit} fraisCotisations={query.data?.data} />
        )}
      </ListGroup>

      {action?.selected && (
        <EditFraisCotisationForm selected={action.selected} closeModal={() => setAction(undefined)} />
      )}
    </>
  );
};

export default RechercherCotisation;

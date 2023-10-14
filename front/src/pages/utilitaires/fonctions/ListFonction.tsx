import { useQuery } from "@tanstack/react-query";
import { fonctionApi } from "api";
import {
  Columns,
  ICONS,
  ListResult,
  PageFilter,
  PageHeader,
} from "pages/common";
import { FC, useContext, useState } from "react";
import { Badge, Button, Col } from "react-bootstrap";
import { FonctionResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { FonctionModal } from "./FonctionModal";
import { buildNatureColor, selectHelper } from "utils/functions";
import { SelectNatureSimple, View } from "components";
import { FilterContext } from "context";
import { FonctionFilter, RequestParam } from "types/request.type";

const ListFonction: FC = () => {
  const { filter, setFilter } = useContext(FilterContext);
  const { nature } = filter as FonctionFilter;
  const { data: personnes } = useQuery({
    queryKey: [QUERY_KEY.fonctions, filter],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      params.nature = selectHelper.getValue(params.nature);
      return fonctionApi.findAll<FonctionResource>(params);
    },
  });

  const [action, setAction] = useState<
    | {
        code: "create" | "edit";
        fonction?: FonctionResource;
      }
    | undefined
  >();

  const columns: Columns<FonctionResource>[] = [
    {
      name: "code",
      label: "Code",
    },
    {
      name: "nom",
      label: "Nom",
      Cell: ({ nom }) => {
        return <span className="text-primary fw-semibold">{nom}</span>;
      },
    },
    {
      name: "etat",
      label: "Nature organisation",
      Cell: ({ nature }) => {
        return (
          <Badge className={`bg-${buildNatureColor(nature.code)}`}>
            {nature.nom}
          </Badge>
        );
      },
    },
    {
      name: "duree_mandat",
      label: "Durée mandat",
      Cell: ({ duree_mandat }) => {
        return duree_mandat ? <span>{duree_mandat} ans</span> : <View.Empty />;
      },
    },
    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (fonction) => {
        return (
          <div className="text-end">
            <Button
              className="action-icon me-1"
              variant="link"
              onClick={() => setAction({ code: "edit", fonction })}
            >
              <i className="uil-edit-alt fs-4 text-primary"></i>
            </Button>
            <Button variant="link" className="action-icon">
              <i className="mdi mdi-delete fs-4 text-danger"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader.List
        title="Fonctions"
        subtitle="Consulter et gérer le référentiel des fonctions"
        icon={ICONS.fonction}
        className="my-4"
        right={
          <Button onClick={() => setAction({ code: "create" })}>
            Ajouter une fonction
          </Button>
        }
      />

      <PageFilter.Container>
        <Col sm={6}>
          <SelectNatureSimple
            placeholder="Nature de l'organisation"
            name="nature"
            isClearable
            onChange={(nature) => {
              setFilter((prev) => ({ ...prev, nature }));
            }}
            value={nature}
          />
        </Col>
      </PageFilter.Container>

      <ListResult.Container isLoading={false}>
        <ListResult.Table<FonctionResource>
          columns={columns}
          data={personnes?.data || []}
        />
        {/*         {personnes && (
          <ListResult.Paginate
            pageCount={2}
            pageActive={1}
            onPageChange={(page) => {}}
          />
        )} */}
      </ListResult.Container>
      {action && (
        <FonctionModal
          closeModal={() => setAction(undefined)}
          fonction={action.fonction}
          nature={nature}
        />
      )}
    </>
  );
};

export default ListFonction;

import { useQuery } from "@tanstack/react-query";
import { fonctionApi } from "api";
import {
  Columns,
  DeleteConfirmationActions,
  ICONS,
  ListResult,
  PageFilter,
  PageHeader,
} from "pages/common";
import { FC, useContext } from "react";
import { Badge, Button, Col } from "react-bootstrap";
import { FonctionResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { FonctionModal } from "./FonctionModal";
import { selectHelper } from "utils/functions";
import { SelectNatureSimple, View } from "components";
import { FilterContext } from "context";
import { FonctionFilter, RequestParam } from "types/request.type";
import { useCrudModal } from "hooks/useCrudModal";
import { DeleteFonctionModal } from "./DeleteFonctionModal";

const ListFonction: FC = () => {
  const filterContext = useContext(FilterContext);
  const { setFilter } = filterContext;
  const filter = filterContext.filter as FonctionFilter;

  const { data: result } = useQuery({
    queryKey: [QUERY_KEY.fonctions, filter],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      params.nature = selectHelper.getValue(params.nature);
      return fonctionApi.findAll<FonctionResource>(params);
    },
  });

  const crudModal = useCrudModal<FonctionResource>();

  const columns: Columns<FonctionResource>[] = [
    {
      name: "nom",
      label: "Nom",
      Cell: ({ nom, responsable }) => {
        return (
          <>
            <div className="text-primary fw-semibold">{nom}</div>
            {responsable.toString() === "1" ? (
              <span>Responsable d'organisation</span>
            ) : null}
          </>
        );
      },
    },

    {
      name: "etat",
      label: "Nature organisation",
      Cell: ({ nature, type }) => {
        return (
          <>
            <Badge className={`bg-primary`}>
              {type ? type.nom : nature.nom}
            </Badge>
          </>
        );
      },
    },
    {
      name: "duree_mandat",
      label: "Durée mandat",
      Cell: ({ duree_mandat }) => {
        return duree_mandat ? (
          <span>{duree_mandat} an(s)</span>
        ) : (
          <View.Empty />
        );
      },
    },
    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (element) =>
        element.code !== "scout" && (
          <DeleteConfirmationActions
            element={element}
            onDelete={crudModal.onDelete}
            onUpdate={crudModal.onUpdate}
          />
        ),
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
          <Button onClick={crudModal.onCreate()}>Ajouter une fonction</Button>
        }
      />

      <PageFilter.Container>
        <Col sm={5}>
          <PageFilter.Search
            onChange={(search) => {
              setFilter((prev) => ({ ...prev, search, page: 1 }));
            }}
            initialValue={filter.search}
          />
        </Col>

        <Col className="ms-auto" sm={3}>
          <SelectNatureSimple
            placeholder="Nature de l'organisation"
            name="nature"
            isClearable
            onChange={(nature) => {
              setFilter((prev) => ({ ...prev, nature, page: 1 }));
            }}
            value={filter.nature}
          />
        </Col>
      </PageFilter.Container>

      <ListResult.Container isLoading={false}>
        <ListResult.Table<FonctionResource>
          columns={columns}
          data={result?.data || []}
          headerClassName="bg-light"
        />
        {result?.data && (
          <ListResult.Paginate
            pageCount={result.meta.total_page}
            pageActive={result.meta.page - 1}
            total={result.meta.total}
            onPageChange={(page) => {
              setFilter((old) => ({ ...old, page: page + 1 }));
            }}
          />
        )}
      </ListResult.Container>

      {crudModal.isCreateOrUpdate && (
        <FonctionModal
          closeModal={crudModal.reset}
          fonction={crudModal.action?.element!}
          nature={filter.nature}
        />
      )}

      {crudModal.isDelete && (
        <DeleteFonctionModal
          element={crudModal.action?.element!}
          closeModal={crudModal.reset}
        />
      )}
    </>
  );
};

export default ListFonction;

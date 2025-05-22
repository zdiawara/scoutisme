import { View } from "components";
import { Badge, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { FC } from "react";
import useToggle from "hooks/useToggle";
import * as Icon from "react-bootstrap-icons";
import { useSearch } from "hooks/useSearch";
import { Trier } from "pages/common/trie";
import { FilterPaiement } from "pages/paiements/form";

type ToolbarProps = {
  searchParams?: Record<string, any>;
  isFetching: boolean;
  nombreResultat?: number;
};

const ACTIONS = [
  {
    label: "Date soumission croissante",
    code: "date_soumission,asc",
  },
  {
    label: "Date soumission décroissante",
    code: "date_soumission,desc",
  },
];

export const PaiementToolbar: FC<ToolbarProps> = ({
  searchParams,
  isFetching,
  nombreResultat,
}) => {
  const [showFilter, toggleFilter] = useToggle();

  const { onSearch, onChangeFilter } = useSearch();

  return (
    <>
      <View.Toolbar>
        <div className="w-100">
          <InputGroup>
            <Form.Control
              defaultValue={searchParams?.search || ""}
              placeholder="Rechercher ..."
              onChange={onSearch}
            />
            <Trier actions={ACTIONS} />
            <Button variant="secondary" onClick={toggleFilter}>
              <Icon.Filter size="1.3rem" />
              <span className="ms-1 d-none d-sm-inline">Filrer</span>
            </Button>
          </InputGroup>

          <div className="mt-1">
            {Object.entries(searchParams || {}).map(([key, value]) => (
              <Badge key={key} className="me-1" bg="secondary">
                {value?.label}
              </Badge>
            ))}
          </div>
          <div className="fw-light mt-1">
            {Boolean(nombreResultat) && (
              <span className="me-1">{nombreResultat} résultat(s)</span>
            )}
            {isFetching && (
              <Spinner
                className="me-1"
                size="sm"
                animation="grow"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
        </div>
      </View.Toolbar>
      {showFilter && (
        <FilterPaiement
          applyFiler={(data) => {
            onChangeFilter(data);
            toggleFilter();
          }}
          defaultValues={searchParams}
          show={showFilter}
          close={toggleFilter}
        />
      )}
    </>
  );
};

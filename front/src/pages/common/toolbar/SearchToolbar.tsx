import { View } from "components";
import { Badge, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { FC } from "react";
import * as Icon from "react-bootstrap-icons";
import { useSearch } from "hooks/useSearch";
import { Trie, Trier } from "pages/common/trie";

type ToolbarProps = {
  searchParams?: Record<string, any>;
  isFetching: boolean;
  nombreResultat?: number;
  toggleFilter?: () => void;
  tries?: Trie[];
};

export const SearchToolbar: FC<ToolbarProps> = ({
  searchParams,
  isFetching,
  nombreResultat,
  toggleFilter,
  tries,
}) => {
  const { onSearch } = useSearch();

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
            {tries && <Trier actions={tries} />}
            {toggleFilter && (
              <Button variant="secondary" onClick={toggleFilter}>
                <Icon.Filter size="1.3rem" />
                <span className="ms-1 d-none d-sm-inline">Filrer</span>
              </Button>
            )}
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
    </>
  );
};

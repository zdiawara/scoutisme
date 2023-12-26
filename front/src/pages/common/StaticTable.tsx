import { View } from "components";
import { Columns, ListResult } from "pages/common";
import { ReactNode, useMemo, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

type StaticTableProps<T> = {
  data: T[] | undefined;
  isLoading: boolean;
  error?: any;
  columns: Columns<T>[];
  actions?: ReactNode;
  header: { label: string; description?: string; icon?: string };
  onSearch?: (search: string, data: T[]) => T[];
};

export function StaticTable<T>({
  data,
  columns,
  isLoading,
  error,
  actions,
  header,
  onSearch,
}: StaticTableProps<T>) {
  const [search, setSearch] = useState<string | undefined>();
  const [query, setQuery] = useState<any>({
    pageSize: 10,
    pageActive: 0,
    search,
  });

  const result = useMemo(() => {
    let _data = [];
    if (onSearch && query.search) {
      _data = onSearch(query.search, data || []);
    } else {
      _data = data || [];
    }

    return {
      data: _data?.slice(
        query.pageActive * query.pageSize,
        (query.pageActive + 1) * query.pageSize
      ),
      total: _data.length,
      pageCount: Math.ceil(_data.length / query.pageSize),
    };
  }, [data, query, onSearch]);

  const renderContent = () => {
    if (isLoading) {
      return <span>chargement ...</span>;
    }
    if (error) {
      return <span>error</span>;
    }
    if (!result.data.length || !data) {
      return <View.Empty label="Aucun résultat" />;
    }

    return (
      <>
        <ListResult.Table<T>
          headerClassName="shadow-sm"
          columns={columns}
          data={result.data || []}
        />

        <ListResult.Paginate
          pageCount={result.pageCount}
          pageActive={query.pageActive}
          pageSize={query.pageSize}
          total={result.total}
          onPageChange={(pageActive) => {
            setQuery((prev: any) => ({ ...prev, pageActive }));
          }}
          onSizeChange={(pageSize) => {
            setQuery((prev: any) => ({ ...prev, pageSize }));
          }}
        />
      </>
    );
  };

  const right = (
    <div className="d-flex align-items-center">
      {onSearch && (
        <InputGroup>
          <Form.Control
            placeholder="Rechercher"
            aria-label="Text input with checkbox"
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                setQuery((prev: any) => ({ ...prev, search, pageActive: 0 }));
              }
            }}
          />
          <Button
            onClick={() =>
              setQuery((prev: any) => ({ ...prev, search, pageActive: 0 }))
            }
          >
            OK
          </Button>
        </InputGroup>
      )}
      {actions}
    </div>
  );

  return (
    <Card body>
      <View.Header {...header} className="mb-2" right={right} />
      {renderContent()}
    </Card>
  );
}

import { View } from "components";
import { Columns, ListResult } from "pages/common";
import { ReactNode, useMemo, useState } from "react";
import { Card, Stack } from "react-bootstrap";

type StaticTableProps<T> = {
  data: T[] | undefined;
  isLoading: boolean;
  error?: any;
  columns: Columns<T>[];
  actions?: ReactNode;
  header?: { label: string; description?: string; icon?: string };
  search?: {
    onSearch: (search: string, data: T[]) => T[];
    placeholder: string;
  };
  renderCount?: (total: number) => ReactNode;
};

export function StaticTable<T>({
  data,
  columns,
  isLoading,
  error,
  actions,
  header,
  search,
  renderCount,
}: StaticTableProps<T>) {
  // const [searchText, setSearchText] = useState<string | undefined>();
  const [query, setQuery] = useState<any>({
    pageSize: 5,
    pageActive: 0,
    search,
  });

  const result = useMemo(() => {
    let _data = [];
    if (search?.onSearch && query.search) {
      _data = search.onSearch(query.search, data || []);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, query, search?.onSearch]);

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
          // headerClassName="shadow-sm"
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

  return (
    <Card>
      <View.Header label={header?.label!} right={actions} />
      <Card.Body>
        <Stack direction="horizontal" className="align-items-center mb-3">
          {renderCount && renderCount(result.data.length)}
          {/* <div style={{ width: "300px" }} className="ms-auto">
            {searchInput}
          </div> */}
        </Stack>
        {renderContent()}
      </Card.Body>
    </Card>
  );
}

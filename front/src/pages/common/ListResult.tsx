import { FC, ReactNode } from "react";
import { Card, Table as BsTable, Stack, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Select from "react-select";

const Container: FC<{ children: ReactNode; isLoading: boolean }> = ({
  children,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card>
        <Card.Body className="text-center">
          <Spinner
            as="span"
            animation="border"
            className="avatar-sm"
            variant="secondary"
          />
          <div>Chargement des données</div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export type Columns<T> = {
  name: string;
  label: string;
  Cell?: (row: T, j: number) => ReactNode;
};

type TableProps<T> = {
  columns: Columns<T>[];
  data: Array<T>;
};

function Table<T>({ columns, data }: TableProps<T>) {
  return (
    <>
      <BsTable hover className="table-centered">
        <thead className="text-black ">
          <tr>
            {columns.map((col) => (
              <th key={col.name}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((item, i) => (
              <tr key={i}>
                {columns.map((column, j) => {
                  const { Cell, name } = column;
                  const d = item as Record<string, any>;
                  return <td key={name}>{Cell ? Cell(item, i) : d[name]}</td>;
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                Aucune donnée à afficher
              </td>
            </tr>
          )}
        </tbody>
      </BsTable>
    </>
  );
}

type PaginateProps = {
  pageCount: number;
  pageActive: number;
  onPageChange: (page: number) => void;
};

const Paginate: FC<PaginateProps> = ({
  pageCount,
  pageActive,
  onPageChange,
}) => {
  return (
    <Stack direction="horizontal" className="aligns-items-center ">
      <div style={{ width: "80px" }}>
        <Select
          className="react-select"
          classNamePrefix="react-select"
          placeholder="10"
          options={[
            { value: "5", label: "5" },
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "50", label: "50" },
          ]}
        />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<i className="uil-angle-right"></i>}
        onPageChange={({ selected }) => onPageChange(selected)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        forcePage={pageActive}
        previousLabel={<i className="uil-angle-left"></i>}
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        previousClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination pagination-rounded m-0 ms-auto"
        activeClassName="active"
      />
    </Stack>
  );
};

export const ListResult = {
  Table,
  Container,
  Paginate,
};

import { FC, ReactNode } from "react";
import { Card, Table as BsTable, Stack } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Select from "react-select";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Card>
        <Card.Body>{children}</Card.Body>
      </Card>
    </>
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
      <BsTable hover className="table-centered text-black">
        <thead className="text-black bg-light">
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

const Paginate = () => {
  return (
    <Stack direction="horizontal" className="aligns-items-center">
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
        onPageChange={() => {}}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={10}
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

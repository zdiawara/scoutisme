import classNames from "classnames";
import { FC, ReactNode } from "react";
import { Table } from "react-bootstrap";
import "./DashBoardTable.scss";

type CellProps = {
  value?: number | string;
};

export const DashBoardTableCell: FC<CellProps> = ({ value }) => {
  return (
    <td
      className={classNames("text-center", {
        "text-muted": value === 0,
      })}
    >
      {value}
    </td>
  );
};

export const DashBoardTableFirstCell: FC<CellProps> = ({ value }) => {
  return <td className="text-dark text-center fw-bold">{value}</td>;
};

export const DashBoardTable: FC<{ children: ReactNode; bordered?: boolean }> = ({ children, bordered }) => {
  return (
    <Table responsive striped bordered={bordered} size="sm" className="table-centered mb-0 dashboard-table" hover>
      {children}
    </Table>
  );
};

export const DashBoardTableHead: FC<{ children: ReactNode }> = ({ children }) => {
  return <thead className="table-light fw-bold">{children}</thead>;
};

export const DashBoardTableBody: FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

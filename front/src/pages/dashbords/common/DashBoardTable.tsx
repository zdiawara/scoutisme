import classNames from "classnames";
import { FC, ReactNode } from "react";
import { Table } from "react-bootstrap";
import "./DashBoardTable.scss";

type CellProps = {
  value?: number;
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
  return <td className="text-dark fw-bold">{value}</td>;
};

export const DashBoardTable: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Table
      responsive
      bordered
      size="sm"
      className="table-centered mb-0 dashboard-table"
      hover
    >
      {children}
    </Table>
  );
};

export const DashBoardTableHead: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <thead className="table-light text-dark fw-bold shadow-sm">
      {children}
    </thead>
  );
};

export const DashBoardTableBody: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <tbody className="text-primary">{children}</tbody>;
};

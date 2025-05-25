import { FC, ReactNode } from "react";
import { Badge, ListGroup, Stack } from "react-bootstrap";

type EmptyProps = {
  label?: string;
};
const Empty: FC<EmptyProps> = ({ label = "-" }) => {
  return <span className="fw-semibold fs-10 fst-italic">{label}</span>;
};

type ItemProps = {
  children?: ReactNode;
  label?: string;
};
const Item: FC<ItemProps> = ({ label, children }) => {
  return (
    <>
      {label && (
        <div className="text-muted text-uppercase fs-6 m-0 mb-1">{label} </div>
      )}
      {children === undefined || children === null || children === "" ? (
        <Empty />
      ) : (
        <div className="m-0 text-black fw-semibold">{children}</div>
      )}
    </>
  );
};

type HeaderProps = {
  icon?: string;
  label: string;
  description?: string;
  className?: string;
  right?: ReactNode;
};
const Header: FC<HeaderProps> = ({
  label,
  description,
  icon,
  right,
  className = "shadow-sm p-2",
}) => {
  return (
    <Stack direction="horizontal" className={`text-primary ${className}`}>
      {icon && <i className={`me-1 fs-3 align-self-start ${icon}`}></i>}
      <Stack>
        <div className={`fs-3 text-black fw-semibold`}>{label}</div>
        {description && <div className="text-black">{description}</div>}
      </Stack>
      <div className="ms-auto align-self-start">{right}</div>
    </Stack>
  );
};

type EtatProps = {
  value: string;
};
const Etat: FC<EtatProps> = ({ value }) => {
  const isActive = value === "1";
  return (
    <Badge bg={isActive ? "success" : "danger"}>
      {isActive ? "Actif" : "Inactif"}
    </Badge>
  );
};

type ToolbarProps = {
  icon?: ReactNode;
  label?: string;
  right?: ReactNode;
  children?: ReactNode;
};
const Toolbar: FC<ToolbarProps> = ({ label, children, icon, right }) => {
  return (
    <ListGroup.Item className="d-flex align-items-center bg-gray-100">
      {(label || icon) && (
        <div>
          {icon}
          <span className="fs-5">{label}</span>
        </div>
      )}
      {children}
      {right && <div className="ms-auto d-block align-self-start">{right}</div>}
    </ListGroup.Item>
  );
};

export const View = {
  Item,
  Header,
  Etat,
  Empty,
  Toolbar,
};

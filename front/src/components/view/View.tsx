import { FC, ReactNode } from "react";
import { Badge, Stack } from "react-bootstrap";

type EmptyProps = {
  label?: string;
};
const Empty: FC<EmptyProps> = ({ label = "non renseingé" }) => {
  return <span className="text-muted fs-10 fst-italic">{label}</span>;
};

type ItemProps = {
  children?: ReactNode;
  label?: string;
};
const Item: FC<ItemProps> = ({ label, children }) => {
  return (
    <>
      {label && (
        <div className="font-14 text-black m-0 mb-1">{label}&nbsp;:</div>
      )}
      {children === undefined || children === null ? (
        <Empty />
      ) : (
        <div className="m-0 text-primary fw-semibold" style={{}}>
          {children}
        </div>
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
  className,
}) => {
  return (
    <Stack
      direction="horizontal"
      className={`text-primary bg-light rounded p-2 ${className}`}
    >
      {icon && <i className={`me-1 fs-3 align-self-start ${icon}`}></i>}
      <Stack>
        <div className={`fs-3 text-primary fw-semibold`}>{label}</div>
        {description && <div className="text-primary">{description}</div>}
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

export const View = {
  Item,
  Header,
  Etat,
  Empty,
};

import { FC, ReactNode } from "react";
import { Badge } from "react-bootstrap";

type EmptyProps = {
  label?: string;
};
const Empty: FC<EmptyProps> = ({ label = "Non renseigné" }) => {
  return <span className="text-muted fs-10 fst-italic">{label}</span>;
};

type ItemProps = {
  children?: ReactNode;
  label?: string;
};
const Item: FC<ItemProps> = ({ label, children }) => {
  return (
    <>
      {label && <h4 className="font-13 m-0 mb-1 text-black">{label}</h4>}
      {children === undefined || children === null ? (
        <Empty />
      ) : (
        <div className="m-0 text-black">{children}</div>
      )}
    </>
  );
};

type HeaderProps = {
  icon?: string;
  label: string;
  className?: string;
};
const Header: FC<HeaderProps> = ({ label, icon, className }) => {
  return (
    <h5 className={`m-0 text-black p-2 rounded bg-light ${className}`}>
      {icon && <i className={`me-1 ${icon}`}></i>}
      {label}
    </h5>
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

import { FC } from "react";
import { Spinner } from "react-bootstrap";

type LoaderSpinnerProps = {
  className?: string;
};
export const LoaderSpinner: FC<LoaderSpinnerProps> = ({ className }) => {
  return (
    <div className={className}>
      <Spinner className="me-1" size="sm" animation="grow" role="status">
        <span className="visually-hidden">Chargement...</span>
      </Spinner>
      <span className="fw-light">Chargement ...</span>
    </div>
  );
};

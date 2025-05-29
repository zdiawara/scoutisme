import { Spinner } from "react-bootstrap";

export const LoaderSpinner = () => {
  return (
    <>
      <Spinner className="me-1" size="sm" animation="grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <span className="fw-light">chargement ...</span>
    </>
  );
};

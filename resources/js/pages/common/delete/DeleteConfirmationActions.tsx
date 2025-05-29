import { ReactNode } from "react";
import { Button } from "react-bootstrap";

type Props<T> = {
  onUpdate: (element: T) => () => void;
  onDelete: (element: T) => () => void;
  element: T;
  children?: ReactNode;
};

export function DeleteConfirmationActions<T>(props: Props<T>) {
  return (
    <div className="text-end">
      {props.children}
      <Button variant="link" onClick={props.onUpdate(props.element)}>
        <i className="uil-edit-alt fs-4 text-primary"></i>
      </Button>

      <Button variant="link" onClick={props.onDelete(props.element)}>
        <i className="mdi mdi-delete fs-4 text-danger"></i>
      </Button>
    </div>
  );
}

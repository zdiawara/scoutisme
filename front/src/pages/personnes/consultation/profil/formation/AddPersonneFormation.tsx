import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { PersonneFormationForm } from "./PersonneFormationForm";

type AddPersonneFormationProps = {
  onClose: () => void;
  onSave: (data: Record<string, any>) => Promise<any>;
};

export const AddPersonneFormation: FC<AddPersonneFormationProps> = ({
  onClose,
  onSave,
}) => {
  return (
    <ListGroup.Item>
      <PersonneFormationForm onSave={onSave} goBack={onClose} />
    </ListGroup.Item>
  );
};

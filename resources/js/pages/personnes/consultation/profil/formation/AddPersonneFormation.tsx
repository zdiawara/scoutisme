import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { PersonneFormationForm } from "./PersonneFormationForm";
import { SelectItem } from "types/form.type";
import { PersonneResource } from "types/personne.type";

type AddPersonneFormationProps = {
  onClose: () => void;
  onSave: (data: Record<string, Date | SelectItem>) => Promise<PersonneResource>;
};

export const AddPersonneFormation: FC<AddPersonneFormationProps> = ({ onClose, onSave }) => {
  return (
    <ListGroup.Item>
      <PersonneFormationForm onSave={onSave} goBack={onClose} />
    </ListGroup.Item>
  );
};

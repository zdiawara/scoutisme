import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { FormationResource } from "types/personne.type";
import { PersonneFormationForm } from "./PersonneFormationForm";
import { DateParser } from "utils/DateUtils";

type EditPersonneFormationProps = {
  formation: FormationResource;
  onClose: () => void;
  onSave: (data: Record<string, any>) => Promise<any>;
};

export const EditPersonneFormation: FC<EditPersonneFormationProps> = ({
  onClose,
  formation,
  onSave,
}) => {
  return (
    <ListGroup.Item>
      <PersonneFormationForm
        onSave={onSave}
        goBack={onClose}
        defaultValues={{
          niveau_formation: {
            label: formation.reference.nom,
            value: formation.reference.id,
          },
          date_formation: DateParser.toDate(formation.date_formation),
        }}
      />
    </ListGroup.Item>
  );
};

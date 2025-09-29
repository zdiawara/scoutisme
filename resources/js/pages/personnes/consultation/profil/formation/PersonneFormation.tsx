import { FC } from "react";
import { Button, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { View } from "components";
import useToggle from "hooks/useToggle";
import { AddPersonneFormation } from "./AddPersonneFormation";
import { FormationResource, PersonneResource } from "types/personne.type";
import { PersonneFormationItem } from "./PersonneFormationItem";
import { selectHelper } from "utils/functions";
import { DateFormater } from "utils/DateUtils";
import { personneApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { useDroits } from "hooks/useDroits";
import { SelectItem } from "types/form.type";

type PersonneCoordonneeProps = {
  formations: FormationResource[];
  personne: PersonneResource;
};

type FormationInput = {
  niveau_formation_id: string | null;
  date_formation?: string;
};

const toFormationBody = (data: Record<string, Date | SelectItem>): FormationInput => {
  return {
    niveau_formation_id: selectHelper.getValue(data.niveau_formation as SelectItem),
    date_formation: DateFormater.toISO(data.date_formation as Date),
  };
};

const toFormations = (data: FormationResource[]): FormationInput[] => {
  return data.map((item) => ({
    niveau_formation_id: item.reference.id,
    date_formation: item.date_formation,
  }));
};

export const PersonneFormation: FC<PersonneCoordonneeProps> = ({ formations, personne }) => {
  const clientQuery = useQueryClient();
  const [show, toggleForm] = useToggle();
  const droits = useDroits();

  const updateFormation = (data: Record<string, Date | SelectItem>, index: number) => {
    const formationsInputs = toFormations(formations);

    return save([...formationsInputs.slice(0, index), toFormationBody(data), ...formationsInputs.slice(index + 1)]);
  };

  const addFormation = async (data: Record<string, Date | SelectItem>) => {
    const formationsInputs = toFormations(formations);
    const body = [...formationsInputs, toFormationBody(data)];
    return save(body);
  };

  const save = async (data: FormationInput[]) => {
    const response = await personneApi.update<PersonneResource>(personne.id, {
      formations: data,
    });
    clientQuery.invalidateQueries([QUERY_KEY.personnes]);
    return response;
  };

  const deleteFormation = (index: number) => {
    const formationsInputs = toFormations(formations);
    return save(formationsInputs.filter((_, i) => i !== index));
  };

  return (
    <ListGroup className="mb-4">
      <View.Toolbar
        icon={<Icon.Briefcase size="1.1rem" className="me-1" />}
        label="Formations"
        right={
          droits.personne.modifier(personne) && (
            <Button variant="secondary" onClick={() => toggleForm()}>
              <Icon.PlusLg />
            </Button>
          )
        }
      />
      {show && <AddPersonneFormation onClose={toggleForm} onSave={addFormation} />}

      <>
        {formations.length ? (
          formations.map((item, i) => (
            <PersonneFormationItem
              formation={item}
              key={item.reference.id + i}
              onSave={(data) => updateFormation(data, i)}
              onDelete={() => deleteFormation(i)}
              droits={{ update: droits.personne.modifier(personne) }}
            />
          ))
        ) : (
          <ListGroup.Item className="text-center">
            <span className="text-muted">Aucune formation renseignée</span>
          </ListGroup.Item>
        )}
      </>
    </ListGroup>
  );
};

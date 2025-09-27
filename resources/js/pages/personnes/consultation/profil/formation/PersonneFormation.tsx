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

type PersonneCoordonneeProps = {
  formations: FormationResource[];
  personne: PersonneResource;
};

type FormationInput = {
  niveau_formation_id: string | null;
  date_formation?: string;
};

const toFormationBody = (data: Record<string, any>): FormationInput => {
  return {
    niveau_formation_id: selectHelper.getValue(data.niveau_formation),
    date_formation: DateFormater.toISO(data.date_formation),
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

  const updateFormation = (data: Record<string, any>, index: number) => {
    const formationsInputs = toFormations(formations);

    return save([...formationsInputs.slice(0, index), toFormationBody(data), ...formationsInputs.slice(index + 1)]);
  };

  const addFormation = async (data: Record<string, any>) => {
    const formationsInputs = toFormations(formations);
    const body = [...formationsInputs, toFormationBody(data)];
    return save(body);
  };

  const save = async (data: FormationInput[]) => {
    const response = await personneApi.update(personneId, {
      formations: data,
    });
    clientQuery.invalidateQueries([QUERY_KEY.personnes]);
    return response;
  };

  const deleteFormation = (formationId: string) => {
    const formationsInputs = toFormations(formations);
    return save(formationsInputs.filter((e) => e.niveau_formation_id !== formationId));
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
              key={item.reference.id}
              onSave={(data) => updateFormation(data, i)}
              onDelete={() => deleteFormation(item.reference.id)}
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

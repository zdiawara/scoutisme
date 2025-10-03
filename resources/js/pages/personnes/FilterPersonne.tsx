import { useQuery } from "@tanstack/react-query";
import { genreApi } from "api/index";
import { SelectFonction, SelectOrganisation, SelectRefFormation, SelectVille, TextInput } from "components";
import { withFilterForm } from "hoc";
import { useAuth } from "hooks";
import { FC } from "react";
import { ButtonGroup, Col, Form, ToggleButton } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { GenreResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { buildPerimetres } from "utils/functions";

const ETAT_COTISATIONS = [
  {
    label: "A jour",
    value: "a_jour",
  },
  {
    label: "Non à jour",
    value: "non_a_jour",
  },
];

const TYPE_PERSONNES = [
  {
    label: "Scout",
    value: "scout",
  },
  {
    label: "Adulte",
    value: "adulte",
  },
];

const FilterPersonneForm: FC = () => {
  const { userDroit, user } = useAuth();
  const { setValue, watch } = useFormContext();

  const queryGenre = useQuery({
    queryKey: [QUERY_KEY.genres],
    queryFn: async () => {
      const result = await genreApi.findAll<GenreResource>();
      return result;
    },
  });

  const codeNature = user?.personne?.organisation?.nature?.code;

  const perimetres = codeNature ? buildPerimetres(codeNature).join(";") : null;

  return (
    <>
      <Form.Group className="position-relative">
        <Form.Label className="text-muted d-block text-uppercase fs-6">Type de personne</Form.Label>
        <ButtonGroup>
          {TYPE_PERSONNES.map((type) => {
            const selected = watch("typePersonne")?.value;
            return (
              <ToggleButton
                key={type.value}
                id={type.value}
                type="checkbox"
                variant={selected === type.value ? "outline-secondary" : "outline-secondary"}
                name="typePersonne"
                value={type.value}
                checked={selected === type.value}
                onChange={({ target: { checked, name } }) => {
                  if (checked) {
                    setValue(
                      name,
                      TYPE_PERSONNES.find((e) => e.value === type.value)
                    );
                  } else {
                    setValue(name, null);
                  }
                }}
              >
                {type.label}
              </ToggleButton>
            );
          })}
        </ButtonGroup>
      </Form.Group>

      <Col xs={12}>
        <Form.Label className="text-muted d-block text-uppercase fs-6">Genre</Form.Label>
        <div className="d-flex">
          {queryGenre.data?.data.map((genre, i) => (
            <Form.Check
              className={i === 0 ? "me-3" : ""}
              id={genre.id}
              key={genre.id}
              name="genre"
              label={genre.nom}
              value={genre.id}
              checked={watch("genre")?.value === genre.id}
              onChange={({ target: { checked, name } }) => {
                if (checked) {
                  const _genre = queryGenre.data?.data?.find((e) => e.id === genre.id);
                  setValue(name, _genre ? { label: _genre.nom, value: _genre.id } : null);
                } else {
                  setValue(name, null);
                }
              }}
            />
          ))}
        </div>
      </Col>
      <Col xs={12}>
        <TextInput name="age" label="Age" />
      </Col>
      <Col>
        <Form.Label className="text-muted d-block text-uppercase fs-6">Etat cotisation</Form.Label>

        <div className="d-flex">
          {ETAT_COTISATIONS.map((genre, i) => (
            <Form.Check
              className={i === 0 ? "me-3" : ""}
              id={genre.value}
              key={genre.value}
              name="etatCotisation"
              label={genre.label}
              value={genre.value}
              checked={watch("etatCotisation")?.value === genre.value}
              onChange={({ target: { checked, name } }) => {
                if (checked) {
                  setValue(
                    name,
                    ETAT_COTISATIONS.find((e) => e.value === genre.value)
                  );
                } else {
                  setValue(name, null);
                }
              }}
            />
          ))}
        </div>
      </Col>
      <Col xs={12}>
        <SelectFonction
          name="fonction"
          label="Fonction"
          isClearable
          placeholder=""
          requestParams={{
            codeNature: perimetres,
          }}
        />
      </Col>

      {!userDroit?.hasOnlyPerimetreUnite() && (
        <Col xs={12}>
          <SelectOrganisation
            name="organisation"
            label="Organisation"
            isClearable
            placeholder=""
            requestParams={{
              perimetres,
              organisationId: user?.personne?.organisation?.id,
            }}
          />
        </Col>
      )}

      <Col xs={12}>
        <SelectRefFormation name="niveauFormation" label="Niveau formation" isClearable placeholder="" />
      </Col>

      <Col xs={12}>
        <SelectVille name="ville" label="Ville de residence" isClearable placeholder="" />
      </Col>
    </>
  );
};

export const FilterPersonne = withFilterForm(FilterPersonneForm);

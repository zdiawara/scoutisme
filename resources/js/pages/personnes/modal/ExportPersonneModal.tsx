import { personneApi } from "api";
import { HookModalForm, Radio } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { useAuth } from "hooks/index";
import { FC, Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { buildPerimetres } from "utils/functions";

const COLUMNS = [
  {
    label: "Personne",

    Icon: Icon.People,
    children: [
      {
        name: "p_code",
        label: "Numéro",
        description: "Identifiant unique de la personne",
      },
      {
        name: "p_nom",
        label: "Nom",
        description: "Nom de famille de la personne",
      },
      {
        name: "p_prenom",
        label: "Prénom",
        description: "Prénom de la personne",
      },
      {
        name: "p_genre",
        label: "Genre",
        description: "Homme ou femme",
      },
      {
        name: "p_date_naissance",
        label: "Date de naissane",
        description: "Date de naissance de la personne",
      },
      {
        name: "p_lieu_naissane",
        label: "Lieu de naissance",
        description: "Lieu de naissance de la personne",
      },
    ],
  },
  {
    label: "Organisation",
    Icon: Icon.Building,
    children: [
      {
        name: "o_code",
        label: "Code",
        description: "Identifiant unique de l'organisation",
      },
      {
        name: "o_nom",
        label: "Nom",
        description: "Nom de l'organisation",
      },
      {
        name: "o_nature",
        label: "Nature",
        description: "Unité, groupe, région ...",
      },
    ],
  },
  {
    label: "Fonction",
    Icon: Icon.Briefcase,
    children: [
      {
        name: "f_code",
        label: "Code",
        description: "Identifiant unique de la fonction",
      },
      {
        name: "f_nom",
        label: "Nom",
        description: "Nom de la fonction",
      },
    ],
  },
];

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      labels={{
        saveLabel: "Exporter",
      }}
      modalBodyClassName="bg-white p-0"
      onClose={props.onExit}
    >
      <ListGroup variant="flush">
        {COLUMNS.map((item) => (
          <Fragment key={item.label}>
            <ListGroup.Item className="bg-gray-200">
              <item.Icon className="me-1" size="1.3rem" /> {item.label}
            </ListGroup.Item>
            {item.children.map((colonne) => (
              <ListGroup.Item key={colonne.name}>
                <Radio
                  name={colonne.name}
                  label={
                    <>
                      <span>{colonne.label}</span>
                      <div className="fw-light">{colonne.description}</div>
                    </>
                  }
                  type="checkbox"
                  inline
                  value="1"
                />
              </ListGroup.Item>
            ))}
          </Fragment>
        ))}
      </ListGroup>
    </HookModalForm>
  );
};

const ExportPersonneForm = withMutationForm(Form);

const defaultValues = ["p_nom", "p_prenom", "p_genre", "o_nom", "o_nature", "f_nom"].reduce((prev, cur) => {
  prev[cur] = "1";
  return prev;
}, {} as Record<string, any>);

type ExportPersonneModalProps = {
  filter: Record<string, any>;
  closeModal: () => void;
};

export const ExportPersonneModal: FC<ExportPersonneModalProps> = ({ filter, closeModal }) => {
  const auth = useAuth();
  const isAdmin = auth.userDroit?.isAdmin;
  const personne = auth.user?.personne;

  const exporter = (data: Record<string, any>) => {
    const fields = Object.entries(data)
      .filter((entry) => {
        return entry[1] !== null && entry[1] !== undefined;
      })
      .map((entry) => entry[0])
      .join(";");

    const filterParams = { ...filter, fields } as Record<string, any>;
    if (!isAdmin && personne?.organisation?.id && !filterParams.organisationId) {
      filterParams.organisationId = personne?.organisation?.id;
      filterParams.perimetres = buildPerimetres(personne?.organisation?.nature.code).join(";");
    }
    return personneApi.download("exports/csv", filterParams);
  };

  return (
    <ExportPersonneForm
      onSave={exporter}
      title="Export de personnes"
      subtitle="Choisir les colonnes à inclure dans l'expert"
      defaultValues={{ ...defaultValues }}
      onSuccess={closeModal}
      onExit={closeModal}
      modalProps={{ scrollable: true, size: "lg" }}
    />
  );
};

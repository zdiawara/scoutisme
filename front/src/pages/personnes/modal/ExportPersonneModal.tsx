import { personneApi } from "api";
import { HookModalForm, Radio, View } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-white p-3"
      onClose={props.onExit}
    >
      <View.Header
        label="Personne"
        description="Selectionner les critères à exporter"
        className="mb-3"
      />
      <Row>
        <Col xs={12}>
          <Radio name="p_code" label="Code" type="checkbox" inline value="1" />
          <Radio name="p_nom" label="Nom" type="checkbox" inline value="1" />
          <Radio
            name="p_prenom"
            label="Prénom"
            type="checkbox"
            inline
            value="1"
          />
          <Radio
            name="p_genre"
            label="Genre"
            type="checkbox"
            inline
            value="1"
          />
          <Radio
            name="p_date_naissance"
            label="Date naissance"
            type="checkbox"
            inline
            value="1"
          />
          <Radio
            name="p_lieu_naissance"
            label="Lieu naissance"
            type="checkbox"
            inline
            value="1"
          />
        </Col>
      </Row>

      <View.Header
        label="Organisation"
        description="Selectionner les critères à exporter"
        className="mb-3 mt-3"
      />
      <Row className="g-3">
        <Col xs={12}>
          <Radio name="o_code" label="Code" type="checkbox" inline value="1" />
          <Radio name="o_nom" label="Nom" type="checkbox" inline value="1" />
          <Radio
            name="o_nature"
            label="Nature"
            type="checkbox"
            inline
            value="1"
          />
        </Col>
      </Row>

      <View.Header
        label="Fonction"
        description="Selectionner les critères à exporter"
        className="mt-3 mb-3"
      />
      <Row className="g-3">
        <Col xs={12}>
          <Radio name="f_code" label="Code" type="checkbox" inline value="1" />
          <Radio name="f_nom" label="Nom" type="checkbox" inline value="1" />
        </Col>
      </Row>
    </HookModalForm>
  );
};

const ExportPersonneForm = withMutationForm(Form);

const defaultValues = [
  "p_nom",
  "p_prenom",
  "p_genre",
  "o_nom",
  "o_nature",
  "f_nom",
].reduce((prev, cur) => {
  prev[cur] = "1";
  return prev;
}, {} as Record<string, any>);

type ExportPersonneModalProps = {
  filter: Record<string, any>;
  closeModal: () => void;
};

export const ExportPersonneModal: FC<ExportPersonneModalProps> = ({
  filter,
  closeModal,
}) => {
  return (
    <ExportPersonneForm
      onSave={(data) => {
        const fields = Object.entries(data)
          .filter((entry) => {
            return entry[1] !== null && entry[1] !== undefined;
          })
          .map((entry) => entry[0])
          .join(";");
        return personneApi.download("exports/csv", { ...filter, fields });
      }}
      title="Exporter les personnes"
      defaultValues={{ ...defaultValues }}
      onSuccess={closeModal}
      onExit={closeModal}
    />
  );
};

import { personneApi } from "api";
import { HookModalForm, Radio, View } from "components";
import { WrapperV2Props, withMutationForm } from "hoc";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";

const Form: FC<WrapperV2Props> = (props) => {
  return (
    <HookModalForm
      {...props}
      modalBodyClassName="bg-light p-3"
      onClose={props.onExit}
    >
      <View.Header label="Personne" className="ps-0" />
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

      <View.Header label="Attribution" className="ps-0 mt-3" />
      <Row className="g-3">
        <Col xs={12}>
          <label className="text-dark fw-bold me-2 mb-2">
            Organisation &nbsp;
          </label>
          <br />
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
        <Col>
          <Radio
            name="o_parent"
            label="Inclure les parents"
            type="switch"
            inline
            value="1"
          />
        </Col>
        <Col xs={12}>
          <label className="text-dark  fw-bold me-2 mb-2">
            Fonction &nbsp;
          </label>
          <br />
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

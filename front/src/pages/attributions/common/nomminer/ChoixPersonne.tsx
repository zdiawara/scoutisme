import classNames from "classnames";
import { FC } from "react";
import { Button, Form, ListGroup, Modal, Stack } from "react-bootstrap";

type Props = {
  value: string;
  setValue: (v: string) => void;
};

type ItemProps = {
  code: string;
  title: string;
  description: string;
};
const Item: FC<ItemProps & Props> = ({
  value,
  setValue,
  code,
  title,
  description,
}) => {
  return (
    <ListGroup.Item
      type="button"
      onClick={() => {
        setValue(code);
      }}
      className={classNames({
        "bg-light": code === value,
        // "text-white": code === value,
      })}
    >
      <Stack direction="horizontal">
        <Form.Check
          size={5}
          type="radio"
          checked={value === code}
          onChange={() => {
            setValue(code);
          }}
          className="align-self-start"
        />
        <div className="ms-2">
          <div className="fw-semibold mb-1">{title}</div>
          <div className="fw-light">{description}</div>
        </div>
      </Stack>
    </ListGroup.Item>
  );
};

export const ChoixPersonne: FC<
  Props & { closeModal: () => void; nextStep: () => void }
> = ({ value, setValue, closeModal, nextStep }) => {
  return (
    <>
      <Modal.Body className="bg-gray-100">
        <ListGroup>
          <Item
            title="Personne existante"
            description="Nommer une personne déjà existante"
            setValue={setValue}
            value={value}
            code="exist"
          />
          <Item
            title="Nouvelle personne"
            description="Nommer une personne qui n'existe pas"
            setValue={setValue}
            value={value}
            code="new"
          />
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="me-auto"
          variant="outline-primary"
          onClick={() => closeModal()}
        >
          Annuler
        </Button>
        <Button onClick={() => nextStep()}>Suivant</Button>
      </Modal.Footer>
    </>
  );
};

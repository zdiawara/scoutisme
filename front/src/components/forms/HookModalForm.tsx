import { FC, ReactNode } from "react";
import { Form, Modal } from "react-bootstrap";

type UtilitaireModalProps = {
  onClose?: () => void;
  renderButtons: () => ReactNode;
  onSubmit: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export const HookModalForm: FC<UtilitaireModalProps> = ({
  title,
  subtitle,
  onClose,
  renderButtons,
  onSubmit,
  children,
}) => {
  return (
    <Modal
      show={true}
      onHide={onClose}
      centered={false}
      animation={false}
      size="lg"
    >
      <Form onSubmit={onSubmit}>
        {title && (
          <Modal.Header closeButton>
            <Modal.Title className="text-black">{title}</Modal.Title>
            {subtitle && <span>&nbsp;{subtitle}</span>}
          </Modal.Header>
        )}
        <Modal.Body className="bg-light">{children}</Modal.Body>
        <Modal.Footer>{renderButtons()}</Modal.Footer>
      </Form>
    </Modal>
  );
};

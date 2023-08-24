import { FC, ReactNode } from "react";
import { Form, Modal, ModalProps } from "react-bootstrap";

type UtilitaireModalProps = {
  onClose?: () => void;
  renderButtons: () => ReactNode;
  onSubmit: () => void;
  title?: string;
  subtitle?: string;
  modalProps?: ModalProps;
  modalBodyClassName?: string;
  children: ReactNode;
};

export const HookModalForm: FC<UtilitaireModalProps> = ({
  title,
  subtitle,
  modalProps = {
    centered: false,
    animation: true,
    size: "lg",
  },
  modalBodyClassName = "bg-light",
  onClose,
  renderButtons,
  onSubmit,
  children,
}) => {
  return (
    <Modal {...modalProps} onHide={onClose} show={true}>
      <Form onSubmit={onSubmit}>
        {title && (
          <Modal.Header closeButton>
            <Modal.Title className="text-black">{title}</Modal.Title>
            {subtitle && <span>&nbsp;{subtitle}</span>}
          </Modal.Header>
        )}
        <Modal.Body className={modalBodyClassName}>{children}</Modal.Body>
        <Modal.Footer>{renderButtons()}</Modal.Footer>
      </Form>
    </Modal>
  );
};

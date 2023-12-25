import classNames from "classnames";
import { FC, ReactNode } from "react";
import { Modal, ModalHeaderProps, ModalProps } from "react-bootstrap";

type UtilitaireModalProps = {
  onClose?: () => void;
  renderButtons: () => ReactNode;
  onSubmit: () => void;
  title?: string;
  subtitle?: string;
  modalProps?: ModalProps;
  modalBodyClassName?: string;
  modalHeaderProps?: ModalHeaderProps;
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
  modalHeaderProps,
  modalBodyClassName = "bg-modal",
  renderButtons,
  children,
}) => {
  return (
    <Modal {...modalProps} show={true}>
      {title && (
        <Modal.Header {...modalHeaderProps}>
          <div>
            <Modal.Title
              className={classNames("text-primary", { "my-0": !!subtitle })}
            >
              {title}
            </Modal.Title>
            {subtitle && <>{subtitle}</>}
          </div>
        </Modal.Header>
      )}
      <Modal.Body className={modalBodyClassName}>{children}</Modal.Body>
      <Modal.Footer>{renderButtons()}</Modal.Footer>
    </Modal>
  );
};

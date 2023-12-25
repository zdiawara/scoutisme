import classNames from "classnames";
import { FC, ReactNode } from "react";
import { Modal, ModalHeaderProps, ModalProps } from "react-bootstrap";
import { ButtonLabel } from "types/request.type";

type UtilitaireModalProps = {
  onClose?: () => void;
  renderButtons: (labels: ButtonLabel | undefined) => ReactNode;
  onSubmit: () => void;
  title?: string;
  subtitle?: string;
  modalProps?: ModalProps;
  modalBodyClassName?: string;
  modalHeaderProps?: ModalHeaderProps;
  children: ReactNode;
  labels?: ButtonLabel;
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
  labels,
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
      <Modal.Footer>{renderButtons(labels)}</Modal.Footer>
    </Modal>
  );
};

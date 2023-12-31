import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import {
  Alert,
  Button,
  ModalHeaderProps,
  ModalProps,
  Spinner,
} from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ButtonLabel } from "types/request.type";
import { AnyObjectSchema } from "yup";

type HocCompomentProps = {
  onSave: (data: any) => Promise<any>;
  onFinished?: (data: any) => void;
  onExit?: () => void;
  defaultValues?: Record<string, any>;
  meta?: Record<string, any>;
  title: string;
  subtitle?: string;
  onSuccess?: (data: any) => void;
  modalProps?: ModalProps;
  modalBodyClassName?: string;
  modalHeaderProps?: ModalHeaderProps;
};

export type WrapperV2Props = {
  isEditMode: boolean;
  renderButtons: (labels: ButtonLabel | undefined) => ReactNode;
  renderGeneralError: () => ReactNode;
  onSubmit: () => void;
  onExit?: () => void;
  title?: string;
  subtitle?: string;
  modalProps?: ModalProps;
  modalBodyClassName?: string;
  meta: Record<string, any>;
};

export function withMutationForm(
  Wrapper: FC<WrapperV2Props>,
  schema?: AnyObjectSchema
) {
  const HocCompoment: FC<HocCompomentProps> = ({
    onSave,
    onFinished,
    defaultValues,
    onSuccess,
    onExit,
    meta,
    ...rest
  }) => {
    const methods = useForm({
      resolver: schema ? yupResolver(schema) : undefined,
      defaultValues,
      mode: "onChange",
      reValidateMode: "onChange",
    });

    const { mutate, isLoading } = useMutation({
      networkMode: "offlineFirst",
      mutationFn: (data: any) => {
        return onSave(data);
      },
      onSuccess: (r) => {
        onSuccess && onSuccess(r?.data);
        toast("Modifications enregistrées !", {
          type: toast.TYPE.INFO,
          autoClose: 5000,
          position: "bottom-right",
        });
      },
    });

    const onSubmit = (data: any) => {
      mutate(data);
    };

    const onError = (e: any) => {
      console.error(e);
    };

    const renderButtons = (labels: ButtonLabel | undefined) => {
      return (
        <>
          <Button
            className="me-1"
            variant="danger"
            onClick={onExit}
            disabled={isLoading}
          >
            {labels?.cancelLabel || "Annuler"}
          </Button>
          <Button
            onClick={methods.handleSubmit(onSubmit, onError)}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading && (
              <Spinner
                size="sm"
                className="me-2"
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            {labels?.saveLabel || "Enregistrer"}
          </Button>
        </>
      );
    };

    const renderGeneralError = () =>
      methods.formState.errors["_message"] && (
        <Alert color="error" variant="filled">
          {methods.formState.errors["_message"]?.message?.toString() || "-"}
        </Alert>
      );

    const isEditMode = !!methods.watch("id");

    return (
      <FormProvider {...methods}>
        <Wrapper
          isEditMode={isEditMode}
          renderButtons={renderButtons}
          onExit={onExit}
          onSubmit={methods.handleSubmit(onSubmit, onError)}
          renderGeneralError={renderGeneralError}
          {...rest}
          meta={meta || {}}
        />
      </FormProvider>
    );
  };

  return HocCompoment;
}

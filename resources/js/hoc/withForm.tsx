import { yupResolver } from "@hookform/resolvers/yup";
import { FC, ReactNode, useState } from "react";
import { Alert, Button, Form, Stack } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notifier } from "utils/notification";
import { AnyObjectSchema } from "yup";

type HocCompomentProps = {
  onSave: (data: any) => Promise<any>;
  onFinished?: (data: any) => void;
  goBack?: () => void;
  defaultValues?: Record<string, any>;
  title?: string;
  subtitle?: string;
  withNotification?: boolean;
  notificationOptions?: {
    message?: string;
  };
};

export type WrapperProps = {
  isEditMode: boolean;
  renderButtons: () => ReactNode;
  renderButtonsActions: () => ReactNode;
  renderGeneralError: () => ReactNode;
  onSubmit: () => void;
  goBack: () => void;
  title?: string;
  subtitle?: string;
};

export function withForm(Wrapper: FC<WrapperProps>, schema?: AnyObjectSchema) {
  const HocCompoment: FC<HocCompomentProps> = ({
    onSave,
    onFinished,
    defaultValues,
    title,
    subtitle,
    goBack,
    withNotification = true,
    notificationOptions,
  }) => {
    const methods = useForm({
      resolver: schema ? yupResolver(schema) : undefined,
      defaultValues: { ...defaultValues },
      mode: "onChange",
      reValidateMode: "onChange",
    });
    const navigation = useNavigate();
    const [, setSaving] = useState<boolean>(false);
    //const notification = useNotification();

    const _goBack = () => {
      navigation(-1);
    };

    const onSubmit = (data: any) => {
      setSaving(true);
      onSave(data)
        .then((element) => {
          if (onFinished) {
            onFinished(element);
          } else {
            if (goBack) {
              goBack();
            } else {
              _goBack();
            }
          }
          if (withNotification) {
            notifier.succes(notificationOptions?.message || "Modifications enregistrées !");
          }
        })
        .catch((e) => {
          let message = "";
          if (e?.status === 422) {
            Object.keys(e.errors || {}).forEach((key) => {
              methods.setError(key, { message: e.errors[key] });
            });
            message = "Les données soumises ne sont pas valides";
          } else if (e?.status === 400) {
            message = e.message || e.errors.message;
          } else {
            console.error(e);
            message = "Une erreur technique est survenue lors de l'enregistrement";
          }

          notifier.erreur(message);
        })
        .finally(() => {
          setSaving(false);
        });
    };

    const onError = (e: any) => {
      console.error(e);
    };

    const renderButtons = () => {
      return (
        <>
          <Button className="me-1" variant="danger" size="sm" onClick={goBack || _goBack}>
            Annuler
          </Button>
          <Button onClick={methods.handleSubmit(onSubmit, onError)} variant="primary" size="sm">
            Enregistrer
          </Button>
        </>
      );
    };

    const renderButtonsActions = () => (
      <Stack direction="horizontal" className="mt-3">
        <div className="ms-auto">
          <Button variant="outline-primary" className="me-1" onClick={goBack || _goBack}>
            Annuler
          </Button>
          <Button onClick={methods.handleSubmit(onSubmit, onError)}>Enregistrer</Button>
        </div>
      </Stack>
    );

    const renderGeneralError = () =>
      methods.formState.errors["_message"] && (
        <Alert color="error" variant="filled">
          {methods.formState.errors["_message"]?.message?.toString() || "-"}
        </Alert>
      );

    const isEditMode = !!methods.watch("id");

    return (
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Wrapper
            isEditMode={isEditMode}
            renderButtons={renderButtons}
            goBack={goBack || _goBack}
            onSubmit={methods.handleSubmit(onSubmit, onError)}
            renderGeneralError={renderGeneralError}
            title={title}
            subtitle={subtitle}
            renderButtonsActions={renderButtonsActions}
          />
        </Form>
      </FormProvider>
    );
  };

  return HocCompoment;
}

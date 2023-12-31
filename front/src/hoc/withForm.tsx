import { yupResolver } from "@hookform/resolvers/yup";
import { FC, ReactNode, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AnyObjectSchema } from "yup";

type HocCompomentProps = {
  onSave: (data: any) => Promise<any>;
  onFinished?: (data: any) => void;
  goBack?: () => void;
  defaultValues?: Record<string, any>;
  title: string;
  subtitle?: string;
};

export type WrapperProps = {
  isEditMode: boolean;
  renderButtons: () => ReactNode;
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
  }) => {
    const methods = useForm({
      resolver: schema ? yupResolver(schema) : undefined,
      defaultValues,
      mode: "onChange",
      reValidateMode: "onChange",
    });
    const navigation = useNavigate();
    const [, setSaving] = useState<boolean>(false);
    //const notification = useNotification();

    const onSubmit = (data: any) => {
      setSaving(true);
      onSave(data)
        .then((element) => {
          if (onFinished) {
            onFinished(element);
          } else {
            goBack ? goBack() : _goBack();
          }
          toast("Modifications enregistrées !", {
            type: toast.TYPE.INFO,
            autoClose: 5000,
            position: "bottom-right",
          });
        })
        .catch((e) => {
          let message = "";
          if (e.status === 422) {
            Object.keys(e.errors || {}).forEach((key) => {
              methods.setError(key, { message: e.errors[key] });
            });
            message = "Les données soumises ne sont pas valides";
          } else if (e.status === 400) {
            message = e.message;
          } else {
            console.error(e);
            message =
              "Une erreur technique est survenue lors de l'enregistrement";
          }

          toast(message, {
            type: toast.TYPE.ERROR,
            autoClose: 5000,
            position: "bottom-right",
            hideProgressBar: true,
          });
        })
        .finally(() => {
          setSaving(false);
        });
    };

    const _goBack = () => {
      navigation(-1);
    };

    const onError = (e: any) => {
      console.error(e);
      /*notification.warning({
        title: "Les données soumises ne sont pas valides",
      });*/
    };

    const renderButtons = () => {
      return (
        <>
          <Button className="me-1" variant="danger" onClick={goBack || _goBack}>
            Annuler
          </Button>
          <Button
            onClick={methods.handleSubmit(onSubmit, onError)}
            variant="primary"
          >
            Enregistrer
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
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Wrapper
            isEditMode={isEditMode}
            renderButtons={renderButtons}
            goBack={goBack || _goBack}
            onSubmit={methods.handleSubmit(onSubmit, onError)}
            renderGeneralError={renderGeneralError}
            title={title}
            subtitle={subtitle}
          />
        </Form>
      </FormProvider>
    );
  };

  return HocCompoment;
}

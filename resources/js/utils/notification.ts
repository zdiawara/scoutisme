import { toast, ToastOptions } from "react-toastify";

export const NotificationSuccess: ToastOptions = {
  type: toast.TYPE.SUCCESS,
  autoClose: 5000,
  position: "top-right",
};

export const NotificationError: ToastOptions = {
  type: toast.TYPE.ERROR,
  autoClose: 5000,
  position: "top-right",
  hideProgressBar: true,
};

export const buildMessageError = (e: any) => {
  let message = "";
  if (e?.status === 422) {
    // Object.keys(e.errors || {}).forEach((key: any) => {
    //   methods.setError(key, { message: e.errors[key] });
    // });
    message = "Les données soumises ne sont pas valides";
  } else if (e?.status === 400) {
    message = e.message;
  } else {
    console.error(e);
    message = "Une erreur technique est survenue lors de l'enregistrement";
  }
  return message;
};

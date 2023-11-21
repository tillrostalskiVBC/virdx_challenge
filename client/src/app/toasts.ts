import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastError = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "Toastify__toast Toastify__toast--error",
    closeButton: true,
    bodyClassName: "Toastify__toast-body",
    progressClassName: "Toastify__progress-bar",
  });
};

export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "Toastify__toast Toastify__toast--success",
    bodyClassName: "Toastify__toast-body",
    progressClassName: "Toastify__progress-bar",
  });
};

export const toastWarning = (message: string) => {
  toast.warn(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "Toastify__toast Toastify__toast--warning",
    bodyClassName: "Toastify__toast-body",
    progressClassName: "Toastify__progress-bar",
  });
};

export const toastInfo = (message: string) => {
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "Toastify__toast Toastify__toast--info",
    bodyClassName: "Toastify__toast-body",
    progressClassName: "Toastify__progress-bar",
  });
};

export function toastPromise<T>(
  promise: Promise<any>,
  pendingMessage?: string,
  successMessage?: string,
  errorMessage?: string
): Promise<T> {
  const pending = pendingMessage || "Loading...";
  const success = successMessage || "Success!";
  const error = errorMessage || "Error!";

  return toast.promise(
    promise,
    {
      pending: pending,
      success: success,
      error: error,
    },
    { position: toast.POSITION.BOTTOM_RIGHT }
  );
}

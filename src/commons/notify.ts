import { toast } from "react-toastify";

const error = (message?: String) => {
  return toast.error(message ?? "Erro", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const success = (message?: String) => {
  return toast.success(message ?? "Sucesso", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const warning = (message?: String) => {
  return toast.warning(message ?? "Aviso", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const info = (message?: String) => {
  return toast.info(message ?? "Informativo", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const Notify = {
  error,
  success,
  warning,
  info,
};

export default Notify;

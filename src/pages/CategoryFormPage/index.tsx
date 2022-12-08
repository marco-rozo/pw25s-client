import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ICategory } from "../../commons/interfaces";
import Notify from "../../commons/notify";
import { Button } from "../../components/Buttons";
import { DangerAlert } from "../../components/DangerAlert";
import { Input } from "../../components/Inputs";
import CategoryService from "../../service/CategoryService";

export function CategoryFormPage() {
  const [form, setForm] = useState({
    id: undefined,
    name: "",
  });
  const [errors, setErrors] = useState({
    id: undefined,
    name: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const classError: string =
    "block border-red-400 ring-red-300 ring w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40";

  useEffect(() => {
    if (id) {
      CategoryService.findById(parseInt(id))
        .then((response) => {
          if (response.data) {
            setForm({
              id: response.data.id,
              name: response.data.name,
            });
          }
        })
        .catch((responseError) => {
          setApiError(true);
        });
    }
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError(false);
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: "",
      };
    });
  };

  const onValidate = () => {
    if (form.name.length > 0) onSubmit();

    setFormError(true);
  };

  const onSubmit = () => {
    const category: ICategory = {
      id: form.id,
      name: form.name,
    };
    setPendingApiCall(true);
    if (id) {
      CategoryService.update(category)
        .then((response) => {
          setPendingApiCall(false);
          navigate("/categories");
        })
        .catch((responseError) => {
          if (responseError.response.data.validationErrors) {
            setErrors(responseError.response.data.validationErrors);
          }
          Notify.error("Erro ao alterar categoria");
          setPendingApiCall(false);
          setApiError(true);
        });
    } else {
      CategoryService.save(category)
        .then((response) => {
          setPendingApiCall(false);
          navigate("/categories");
        })
        .catch((responseError) => {
          if (responseError.response.data.validationErrors) {
            setErrors(responseError.response.data.validationErrors);
          }
          Notify.error("Erro ao cadastrar categoria");
          setPendingApiCall(false);
          setApiError(true);
        });
    }
  };

  return (
    <>
      <div className="mt-8 w-full relative flex flex-col justify-center overflow-hidden items-center">
        <div className="w-4/5 md:w-1/2">
          <h1 className="text-3xl mb-5 font-bold text-center text-purple-700">
            Cadastro de Categoria
          </h1>
          <Input
            label="Nome"
            classNameLabel="block text-sm font-semibold text-gray-800"
            placeholder="Nome"
            type="text"
            className={
              !formError
                ? "block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                : classError
            }
            onChange={onChange}
            value={form.name}
            name="name"
          />
          <Button
            text="Salvar"
            disabled={pendingApiCall}
            className="mt-5 w-full mb-3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
            onClick={onValidate}
            // onClick={onSubmit}
            pendingApiCall={pendingApiCall}
          ></Button>
          {apiError && <DangerAlert text="Falha ao cadastrar a categoria." />}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

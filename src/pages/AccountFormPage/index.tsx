import {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IAccount, ICategory } from "../../commons/interfaces";
import Notify from "../../commons/notify";
import { Button } from "../../components/Buttons";
import { DangerAlert } from "../../components/DangerAlert";
import { Input } from "../../components/Inputs";
import AccountService from "../../service/AccountsService";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { typesAccounts } from "../../commons/constants";

export function AccountFormPage() {
  const [form, setForm] = useState({
    id: undefined,
    name: "",
    agence: "",
    number: "",
    description: "",
    type: "0",
  });

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    agence: "",
    number: "",
    description: "",
    type: "",
  });

  let typeList = typesAccounts.map((item: any, i: any) => {
    return (
      <option key={i} value={item.id}>
        {item.name}
      </option>
    );
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
      AccountService.findById(parseInt(id))
        .then((response) => {
          if (response.data) {
            setForm({
              id: response.data.id,
              name: response.data.name,
              agence: response.data.agence,
              description: response.data.description,
              number: response.data.number,
              type: response.data.type,
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

  const selectTypeAccount = (e: any) => {
    setForm((previousForm) => {
      return {
        ...previousForm,
        ["type"]: e.target.selectedIndex,
      };
    });
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((previousForm) => {
      return {
        ...previousForm,
        ["description"]: e.target.value,
      };
    });
  };

  const onSubmit = () => {
    debugger;
    const account: IAccount = {
      id: form.id,
      name: form.name,
      agence: form.agence,
      number: form.number,
      description: form.description,
      type: form.type,
    };
    setPendingApiCall(true);
    AccountService.save(account)
      .then((response) => {
        setPendingApiCall(false);
        navigate("/accounts");
      })
      .catch((responseError) => {
        if (responseError.response.data.validationErrors) {
          setErrors(responseError.response.data.validationErrors);
        }
        Notify.error("Erro ao cadastrar conta");
        setPendingApiCall(false);
        setApiError(true);
      });
  };

  return (
    <>
      <div className="mt-8 w-full relative flex flex-col justify-center overflow-hidden items-center">
        <div className="w-4/5 md:w-1/2">
          <h1 className="text-3xl mb-5 font-bold tex90t-center text-purple-700">
            Cadastro de Conta
          </h1>
          <Formik initialValues={form} onSubmit={onSubmit}>
            <Form>
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
              <div className="mt-4 grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <Input
                    label="Número"
                    classNameLabel="block text-sm font-semibold text-gray-800"
                    placeholder="Número"
                    type="tel"
                    className={
                      !formError
                        ? "block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        : classError
                    }
                    onChange={onChange}
                    value={form.number}
                    name="number"
                  />
                </div>
                <div>
                  <Input
                    label="Agência"
                    classNameLabel="block text-sm font-semibold text-gray-800"
                    placeholder="Agência"
                    type="tel"
                    className={
                      !formError
                        ? "block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        : classError
                    }
                    onChange={onChange}
                    value={form.agence}
                    name="agence"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800">
                  Descrição
                </label>
                <textarea
                  onChange={onChangeTextArea}
                  rows={2}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Descrição..."
                  name="description"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Tipo de conta
                </label>
                <select
                  onChange={selectTypeAccount}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  {typeList}
                </select>
              </div>
              <Button
                type="submit"
                text="Salvar"
                disabled={pendingApiCall}
                className="mt-5 w-full mb-3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
                pendingApiCall={pendingApiCall}
              ></Button>
            </Form>
          </Formik>

          {apiError && <DangerAlert text="Falha ao cadastrar a conta." />}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
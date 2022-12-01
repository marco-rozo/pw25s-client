import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICategory } from "../../commons/interfaces";
import { Button } from "../../components/Buttons";
import { Container } from "../../components/Container";
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
  const navigate = useNavigate();
  const { id } = useParams();

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

  const onSubmit = () => {
    const category: ICategory = {
      id: form.id,
      name: form.name,
    };
    setPendingApiCall(true);
    CategoryService.save(category)
      .then((response) => {
        setPendingApiCall(false);
        navigate("/categories");
      })
      .catch((responseError) => {
        if (responseError.response.data.validationErrors) {
          setErrors(responseError.response.data.validationErrors);
        }
        setPendingApiCall(false);
        setApiError(true);
      });
  };

  return (
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
          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          onChange={onChange}
          value={form.name}
          name="name"
        />
        <Button
          text="Salvar"
          disabled={pendingApiCall}
          className="mt-5 w-full mb-3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
          onClick={onSubmit}
          pendingApiCall={pendingApiCall}
        ></Button>
        {apiError && <DangerAlert text="Falha ao cadastrar a categoria." />}
      </div>
    </div>
    // <div className="container">
    //   <h1 className="text-center">Cadastro de Categoria</h1>

    //   <div className="col-12 mb-3">
    //     <Input
    //       className="form-control"
    //       name="name"
    //       label="Nome"
    //       placeholder="Informe o nome"
    //       type="text"
    //       value={form.name}
    //       onChange={onChange}
    //       hasError={errors.name ? true : false}
    //       error={errors.name}
    //     />
    //   </div>
    //   {apiError && <DangerAlert text="Falha ao cadastrar a categoria." />}
    //   <div className="text-center">
    //     <Button
    //       className="block text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    //       onClick={onSubmit}
    //       disabled={pendingApiCall ? true : false}
    //       pendingApiCall={pendingApiCall}
    //       text="Salvar"
    //     />
    //   </div>
    // </div>
  );
}

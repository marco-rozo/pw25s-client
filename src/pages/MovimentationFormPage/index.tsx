import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  IAccount,
  ICategory,
  IMovimentation,
  IMovimentationInsert,
} from "../../commons/interfaces";
import Notify from "../../commons/notify";
import { Button } from "../../components/Buttons";
import { DangerAlert } from "../../components/DangerAlert";
import { Input } from "../../components/Inputs";
import AccountService from "../../service/AccountsService";
import CategoryService from "../../service/CategoryService";
import MovementationService from "../../service/MovementationService";

export function MovimentationFormPage() {
  const [form, setForm] = useState({
    id: undefined,
    name: "",
    value: 0,
    amountPaid: 0,
    description: "",
    type: "1",
    category: { id: undefined, name: "" },
    account: { id: undefined, name: "" },
  });

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    value: 0,
    amountPaid: 0,
    description: "",
    type: "1",
    category: { id: undefined, name: "" },
    account: { id: undefined, name: "" },
  });

  const [pendingApiCall, setPendingApiCall] = useState(false);
  // apiError controla a exibição das mensagem de erro que ocorrem ao realizar uma requisição HTTP para o servidor.
  const [apiError, setApiError] = useState("");
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // lista de categorias utilizada para carregar o select
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const classError: string =
    "block border-red-400 ring-red-300 ring w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40";

  // Executa ao carregar o componente
  useEffect(() => {
    // Busca a lista de categorias
    AccountService.findAll()
      .then((response) => {
        // caso sucesso, adiciona a lista no state
        setAccounts(response.data);

        CategoryService.findAll()
          .then((response) => {
            // caso sucesso, adiciona a lista no state
            setCategories(response.data);
            if (id) {
              // ao editar um produto, busca ele no back-end e carrega no objeto form que está no state.
              MovementationService.findById(parseInt(id))
                .then((response) => {
                  if (response.data) {
                    setForm({
                      id: response.data.id,
                      name: response.data.name,
                      value: response.data.value,
                      amountPaid: response.data.amountPaid,
                      description: response.data.description,
                      category: { id: response.data.category.id, name: "" },
                      account: { id: response.data.account.id, name: "" },
                      type: response.data.type,
                    });
                    setApiError("");
                  } else {
                    Notify.error("Erro ao carregar a movimentação.");
                    setApiError("Falha ao carregar a movimentação");
                  }
                })
                .catch((erro) => {
                  Notify.error("Erro ao carregar a movimentação.");
                  setApiError("Falha ao carregar o movimentação");
                });
            } else {
              // ao cadastrar um novo produto, valoriza no objeto form a primeira categoria do select
              setForm((previousForm) => {
                return {
                  ...previousForm,
                  category: { id: response.data[0].id, name: "" },
                };
              });
            }
          })
          .catch((erro) => {
            Notify.error("Erro ao carregar a combo de categorias.");
            setApiError("Falha ao carregar a combo de categorias.");
          });
      })
      .catch((erro) => {
        Notify.error("Erro ao carregar a combo de contas.");
        setApiError("Falha ao carregar a combo de contas.");
      });
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

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((previousForm) => {
      return {
        ...previousForm,
        ["description"]: e.target.value,
      };
    });
  };

  //Função utilizada para controlar as alterações no Select (para enviar a categoria ao servidor é necessário enviar o json no formato= categoria: {id: valor} )
  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: { id: value },
      };
    });
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined,
      };
    });
  };

  const onSubmit = () => {
    debugger;
    const movimentation: IMovimentationInsert = {
      accountId: form.account!.id,
      categoryId: form.category!.id,
      value: Number(form.value),
      amountPaid: Number(form.amountPaid),
      type: form.type,
      description: form.description,
    };
    setPendingApiCall(true);
    MovementationService.save(movimentation)
      .then((response) => {
        setPendingApiCall(false);
        navigate("/movimentation");
      })
      .catch((responseError) => {
        if (responseError.response.data.validationErrors) {
          setErrors(responseError.response.data.validationErrors);
        }
        Notify.error("Erro ao cadastrar movimentação");
        setPendingApiCall(false);
        setApiError(responseError);
      });
  };

  return (
    <>
      <div className="mt-8 w-full relative flex flex-col justify-center overflow-hidden items-center">
        <div className="w-4/5 md:w-1/2">
          <h1 className="text-3xl mb-5 font-bold tex90t-center text-purple-700">
            Cadastro de Movimentação
          </h1>
          <div className="mt-4 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <Input
                label="Valor"
                classNameLabel="block text-sm font-semibold text-gray-800"
                placeholder="Valor"
                type="number"
                className={
                  !errors.value
                    ? "block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    : classError
                }
                onChange={onChange}
                value={form.value.toString()}
                name="value"
              />
            </div>
            <div>
              <Input
                label="Valor do pagamento"
                classNameLabel="block text-sm font-semibold text-gray-800"
                placeholder="Valor"
                type="number"
                className={
                  !errors.value
                    ? "block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    : classError
                }
                onChange={onChange}
                value={form.amountPaid.toString()}
                name="amountPaid"
              />
            </div>
          </div>
          <div className="mt-4 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Categoria
              </label>
              <select
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="category"
                value={form.category.id}
                onChange={onChangeSelect}
              >
                {/* Monta a lista de options do Select de acordo com a lista de categorias vindas do servidor */}
                {categories.map((category: ICategory) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Conta
              </label>
              <select
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="account"
                value={form.account.id}
                onChange={onChangeSelect}
              >
                {/* Monta a lista de options do Select de acordo com a lista de contas vindas do servidor */}
                {accounts.map((account: IAccount) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
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
              value={form.description}
            ></textarea>
          </div>
          <Button
            type="submit"
            text="Salvar"
            disabled={pendingApiCall}
            className="w-full mb-3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
            pendingApiCall={pendingApiCall}
            onClick={onSubmit}
          ></Button>
          {apiError && (
            <DangerAlert text="Falha ao cadastrar a movimentação." />
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

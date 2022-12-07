import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAccount, IMovimentation } from "../../commons/interfaces";
import { Table } from "flowbite-react";
import { DangerAlert } from "../../components/DangerAlert";
import Notify from "../../commons/notify";
import { ToastContainer } from "react-toastify";
import MovementationService from "../../service/MovementationService";
import moment from "moment";

export function MovimentationListPage() {
  const [data, setData] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const formatMoney = (val: string) => {
    return '$' + Number(val).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  }
  const formatData = (data: string) => {
    return moment(data).format("DD-MM-YYYY HH:mm:ss");
  };

  const loadData = () => {
    MovementationService.findAll()
      .then((response) => {
        setData(response.data);
        setApiError("");
      })
      .catch((responseError) => {
        setApiError("Falha ao carregar movimentações.");
      });
  };

  const onClickRemove = (id?: number) => {
    if (id) {
      MovementationService.remove(id)
        .then((response) => {
          loadData();
          Notify.success("Sucesso ao remover o registro.");
          setApiError("");
        })
        .catch((responseError) => {
          Notify.error("Falha ao remover o registro.");
          setApiError("Falha ao remover o registro.");
        });
    }
  };

  return (
    <div>
      <div className="mt-5 container flex flex-col justify-center items-center sm:mx-10">
        <div className="w-full md:w-10/12 flex justify-center items-center flex-col md:flex-row md:items-start md:justify-between">
          <h1 className="text-3xl mb-5 font-bold text-center text-purple-700">
            Listagem de Movimentações
          </h1>
          <button
            className="block text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
          >
            <Link to="/movimentation/new">Nova Movimentação</Link>
          </button>
        </div>

        {apiError && <DangerAlert text={apiError} />}
        <div className="w-full md:w-10/12 mt-5">
          <Table className="w-full table-fixed" striped={true} hoverable={true}>
            <Table.Head>
              <Table.HeadCell className="w-1/12 px-6 py-2 text-xs text-gray-500 col whitespace-nowrap">
                #
              </Table.HeadCell>
              <Table.HeadCell className="text-center w-2/12 md:w-3/12 px-6 py-2 text-xs text-gray-500 col">
                Valor Pago
              </Table.HeadCell>
              <Table.HeadCell className="text-center w-2/12 md:w-3/12 px-6 py-2 text-xs text-gray-500 col">
                Valor Original
              </Table.HeadCell>
              <Table.HeadCell className="text-center w-2/12 md:w-3/12 px-6 py-2 text-xs text-gray-500 col">
                CategoriaCompra
              </Table.HeadCell>
              <Table.HeadCell className="text-center w-2/12 md:w-3/12 px-6 py-2 text-xs text-gray-500 col">
                Conta
              </Table.HeadCell>
              <Table.HeadCell className="text-center w-2/12 md:w-3/12 px-6 py-2 text-xs text-gray-500 col">
                Data
              </Table.HeadCell>
              <Table.HeadCell className="text-center w-3/12 px-6 py-2 text-xs text-gray-500 text-center	">
                Options
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((movimentation: IMovimentation) => (
                <Table.Row
                  key={movimentation.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {movimentation.id}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {formatMoney(movimentation.amountPaid)}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {formatMoney(movimentation.value)}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                  {movimentation.category!.name}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {movimentation.account!.name}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {formatData(movimentation.dtDue)}
                  </Table.Cell>
                  
                  <Table.Cell className="text-center">
                    <Link
                      className="cursor-pointer uppercase mr-1 text-xs bg-blue-100 py-2 pl-3 pr-4 text-blue-600 hover:text-blue-800 hover:bg-blue-300 rounded"
                      to={`/movimentation/${movimentation.id}`}
                    >
                      editar
                    </Link>
                    <a
                      className="cursor-pointer uppercase ml-1 text-xs bg-red-100 py-2 pl-3 pr-4 text-red-600 hover:text-red-800 hover:bg-red-300 rounded"
                      onClick={() => onClickRemove(movimentation.id)}
                    >
                      remover
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
/* <h1 className="text-center">Lista de Categoria</h1>
      <div className="text-center">
        <Link className="btn btn-success" to="/categories/new">
          Nova Categoria
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <td>#</td>
            <td>Nome</td>
            <td>Editar</td>
            <td>Remover</td>
          </tr>
        </thead>
        <tbody>
          {data.map((movimentation: ICategory) => (
            <tr key={movimentation.id}>
              <td>{movimentation.id}</td>
              <td>{movimentation.name}</td>
              <td>
                <Link
                  className="btn btn-primary"
                  to={`/categories/${movimentation.id}`}
                >
                  Editar
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onClickRemove(movimentation.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>  */

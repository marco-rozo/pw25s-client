import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICategory } from "../../commons/interfaces";
import CategoryService from "../../service/CategoryService";
import { Table } from "flowbite-react";
import { Container } from "../../components/Container";
import { Button } from "../../components/Buttons";
import { DangerAlert } from "../../components/DangerAlert";

export function CategoryListPage() {
  const [data, setData] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    CategoryService.findAll()
      .then((response) => {
        setData(response.data);
        setApiError("");
      })
      .catch((responseError) => {
        setApiError("Falha ao carregar categorias.");
      });
  };

  const onClickRemove = (id?: number) => {
    if (id) {
      CategoryService.remove(id)
        .then((response) => {
          loadData();
          setApiError("");
        })
        .catch((responseError) => {
          setApiError("Falha ao remover o registro.");
        });
    }
  };

  return (
    <div>
      <div className="mt-5 container flex flex-col justify-center items-center md:mx-10">
        <div className="w-full md:w-11/12 flex justify-center items-center flex-col md:flex-row md:items-start md:justify-between">
          <h1 className="text-3xl mb-5 font-bold text-center text-purple-700">
            Listagem de Categoria
          </h1>
          <button
            className="block text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
          >
            <Link to="/categories/new">Nova Categoria</Link>
          </button>
        </div>

        {apiError && <DangerAlert text={apiError} />}
        <div className="w-full md:w-11/12 mt-5 mb-5">
          <Table className="w-full table-fixed" striped={true} hoverable={true}>
            <Table.Head>
              <Table.HeadCell className="w-1/12 px-6 py-2 text-xs text-gray-500 col whitespace-nowrap">
                #
              </Table.HeadCell>
              <Table.HeadCell className="w-4/12 md:w-6/12 px-6 py-2 text-xs text-gray-500 col">
                Name
              </Table.HeadCell>
              <Table.HeadCell className="w-3/12 px-6 py-2 text-xs text-gray-500 text-center	">
                Options
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((category: ICategory) => (
                <Table.Row
                  key={category.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {category.id}
                  </Table.Cell>
                  <Table.Cell>{category.name}</Table.Cell>
                  <Table.Cell className="text-center">
                    <Link
                      className="cursor-pointer uppercase mr-1 text-xs bg-blue-100 py-2 pl-3 pr-4 text-blue-600 hover:text-blue-800 hover:bg-blue-300 rounded"
                      to={`/categories/${category.id}`}
                    >
                      editar
                    </Link>
                    <a
                      className="cursor-pointer uppercase ml-1 text-xs bg-red-100 py-2 pl-3 pr-4 text-red-600 hover:text-red-800 hover:bg-red-300 rounded"
                      onClick={() => onClickRemove(category.id)}
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
          {data.map((category: ICategory) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Link
                  className="btn btn-primary"
                  to={`/categories/${category.id}`}
                >
                  Editar
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onClickRemove(category.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>  */

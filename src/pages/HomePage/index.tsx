import { useEffect, useState } from "react";
import DashboardService from "../../service/DashboardService";

export function HomePage() {
  const [data, setData] = useState({
    valueTotalReceipts: 0.0,
    valueTotalReceived: 0.0,
    valueRemainingReceipts: 0.0,
    numReceipts: 0,
    valueTotalExpenses: 0.0,
    valueTotalExpensesPaid: 0.0,
    valueRemainingExpenses: 0.0,
    numExpenses: 0,
    balance: 0.0,
  });

  const [apiError, setApiError] = useState("");

  useEffect(() => {
    DashboardService.findData()
      .then((response) => {
        debugger;
        if (response.data) {
          setData({
            balance: response.data.balance,
            numExpenses: response.data.numExpenses,
            numReceipts: response.data.numReceipts,
            valueRemainingExpenses: response.data.valueRemainingExpenses,
            valueRemainingReceipts: response.data.valueRemainingReceipts,
            valueTotalExpenses: response.data.valueTotalExpenses,
            valueTotalExpensesPaid: response.data.valueTotalExpensesPaid,
            valueTotalReceipts: response.data.valueTotalReceipts,
            valueTotalReceived: response.data.valueTotalReceived,
          });
        }
        setApiError("");
      })
      .catch((responseError) => {
        setApiError("Falha ao carregar dados da Dashboard.");
      });
  }, []);

  return (
    <div className="mt-5 container flex flex-col md:flex-row justify-center items-start md:mx-10">
      <div className="w-1/3 block ml-2 mr-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-500">
          Saídas
        </h5>
        <p className="font-normal text-gray-500">
          Número total de saídas: {data.numExpenses}
          <br />
          Valor total de saídas: {data.valueTotalExpenses}
          <br />
          Valor total de saídas pagas: {data.valueTotalExpensesPaid}
          <br />
          Valor total de saídas restantes: {data.valueRemainingExpenses}
          <br />
        </p>
      </div>
      <div className="w-1/3 block ml-2 mr-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-500">
          Entradas
        </h5>
        <p className="font-normal text-gray-500">
          Número total de entradas: {data.numReceipts}
          <br />
          Valor total de entradas: {data.valueTotalReceipts}
          <br />
          Valor total de entradas recebidas: {data.valueTotalReceived}
          <br />
          Valor total de entradas restantes: {data.valueRemainingReceipts}
          <br />
        </p>
      </div>
      <div className="w-1/3 block ml-2 mr-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-500">
          Saldo
        </h5>
        <h1 className="font-bold text-gray-700">{data.balance}</h1>
      </div>
    </div>
  );
}

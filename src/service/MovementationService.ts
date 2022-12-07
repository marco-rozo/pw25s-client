import { IAccount } from "../commons/interfaces";
import { api } from "../lib/axios";

const save = (account: IAccount) => {
  return api.post("/movimentation", account);
};

const findAll = () => {
  return api.get("/movimentation");
};

const remove = (id: number) => {
  return api.delete(`/movimentation/${id}`);
};

const findById = (id: number) => {
  return api.get(`/movimentation/${id}`);
};

const MovementationService = {
  save,
  findAll,
  remove,
  findById,
};

export default MovementationService;

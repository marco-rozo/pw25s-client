import { IMovimentationInsert } from "../commons/interfaces";
import { api } from "../lib/axios";

const save = (account: IMovimentationInsert) => {
  return api.post("/movimentation", account);
};

const update = (account: IMovimentationInsert) => {
  return api.put("/movimentation", account);
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
  update,
  findAll,
  remove,
  findById,
};

export default MovementationService;

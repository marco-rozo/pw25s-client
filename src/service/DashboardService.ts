import { api } from "../lib/axios";

const findData = () => {
  return api.get("/dashboard");
};

const DashboardService = {
  findData,
};

export default DashboardService;

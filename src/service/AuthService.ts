import { IUserLogin, IUserSignUp } from "../commons/interfaces";
import { api } from "../lib/axios";

const signup = (user: IUserSignUp) => {
  debugger;
  return api.post("/users", user);
};

const login = (user: IUserLogin) => {
  debugger;
  return api.post("/login", user);
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

const AuthService = {
  signup,
  login,
  isAuthenticated
};

export default AuthService;

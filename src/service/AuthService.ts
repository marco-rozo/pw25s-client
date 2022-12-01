import { useEffect } from "react";
import { IUserLogin, IUserSignUp } from "../commons/interfaces";
import { api } from "../lib/axios";

const signup = (user: IUserSignUp) => {
  return api.post("/users", user);
};

const login = (user: IUserLogin) => {
  return api.post("/login", user);
};

const logout = () => {
  localStorage.removeItem("token");
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      token
    )}`;

    validateToken().catch((err) => {
      logout();
      window.location.reload();
    });
  }

  return token ? true : false;
};

const validateToken = () => {
  return api.get("/auth");
};

const AuthService = {
  signup,
  login,
  isAuthenticated,
  logout,
  validateToken,
};

export default AuthService;

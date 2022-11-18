import AuthService from "../../service/AuthService";
import { AuthenticatedRoutes } from "../AuthenticateRoutes";
import { SignRoutes } from "../SignRoutes";

export function BaseRoutes() {
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? <AuthenticatedRoutes /> : <SignRoutes />;
}

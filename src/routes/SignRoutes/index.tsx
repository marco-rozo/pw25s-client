import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/UserLoginPage";
import { SignUpPage } from "../../pages/UserSignUpPage";

export function SignRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>

      <Route path="*" element={<LoginPage />}></Route>
    </Routes>
  );
}

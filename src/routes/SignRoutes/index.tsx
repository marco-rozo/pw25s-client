import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { SignUpPage } from "../../pages/SignUpPage";

export function SignRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>

      <Route path="*" element={<LoginPage />}></Route>
    </Routes>
  );
}

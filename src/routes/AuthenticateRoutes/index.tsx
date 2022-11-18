import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";

export function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>

      <Route path="*" element={<HomePage />}></Route>
    </Routes>
  );
}

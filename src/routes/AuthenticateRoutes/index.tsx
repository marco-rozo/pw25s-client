import { Route, Routes } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { HomePage } from "../../pages/HomePage";

export function AuthenticatedRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* página padrão (quando autenticado) é a homepage */}
        <Route path="/" element={<HomePage />}></Route>

        {/* qualquer outra rota q nao esteja definida */}
        {/*! Alterar para rota personalizada de 404 (página não encontrada) */}
        <Route path="*" element={<HomePage />}></Route>
      </Routes>
    </>
  );
}

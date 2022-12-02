import { Route, Routes } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { AccountListPage } from "../../pages/AccountListPage";
import { CategoryFormPage } from "../../pages/CategoryFormPage";
import { CategoryListPage } from "../../pages/CategoryListPage";
import { HomePage } from "../../pages/HomePage";

export function AuthenticatedRoutes() {
  return (
    <div className="md:mx-16">
      <NavBar />
      <Routes>
        {/* página padrão (quando autenticado) é a homepage */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/categories" element={<CategoryListPage />} />
        <Route path="/categories/new" element={<CategoryFormPage />} />
        <Route path="/categories/:id" element={<CategoryFormPage />} />
        <Route path="/accounts" element={<AccountListPage />} />
        <Route path="/accounts/new" element={<CategoryFormPage />} />
        <Route path="/accounts/:id" element={<CategoryFormPage />} />


        {/* qualquer outra rota q nao esteja definida */}
        {/*! Alterar para rota personalizada de 404 (página não encontrada) */}
        <Route path="*" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

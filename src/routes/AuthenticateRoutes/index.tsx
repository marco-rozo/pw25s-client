import { Route, Routes } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { AccountFormPage } from "../../pages/AccountFormPage";
import { AccountListPage } from "../../pages/AccountListPage";
import { CategoryFormPage } from "../../pages/CategoryFormPage";
import { CategoryListPage } from "../../pages/CategoryListPage";
import { HomePage } from "../../pages/HomePage";
import { MovimentationListPage } from "../../pages/MovimentationListPage";

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
        <Route path="/accounts/new" element={<AccountFormPage />} />
        <Route path="/accounts/:id" element={<AccountFormPage />} />
        <Route path="/movimentation" element={<MovimentationListPage />} />
        <Route path="/movimentation/new" element={<AccountFormPage />} />
        <Route path="/movimentation/:id" element={<AccountFormPage />} />

        {/* qualquer outra rota q nao esteja definida */}
        {/*! Alterar para rota personalizada de 404 (página não encontrada) */}
        <Route path="*" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

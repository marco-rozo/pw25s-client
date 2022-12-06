import { Navbar } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../../service/AuthService";

export function NavBar() {
  const onClickLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <Navbar fluid={true} className="bg-white">
      <Navbar.Brand href="https://github.com/marco-rozo/pw25s-client/">
        <span className="self-center text-purple-800 text-xl font-bold whitespace-nowrap">
          Wallet App
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <NavLink
          to="/"
          className={(navData) =>
            navData.isActive
              ? "font-bold py-2 pl-3 pr-4 text-purple-800 hover:text-purple-800 rounded bg-purple-100"
              : "font-semibold py-2 pl-3 pr-4 text-purple-600 hover:text-purple-800 rounded hover:bg-purple-100"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/categories"
          className={(navData) =>
            navData.isActive
              ? "font-bold py-2 pl-3 pr-4 text-purple-800 hover:text-purple-800 rounded bg-purple-100"
              : "font-semibold py-2 pl-3 pr-4 text-purple-600 hover:text-purple-800 rounded hover:bg-purple-100"
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="/accounts"
          className={(navData) =>
            navData.isActive
              ? "font-bold py-2 pl-3 pr-4 text-purple-800 hover:text-purple-800 rounded bg-purple-100"
              : "font-semibold py-2 pl-3 pr-4 text-purple-600 hover:text-purple-800 rounded hover:bg-purple-100"
          }
        >
          Accounts
        </NavLink>
        <NavLink
          to="/movements"
          className={(navData) =>
            navData.isActive
              ? "font-bold py-2 pl-3 pr-4 text-purple-800 hover:text-purple-800 rounded bg-purple-100"
              : "font-semibold py-2 pl-3 pr-4 text-purple-600 hover:text-purple-800 rounded hover:bg-purple-100"
          }
        >
          Movements
        </NavLink>

        <a
          onClick={onClickLogout}
          className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 "
        >
          Logout
        </a>

        {/* Logout */}
      </Navbar.Collapse>
    </Navbar>
  );
}

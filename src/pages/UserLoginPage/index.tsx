import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Buttons";
import { Container } from "../../components/Container";
import { Input } from "../../components/Inputs";
import AuthService from "../../service/AuthService";

export function LoginPage() {
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const onClickLogin = () => {
    setPendingApiCall(true);
    const userLogin = {
      email: form.email,
      password: form.password,
    };
    AuthService.login(userLogin)
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setPendingApiCall(false);
        console.log(response);
      })
      .catch((errorResponse) => {
        setPendingApiCall(false);
        console.log(errorResponse);
      });
  };

  return (
    <Container>
      <>
        <h1 className="text-3xl font-bold text-center text-purple-700">
          Login
        </h1>
        <div className="mb-2 mt-6">
          <Input
            label="Email"
            classNameLabel="block text-sm font-semibold text-gray-800"
            placeholder=""
            type="email"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={onChange}
            value={form.email}
            name="email"
          />
        </div>
        <div className="mb-2">
          <Input
            label="Password"
            type="password"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={onChange}
            value={form.password}
            name="password"
          />
          <a href="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <Button
              text="Login"
              disabled={pendingApiCall}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              onClick={onClickLogin}
              pendingApiCall={pendingApiCall}
            ></Button>
            {/* <Button
              disabled={pendingApiCall}
              className={
                "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              }
              onClick={onClickLogin}
            >
              {pendingApiCall ? <div>Aguarde...</div> : <p>Login</p>}
            </Button> */}
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="cursor-pointer font-medium text-purple-600 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </>
    </Container>
  );
}

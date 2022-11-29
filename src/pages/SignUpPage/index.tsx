import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";

export function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    individualRegistration: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    individualRegistration: "",
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

    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: "",
      };
    });
  };

  const onClickSignUp = () => {
    const userSignUp = {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      individualRegistration: form.individualRegistration,
      email: form.email,
      password: form.password,
    };
    AuthService.signup(userSignUp)
      .then((response) => {
        console.log(response);
        navigate("/home");
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
        if (errorResponse.response.data.validationErrors) {
          setErrors(errorResponse.response.data.validationErrors);
        }
      });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full sm:w-2/3 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-start text-purple-700 underline">
          Sign Up
        </h1>
        <div className="grid gap-6 mt-5 md:grid-cols-2">
          <div className="mb-2">
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-800"
            >
              First Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={onChange}
              value={form.firstName}
              name="firstName"
            />
            {errors.firstName && (
              <div className="text-red-700 font-extralight  text-xs">
                {errors.firstName}
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Last Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={onChange}
              value={form.lastName}
              name="lastName"
            />
            {errors.lastName && (
              <div className="text-red-700 font-extralight  text-xs">
                {errors.lastName}
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-800"
            >
              Phone
            </label>
            <input
              type="tel"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={onChange}
              value={form.phone}
              name="phone"
            />
            {errors.phone && (
              <div className="text-red-700 font-extralight  text-xs">
                {errors.phone}
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="individualRegistration"
              className="block text-sm font-semibold text-gray-800"
            >
              Individual Registration
            </label>
            <input
              type="tel"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={onChange}
              value={form.individualRegistration}
              name="individualRegistration"
            />
            {errors.individualRegistration && (
              <div className="text-red-700 font-extralight  text-xs">
                {errors.individualRegistration}
              </div>
            )}
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={onChange}
            value={form.email}
            name="email"
          />
          {errors.email && (
            <div className="text-red-700 font-extralight  text-xs">
              {errors.email}
            </div>
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={onChange}
            value={form.password}
            name="password"
          />
          {errors.password && (
            <div className="text-red-700 font-extralight text-xs">
              {errors.password}
            </div>
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Confirm Password
          </label>
          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={onChange}
            value={form.password}
            name="password"
          />
          {errors.password && (
            <div className="text-red-700 font-extralight  text-xs">
              {errors.password}
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            onClick={onClickSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md"></div>
    </div>
  );
}

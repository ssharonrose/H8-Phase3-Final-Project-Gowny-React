import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../stores/actions/actionCreator";
import logo from "../assets/Screenshot_2023-07-27_at_17.11.04-removebg-preview.png";

const LoginForm = () => {
  const inputLogin = {
    email: useRef(),
    password: useRef(),
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errorLogin } = useSelector((state) => state?.user);

  const loginSubmit = (event) => {
    event.preventDefault();
    const loginSubmit = {
      email: inputLogin.email.current.value,
      password: inputLogin.password.current.value,
    };
    dispatch(login(loginSubmit))
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error, "dariiii login");
      });
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div
          className="w-80 p-6 m-auto bg-base-100 rounded-md shadow-md lg:max-w-xl"
          style={{ background: "#EFECE9" }}
        >
          <div className="flex justify-center">
            <img
              src={logo}
              style={{ alignItems: "center", width: "90px", height: "70px" }}
            />
          </div>
          <h1
            className="text-xl font-bold text-center text-[#050505] mt-10"
            style={{ fontSize: "22px", fontFamily: "Volkhorn Semibold" }}
          >
            Login to Your Account
          </h1>
          <form onSubmit={loginSubmit} className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#050505]"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                ref={inputLogin.email}
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#efece9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#050505]"
              >
                Password
              </label>
              <input
                type="password"
                ref={inputLogin.password}
                name="password"
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#efece9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-[#050505] transition-colors duration-200 transform bg-[#DDD9CE] rounded-md hover:bg-[#AC9C8D] focus:outline-none focus:bg-[#AC9C8D]">
                Login
              </button>
            </div>

            <div className="flex items-center w-full my-4">
              <hr className="w-full border-gray-600" />
              <hr className="w-full border-gray-600" />
            </div>
            <p className="text-sm text-center font-light text-[#AC9C8D] mt-2">
              Don't have an account yet?
              <NavLink
                to="/register"
                className="font-medium ml-2 text-[#610C27] hover:underline dark:text-primary-500"
              >
                {" "}
                Sign Up{" "}
              </NavLink>
            </p>
            <NavLink to={"/"}>
              <p className="flex justify-center font-medium text-[#AC9C8D] ml-2 hover:underline dark:text-primary-500 mt-5">
                Back to HomePage
              </p>
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginForm;

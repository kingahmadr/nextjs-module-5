"use client";

import { useFormik } from "formik";
import { UserProps } from "../interfaces";
import tailwindStyles from "../scripts/constans/styles";
import { LoginValidationForm } from "../modules/Schema";
import { useEffect, useState } from "react";
import { userAuth } from "../api";
import { UseDataContext } from "../contexts/UseDataContext";
import { RotatingLoader } from "./Loader/NewLoader";

interface LoginProps extends UserProps {
  username?: string;
}
const LoginForm = () => {
  const { isLoading, setLoadingState } = UseDataContext();
  const [checked, setChecked] = useState<boolean>(false);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    const valueRememberMe = localStorage.getItem("rememberMe");
    if (valueRememberMe) {
      setChecked(true);
    }
  }, []);
  // const { isLoading, userAuth } = useFecthData();

  const handleSubmit = async (data: LoginProps, isChecked: boolean) => {
    async function loader(value: boolean) {
      setLoadingState(value);
      await delay(2000);
    }

    const login = async () => {
      await loader(true)
        .then(async () => {
          const result = await userAuth(data, isChecked);
          if (result) {
            window.location.href = "/";
          }
        })
        .then(() => {
          loader(false);
        });
    };
    login();
  };
  const handleCheckBox = () => {
    setChecked(!checked);
    console.log("checked", checked);
  };
  const formik = useFormik<LoginProps>({
    initialValues: {
      username: "",
      password: "", // Password nya gak boleh yang susah bray
    },
    validationSchema: LoginValidationForm,
    onSubmit: (values, { setSubmitting }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...dataToSubmit } = values;
      // console.log(confirmPassword)
      setTimeout(() => {
        handleSubmit(dataToSubmit, checked);
        setSubmitting(false);
        // console.log(dataToSubmit);
      }, 400);
    },
  });
  return (
    <>
      {/* <Navbar /> */}
      <section className="flex flex-col items-center gap-10">
        {isLoading ? (
          <div className="mt-20">
            <RotatingLoader />
          </div>
        ) : (
          <>
            <h1 className="text-5xl text-white text-center mt-20">
              Login Form
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white border-2 border-gray-300 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
              <label
                className="text-lg font-semibold text-gray-900"
                htmlFor="username"
              >
                username
              </label>
              <input
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username ? (
                <div className={tailwindStyles.errorText}>
                  {formik.errors.username}
                </div>
              ) : null}
              <label
                className="text-lg font-semibold text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className={tailwindStyles.errorText}>
                  {formik.errors.password}
                </div>
              ) : null}
              <label htmlFor="checkbox" className="inline-flex items-center">
                <input
                  id="checkbox"
                  name="checkbox"
                  type="checkbox"
                  checked={checked}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  onChange={handleCheckBox}
                />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label>
              <button
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Login
              </button>
            </form>
          </>
        )}
      </section>
    </>
  );
};

export default LoginForm;

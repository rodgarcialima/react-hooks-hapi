import React, { useState, useContext, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classnames from "classnames";

// Local
import { GlobalContext } from "App";
import { ACTION_LOGIN } from "reducer/actions/auth";
import { noCredentials } from "helpers/axios";

export const Login = ({ history }) => {
  const { dispatch } = useContext(GlobalContext);
  const [error, setError] = useState();
  const emailInputRef = useRef(null);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is a required field"),
    password: Yup.string().required("Password is a required field")
  });

  const formSubmit = (values, { setSubmitting }) => {
    noCredentials
      .post("/login", values)
      .then(({ data }) => {
        setError(); // clear error
        dispatch({ type: ACTION_LOGIN, payload: data });
        setSubmitting(false);
        history.push("/admin");
      })
      .catch(err => {
        console.log(err);
        emailInputRef.current.select();
        emailInputRef.current.focus();
        setError("Invalid credentials");
        setSubmitting(false);
      });
  };

  return (
    <div
      id="container"
      className="flex flex-col justify-center h-full min-h-full bg-theme-menu"
    >
      <div className="self-center w-full max-w-sm">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={formSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  innerRef={emailInputRef}
                  className={classnames(
                    "shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline",
                    {
                      "border-red": touched.email && errors.email
                    }
                  )}
                  type="email"
                  name="email"
                  autoFocus
                />
                {touched.email && errors.email && (
                  <div className="mt-3 text-red text-xs italic">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  className={classnames(
                    "shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline",
                    { "border-red": touched.password && errors.password }
                  )}
                  type="password"
                  name="password"
                  placeholder="**************"
                />
                {touched.password && errors.password && (
                  <div className="text-red text-xs italic">
                    {errors.password}
                  </div>
                )}

                {/* <p className="text-red text-xs italic">Please choose a password.</p> */}
                {error && <div className="text-red mb-2 italic">{error}</div>}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                  href="_blank"
                >
                  Forgot Password?
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withRouter(Login);

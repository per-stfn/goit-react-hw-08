import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import css from "./LoginPage.module.css";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.loginForm}>
        <h1>Please log in</h1>
        <label htmlFor="emailId" className={css.labelLogin}>
          Email:
        </label>
        <Field
          type="email"
          name="email"
          id="emailId"
          autoComplete="email"
          className={css.inputLogin}
        />
        <ErrorMessage className={css.error} component="p" name="email" />
        <label htmlFor="passwordId" className={css.labelLogin}>
          Password:
        </label>
        <Field
          type="password"
          name="password"
          id="passwordId"
          autoComplete="current-password"
          className={css.inputLogin}
        />
        <ErrorMessage className={css.error} component="p" name="password" />
        <button type="submit" className={css.loginBtn}>
          Log in
        </button>
      </Form>
    </Formik>
  );
}

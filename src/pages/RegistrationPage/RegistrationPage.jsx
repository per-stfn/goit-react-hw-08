import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import css from "./RegistrationPage.module.css";

const RegisterSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegistraionPage() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .then(() => {
        toast.success("Registration successful");
        actions.resetForm();
      })
      .catch((error) => {
        toast.error("Registration failed: " + error.message);
      });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.registerForm}>
        <h1>Register your account</h1>
        <label htmlFor="nameId" className={css.registerLabel}>
          Username:
        </label>
        <Field
          type="text"
          name="name"
          id="nameId"
          className={css.registerInput}
        />
        <ErrorMessage name="name" component="p" className={css.error} />
        <label htmlFor="emailId" className={css.registerLabel}>
          Email:
        </label>
        <Field
          type="email"
          name="email"
          id="emailId"
          className={css.registerInput}
        />
        <ErrorMessage name="email" component="p" className={css.error} />
        <label htmlFor="passwordId" className={css.registerLabel}>
          Password:
        </label>
        <Field
          type="password"
          name="password"
          id="passwordId"
          className={css.registerInput}
        />
        <ErrorMessage name="password" component="p" className={css.error} />
        <button type="submit" className={css.registerBtn}>
          Register
        </button>
      </Form>
    </Formik>
  );
}

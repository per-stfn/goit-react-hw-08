import { logIn } from "../../redux/auth/operations";
import { LuLogIn } from "react-icons/lu";
import s from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().required("Field required"),
  password: Yup.string().trim().required("Field required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    email: location.state?.email ?? "",
    password: location.state?.password ?? "",
  };

  const handleSubmit = (values) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Logged in");
        navigate("/contacts", { replace: true });
      })
      .catch(() => {
        toast.error("Oops! Something went wrong");
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      <Form className={s.form}>
        <label className={s.label}>
          Email
          <Field type="text" name="email" />
          <ErrorMessage name="email" component="span" className={s.error} />
        </label>
        <label className={s.label}>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="span" className={s.error} />
        </label>
        <button type="submit" className={s.submitBtn}>
          <LuLogIn /> Log In
        </button>
      </Form>
    </Formik>
  );
}

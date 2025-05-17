import s from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Field required"),
  email: Yup.string().trim().required("Field required"),
  password: Yup.string().trim().required("Field required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success("Registered successfully");
        navigate("/login", { replace: true, state: { ...values } });
      })
      .catch(() => {
        toast.error("User is already exist");
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      <Form className={s.form}>
        <label className={s.label}>
          Username
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="span" className={s.error} />
        </label>
        <label className={s.label}>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="span" className={s.error} />
        </label>
        <label className={s.label}>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="span" className={s.error} />
        </label>
        <button className={s.submitBtn}>Register</button>
      </Form>
    </Formik>
  );
}

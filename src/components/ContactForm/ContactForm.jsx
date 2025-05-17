import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./ContactForm.module.css";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const startValues = {
  name: "",
  number: "",
};

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Required"),
  number: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        ...values,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("New contact added!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={startValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={s.form}>
        <label className={s.label}>
          Name
          <Field name="name" />
          <ErrorMessage className={s.errorMessage} name="name" component="p" />
        </label>
        <label className={s.label}>
          Number
          <Field name="number" type="tel" />
          <ErrorMessage
            className={s.errorMessage}
            name="number"
            component="p"
          />
        </label>
        <button className={s.submitButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

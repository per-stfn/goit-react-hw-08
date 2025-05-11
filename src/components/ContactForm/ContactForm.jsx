import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import css from "./ContactForm.module.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!!!"),
  number: Yup.string()
    .trim()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!!!"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast.success("Contact added successfully");
      })
      .catch((error) => {
        toast.error("Failed to add contact: " + error.message);
      });
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ name: "", number: "" }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.contactForm}>
          <label className={css.contactLabel} htmlFor="name">
            Name
          </label>
          <Field
            className={css.contactInput}
            type="text"
            name="name"
            id="name"
          />
          <ErrorMessage className={css.error} name="name" component="div" />

          <label className={css.contactLabel} htmlFor="number">
            Number
          </label>
          <Field
            className={css.contactInput}
            type="text"
            name="number"
            id="number"
          />
          <ErrorMessage className={css.error} name="number" component="div" />

          <button className={css.addContactBtn} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
      <Toaster />\
    </>
  );
}

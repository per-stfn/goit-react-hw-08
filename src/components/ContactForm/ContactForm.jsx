import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import { addContactThunk } from "../../redux/contacts/operations";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short! Min 3 symbols!")
    .max(50, "Too long! Max 50 symbols!")
    .required("Required!"),
  number: Yup.string()
    .min(3, "Too short! Min 3 symbols!")
    .max(50, "Too long! Max 50 symbols!")
    .required("Required!"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContactThunk(values))
      .unwrap()
      .then(() => {
        toast.success("New contact added successfully!");
      })
      .catch(() => {
        toast.error("Failed to add new contact! Try it later!");
      });
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form>
          <label htmlFor="name" className={styles.formLabel}>
            Name:
            <Field
              id={nanoid()}
              type="text"
              name="name"
              className={styles.inputField}
            />
          </label>
          <ErrorMessage
            name="name"
            component="span"
            className={styles.errorMessage}
          />

          <label htmlFor="number" className={styles.formLabel}>
            Number:
            <Field
              id={nanoid()}
              type="text"
              name="number"
              className={styles.inputField}
            />
          </label>
          <ErrorMessage
            name="number"
            component="span"
            className={styles.errorMessage}
          />

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;

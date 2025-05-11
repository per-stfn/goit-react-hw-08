import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./Contact.module.css";
import { IoAccessibility, IoCall } from "react-icons/io5";

import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  deleteContactThunk,
  updateContactThunk,
} from "../../redux/contacts/operations";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContactThunk(id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully!");
        setIsModalOpen(false);
      })
      .catch(() => {
        toast.error("Failed to delete contact! Try again later.");
        setIsModalOpen(false);
      });
  };

  const handleUpdate = (values) => {
    dispatch(updateContactThunk({ id, body: values }))
      .unwrap()
      .then(() => {
        toast.success("Contact updated successfully!");
        setIsEditMode(false);
      })
      .catch(() => {
        toast.error("Failed to update contact! Try again later.");
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short! Min 3 symbols!")
      .max(50, "Too long! Max 50 symbols!")
      .required("Required!"),
    number: Yup.string()
      .min(3, "Too short! Min 3 symbols!")
      .max(50, "Too long! Max 50 symbols!")
      .required("Required!"),
  });

  return (
    <div className={styles.cardWrap}>
      <div className={styles.textWrap}>
        {isEditMode ? (
          <Formik
            initialValues={{ name, number }}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            <Form className={styles.editForm}>
              <label htmlFor="name" className={styles.formLabel}>
                Name:
                <Field type="text" name="name" className={styles.inputField} />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={styles.errorMessage}
                />
              </label>

              <label htmlFor="number" className={styles.formLabel}>
                Number:
                <Field
                  type="text"
                  name="number"
                  className={styles.inputField}
                />
                <ErrorMessage
                  name="number"
                  component="span"
                  className={styles.errorMessage}
                />
              </label>

              <button type="submit" className={styles.confirmButton}>
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </Form>
          </Formik>
        ) : (
          <>
            <span className={styles.name}>
              <IoAccessibility />
              {name}
            </span>
            <span className={styles.number}>
              <IoCall />
              {number}
            </span>
          </>
        )}
      </div>
      <div>
        <button
          type="button"
          className={styles.button}
          onClick={() => setIsEditMode(true)}
        >
          Edit
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => setIsModalOpen(true)}
        >
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete this contact?</p>
            <button onClick={handleDelete} className={styles.confirmButton}>
              Yes
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className={styles.cancelButton}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;

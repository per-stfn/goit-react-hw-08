import { FaUserAlt } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { deleteContact } from "../../redux/contacts/operations";
import { changeContact } from "../../redux/contacts/operations"; // Імпортуємо функцію зміни контакту
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";

Modal.setAppElement("#root");

export default function Contact({ contactData }) {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContactData, setNewContactData] = useState(contactData);

  const handleDelete = () => setIsModalOpen(true);
  const handleConfirm = () => {
    dispatch(deleteContact(contactData.id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully");
      })
      .catch((error) => {
        toast.error("Failed to delete contact: " + error.message);
      });
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={css.paragraphsWrapper}>
        <p className={css.contactParagraph}>
          <FaUserAlt className={css.contactIcon} size="20" />
          <input
            type="text"
            name="name"
            value={newContactData.name}
            onChange={handleChange}
            className={css.changeContact}
          />
        </p>
        <p className={css.contactParagraph}>
          <IoCall className={css.contactIcon} size="20" />
          <input
            type="text"
            name="number"
            value={newContactData.number}
            onChange={handleChange}
            className={css.changeContact}
          />
        </p>
      </div>
      <div className={css.buttonWrapper}>
        <button className={css.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </div>
      <Modal
        className={css.modal}
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
      >
        <p className={css.paragraph}>
          Are you sure you want to delete this contact?
        </p>
        <div>
          <button className={css.actionBtn} onClick={handleConfirm}>
            Confirm
          </button>
          <button className={css.actionBtn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </Modal>
      <Toaster />
    </>
  );
}

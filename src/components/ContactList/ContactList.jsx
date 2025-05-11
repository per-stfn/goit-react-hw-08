import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import { useEffect } from "react";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { slideInFromRight } from "../../motion/motion";

import { fetchContacts } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/filters/slice";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (filteredContacts.length === 0) {
    return <p>Немає контактів для відображення.</p>;
  }

  return (
    <ul className={styles.contactList}>
      <AnimatePresence>
        {filteredContacts.map((item, idx) => (
          <motion.li
            initial="hidden"
            animate="visible"
            variants={slideInFromRight(idx * 0.4)}
            key={item.id}
            className={styles.contactItem}
          >
            <Contact name={item.name} number={item.number} id={item.id} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default ContactList;

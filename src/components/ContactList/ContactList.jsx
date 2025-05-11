import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contacts/slice";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contactsData = useSelector(selectFilteredContacts);
  return (
    <ul className={css.contactList}>
      {contactsData.map((contactData) => (
        <li className={css.contactListItem} key={contactData.id}>
          <Contact contactData={contactData} />
        </li>
      ))}
    </ul>
  );
}

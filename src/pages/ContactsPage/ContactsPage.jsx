import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/operations";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import {
  selectLoading,
  selectError,
  selectContacts,
} from "../../redux/contacts/selectors";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  return (
    <>
      <h1 className={css.phonebookTitle}>Phonebook</h1>
      <ContactForm />
      {contacts.length > 0 && <SearchBox />}
      {contacts.length > 0 && <ContactList />}
      {error && <Error />}
      {loading && <Loader />}
    </>
  );
}

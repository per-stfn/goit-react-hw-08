import css from "./HomePage.module.css";
export default function HomePage() {
  return (
    <div className={css.wrapper}>
      <p className={css.paragraph}>
        Welcome to our Contact Management System! After logging in, you gain
        access to a suite of features that enable you to:
      </p>
      <ul className={css.list}>
        <li className={css.listItem}>
          Add New Contacts: Easily add new contacts to your address book with
          our intuitive form.
        </li>
        <li className={css.listItem}>
          Delete Contacts: Keep your contact list up-to-date by removing any
          outdated or unnecessary contacts with just a few clicks.
        </li>
        <li className={css.listItem}>
          Search Contacts: Quickly find specific contacts using our powerful
          search functionality.
        </li>
      </ul>
      <p className={css.paragraph}>
        Experience the convenience of having all your important contacts
        organized and accessible in one place.
      </p>
    </div>
  );
}

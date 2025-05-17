import { FaTasks } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import s from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={s.headerContainer}>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <h1 className={s.header}>The contact manager is ready for you</h1>
      <FaTasks className={s.icon} />
    </div>
  );
}

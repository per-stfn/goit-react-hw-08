import { NavLink } from "react-router";
import { LuLogIn } from "react-icons/lu";
import { MdCreate } from "react-icons/md";
import s from "./AuthNav.module.css";
import clsx from "clsx";

const classBuilder = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

export default function AuthNav() {
  return (
    <div className={s.linksContainer}>
      <NavLink to="/register" className={classBuilder}>
        <MdCreate /> Register
      </NavLink>
      <NavLink to="/login" className={classBuilder}>
        <LuLogIn /> Log In
      </NavLink>
    </div>
  );
}

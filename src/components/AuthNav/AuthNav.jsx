import clsx from "clsx";
import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };
  return (
    <div>
      <NavLink className={buildLinkClass} to="/login">
        Login
      </NavLink>
      <NavLink className={buildLinkClass} to="/registration">
        Registration
      </NavLink>
    </div>
  );
};

export default AuthNav;

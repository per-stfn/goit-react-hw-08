import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

import css from "./UserMenu.module.css";
import { logout } from "../../redux/auth/operations";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch(logout());
  };
  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user}</p>
      <button className={css.button} type="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}

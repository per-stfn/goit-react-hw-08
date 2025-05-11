import { useDispatch, useSelector } from "react-redux";
import {
  changeNameFilter,
  changeNumberFilter,
} from "../../redux/filters/slice";
import {
  selectNameFilter,
  selectNumberFilter,
} from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);
  const numberFilter = useSelector(selectNumberFilter);

  const handleNameSearch = (event) => {
    dispatch(changeNameFilter(event.target.value));
  };

  const handleNumberSearch = (event) => {
    dispatch(changeNumberFilter(event.target.value));
  };

  return (
    <div className={css.searchBoxWrapper}>
      <div className={css.wrapper}>
        <p className={css.searchParagraph}>Find contacts by name</p>
        <input
          className={css.searchInput}
          type="text"
          value={nameFilter}
          onChange={handleNameSearch}
        />
      </div>
      <div className={css.wrapper}>
        <p className={css.searchParagraph}>Find contacts by number</p>
        <input
          className={css.searchInput}
          type="text"
          value={numberFilter}
          onChange={handleNumberSearch}
        />
      </div>
    </div>
  );
}

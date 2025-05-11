import css from "./Error.module.css";

export default function Error() {
  return (
    <p className={css.errorParagraph}>
      Oops, there was an error. Please reload!!!
    </p>
  );
}

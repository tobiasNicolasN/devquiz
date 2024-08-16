import { ILangButtonsProps, Language } from "../interfaces/types";
import style from "../styles/LangButtons.module.css";

function LangButtons({ lang, setLanguage }: ILangButtonsProps) {
  return (
    <div className={style.selectLanguage}>
      <button
        className={`${style.languageButton} ${lang ? style.selected : ""}`}
        onClick={() => setLanguage(Language[0])}
      >
        Español
      </button>
      <button
        className={`${style.languageButton} ${lang ? "" : style.selected}`}
        onClick={() => setLanguage(Language[1])}
      >
        English
      </button>
    </div>
  );
}

export default LangButtons;

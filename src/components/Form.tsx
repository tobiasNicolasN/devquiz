import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IFormData, IFormProps } from "../interfaces/types";
import { sendScoreData } from "../api/api";
import style from '../styles/Form.module.css'
import Button from "./Button";

function Form({ score, lang, setSended }: IFormProps) {
  const { register, handleSubmit, setValue } = useForm<IFormData>();

  useEffect(() => {
    setValue("score", score);
  }, []);

  const onSubmit = (data: IFormData) => {
    sendScoreData(data);
    setSended(true)
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={style.formText}>
        {lang
          ? `¡Gracias por participar! Tu puntaje ha sido de ${score}. ¡Sube tu puntaje para asegurar tu lugar en la tabla de posiciones!`
          : `Thank you for participating! Your score has been ${score}. Increase your score to secure your place on the leaderboard!`}
      </p>
      <input
        className={style.input}
        type="text"
        placeholder={lang ? "Nombre" : "Name"}
        {...register("name", { required: true })}
      />
      <Button type="submit">{lang ? "Subir Puntaje" : "Submit Score"}</Button>
    </form>
  );
}

export default Form;

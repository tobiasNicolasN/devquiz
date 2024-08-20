import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IFormData, IFormProps } from "../interfaces/types";
import { sendScoreData } from "../api/api";
import style from "../styles/Form.module.css";
import Button from "./Button";

function Form({ score, lang, setSended }: IFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  useEffect(() => {
    setValue("score", score);
  }, []);

  const onSubmit = (data: IFormData) => {
    sendScoreData(data);
    setSended(true);
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
        autoComplete="off"
        {...register("name", {
          required: lang ? "Nombre requerido" : "Name required",
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: lang
            ? "Solo se permiten letras"
            : "Only letters are allowed",
          },
          maxLength: {
            value: 30,
            message: lang ? "El nombre no puede exceder los 30 caracteres" : "Name cannot exceed 30 characters",
          },
        })}
        />
      <Button type="submit">{lang ? "Subir Puntaje" : "Submit Score"}</Button>
        {errors.name && <div className={style.error}>{errors.name.message}</div>}
    </form>
  );
}

export default Form;

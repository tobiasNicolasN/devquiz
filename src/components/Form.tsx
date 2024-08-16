import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IFormProps {
  score: number;
  lang: boolean;
}

interface IFormData {
  score: number;
  name: string;
}

function Form({ score, lang }: IFormProps) {
  const { register, handleSubmit, setValue } = useForm<IFormData>();

  useEffect(() => {
    setValue("score", score);
  }, []);

  const onSubmit = (data: IFormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        {lang
          ? `Tu puntaje ha sido de ${score}. ¡Sube tu puntaje para asegurar tu lugar en la tabla de posiciones!`
          : `Your score is ${score}. Upload your score to secure your place on the leaderboard!`}
      </p>
      <input
        type="text"
        placeholder={lang ? "Nombre" : "Name"}
        {...register("name", { required: true })}
      />
      <button>{lang ? "Subir Puntaje" : "Submit Score"}</button>
    </form>
  );
}

export default Form;

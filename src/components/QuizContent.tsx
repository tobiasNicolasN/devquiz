import { IQuiz } from '../interfaces/types'
import dataEs from '../../data.es.json'
import dataEn from '../../data.es.json'

interface IQuizContentProps {
  lang: boolean
  num:number
  setResponse: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

function QuizContent({lang, num, setResponse}: IQuizContentProps) {
    const data: IQuiz[] = lang ? dataEs : dataEn

  return (
    <div>
        {
            <>
            <div>
                <p>{data[num].question}</p>
                </div>
            <div>
            {
              data[num].responses.map((res, index) => {
                return(
                <div onClick={() => setResponse(res.correct)} key={index}><p>{res.response}</p></div>)
              })
            }
            </div>
            </>
        }
    </div>
  )
}

export default QuizContent
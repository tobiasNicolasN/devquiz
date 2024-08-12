import { IQuiz } from '../interfaces/types'
import dataEs from '../../data.es.json'
import dataEn from '../../data.es.json'


function QuizContent(lang: boolean, num:number) {
    const data: IQuiz[] = lang ? dataEs : dataEn

  return (
    <></>
    // <div>
    //     {
    //         <>
    //         <div>
    //             <p>{data[num].question}</p>
    //             </div>
    //         <div>
    //             {data[num].responses.map((res) => {
    //                 <div>
    //                     <p>{res.response}</p>
    //                 </div>
    //             })
    //         </div>
    //         </>
    //     }
    // </div>
  )
}

export default QuizContent
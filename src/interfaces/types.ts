export interface IQuiz {
    question:  string;
    responses: Response[];
}

export interface Response {
    response: string;
    correct:  boolean;
}

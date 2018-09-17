import { QuestionStrategy } from "./QuestionStrategy";

export class likeStrategy extends QuestionStrategy {
    answer(answerQuestion:any){
        console.log("Hallo aus der LIKE strategy");
    }
    support(questiontype:string){
        if (questiontype=="LikeQuestion"){
            return true;
        }
    }
}
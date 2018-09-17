import { QuestionStrategy } from "./QuestionStrategy";

export class choiceStrategy extends QuestionStrategy {
    answer(answerQuestion: any){
        console.log("Hallo aus der CHOICE strategy");
    }
    support(questiontype:string){
        if (questiontype=="ChoiceQuestion"){
            return true;
        }
    }
}
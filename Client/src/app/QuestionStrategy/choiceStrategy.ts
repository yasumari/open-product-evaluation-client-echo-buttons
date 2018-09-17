import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { choiceAnswerMutate } from "../Components/question/question.model";

export class choiceStrategy extends QuestionStrategy {
    answer(apollo: Apollo, answerQuestion: any){
        console.log("Hallo aus der CHOICE strategy");
        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: choiceAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              choiceCode: answerQuestion.choiceCode},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
    }
    support(questiontype:string){
        return (questiontype=="ChoiceQuestion") ? true : false;
       
    }
}
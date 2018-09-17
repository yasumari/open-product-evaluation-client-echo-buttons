import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { regulatorAnswerMutate } from "../Components/question/question.model";

export class regulatorStrategy extends QuestionStrategy {
    answer(apollo: Apollo, answerQuestion:any){
        console.log("Hallo aus der Rating strategy");
        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: regulatorAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              rating: answerQuestion.btn},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
    }
    support(questiontype:string){
        
        if (questiontype=="RatingQuestion"){
            return true;
        }
    }
}
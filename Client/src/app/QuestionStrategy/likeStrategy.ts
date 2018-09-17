import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { likeAnswerMutate } from "../Components/question/question.model";

export class likeStrategy extends QuestionStrategy {
    answer(apollo: Apollo, answerQuestion:any){
        console.log("Hallo aus der LIKE strategy");
        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: likeAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              liked: true},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
    }
    support(questiontype:string){
        return (questiontype=="LikeQuestion") ? true : false;
    }
}
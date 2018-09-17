import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { likeDislikeAnswerMutate } from "../Components/question/question.model";

export class likeDislikeStrategy extends QuestionStrategy {
    
    answer(apollo: Apollo,answerQuestion: any){
        console.log("HALLO AUS DER LIKEDISLIKE STRATEGY");
        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: likeDislikeAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              liked: answerQuestion.liked },
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
    }
    support(questiontype:string){
        return (questiontype=="LikeDislikeQuestion") ? true : false;
    }
}
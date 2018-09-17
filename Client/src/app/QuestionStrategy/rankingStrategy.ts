import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { rankingAnswerMutate } from "../Components/question/question.model";

export class rankingStrategy extends QuestionStrategy {
    answer(apollo: Apollo, answerQuestion:any){
        console.log("Hallo aus der Ranking strategy");
        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: rankingAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              rankedImages: answerQuestion.ranking},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
        
    }
    support(questiontype:string){
        if (questiontype=="RankingQuestion"){
            return true;
        }
    }
}
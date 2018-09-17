import { QuestionStrategy } from "./QuestionStrategy";
import { favoriteAnswerMutate } from "../Components/question/question.model";
import { Apollo } from "apollo-angular";

export class favoriteStrategy extends QuestionStrategy {
     answer(apollo: Apollo, answerQuestion: any){
        console.log("Hallo aus der FAVORITE strategy");
        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: favoriteAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              favoriteImage: answerQuestion.favoriteImage},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
    }

    support(questiontype:string){
        if (questiontype=="FavoriteQuestion"){
            return true;
        }
    }
}
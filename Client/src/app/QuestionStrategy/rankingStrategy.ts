import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { rankingAnswerMutate } from "../GraphQL/Context.gql";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";

export class rankingStrategy extends QuestionStrategy {
    answer(apollo: Apollo, answerQuestion:any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
    
        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: rankingAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              rankedItems: answerQuestion.ranking},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
        
    }
    support(questiontype:string){
        return (questiontype=="RankingQuestion") ? true : false;
    }
}
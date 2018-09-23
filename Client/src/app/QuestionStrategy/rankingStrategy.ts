import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { rankingAnswerMutate } from "../GraphQL/Context.gql";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";
import { Router } from "@angular/router";
import { Constants } from "../constants";

export class rankingStrategy extends QuestionStrategy {
    answer(router: Router, apollo: Apollo, answerQuestion:any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
                apollo.mutate({
                    fetchPolicy: 'no-cache',
                    mutation: rankingAnswerMutate,
                    variables: { 
                      questionID: answerQuestion.questionID,
                      rankedItems: answerQuestion.ranking},
                    }).subscribe((mutationResponse) => 
                    console.log("mutation", mutationResponse)); 
                    dataService.setAnswerNumber();
                    setTimeout(() => {
                        router.navigate(['/feedback']);
                      }, Constants.TIMER_QUESTION);
        
        
    }
    support(questiontype:string){
        return (questiontype=="RankingQuestion") ? true : false;
    }
}
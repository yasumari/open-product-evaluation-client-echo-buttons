import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { rankingAnswerMutate } from "../Components/question/question.model";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";

export class rankingStrategy extends QuestionStrategy {
    answer(apollo: Apollo, answerQuestion:any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        console.log("Hallo aus der Ranking strategy");
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
    
        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: rankingAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              rankedItems: answerQuestion.ranking},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
        
    }
    support(questiontype:string){
        return (questiontype=="RankingQuestion") ? true : false;
    }
}
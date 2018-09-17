import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { regulatorAnswerMutate } from "../Components/question/question.model";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";

export class regulatorStrategy extends QuestionStrategy {
    answer(apollo: Apollo, answerQuestion:any, btn_number: Number, renderer:Renderer2, dataService:DataService){
        console.log("Hallo aus der Regulator strategy");
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        let j=0;
        //Alle 4 Buttons disablen
        while(j<4){
          let btn_reg: HTMLElement=document.getElementById("ranking_"+j);
          renderer.setProperty(btn_reg, 'disabled', 'true');
          j++;
        }
        //RegulatorQuestion: mutation besondere Variable:rating - Skala 
        //var normalized=btn_number/currentQuestion.items.length;
    
        //TODO welches Bild soll bei einer Regulator Frage im Feedback sein?
        dataService.setChosenImageUrl(currentQuestion.items[0].image.url);
        dataService.setAnswerNumber();


        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: regulatorAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              rating: btn_number},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
    }
    support(questiontype:string){
        return (questiontype=="RegulatorQuestion") ? true : false;
    }
}
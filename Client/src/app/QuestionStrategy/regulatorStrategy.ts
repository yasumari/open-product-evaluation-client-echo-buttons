import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { regulatorAnswerMutate } from "../Components/question/question.model";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";

export class regulatorStrategy extends QuestionStrategy {
    answer(apollo: Apollo, answerQuestion:any, btn_number: Number, renderer:Renderer2, dataService:DataService){
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        let j=0;
        //Alle 4 Buttons disablen
        while(j<4){
            try {
                let btn_reg: HTMLElement=document.getElementById("ranking_"+j);
                renderer.setProperty(btn_reg, 'disabled', 'true');
            } catch (error) {
                console.log("Button ist bereits disabled oder nicht sichtbar");
            }
          j++;
        }
        //RegulatorQuestion: mutation besondere Variable:rating - Skala 
        //TODO welches Bild soll bei einer Regulator Frage im Feedback sein?
        if (currentQuestion.items!=null){
            dataService.setChosenImageUrl(currentQuestion.items[0].image.url);
        }
        dataService.setAnswerNumber();
        
        //aus der BTN_nummer den Wert für rating finden
        let regulator=dataService.getRegulatorsValue();

        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: regulatorAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              rating: regulator[""+btn_number]},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
    }
    support(questiontype:string){
        return (questiontype=="RegulatorQuestion") ? true : false;
    }
}
import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { choiceAnswerMutate } from "../GraphQL/Context.gql";
import { Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../Services/data.service";
import { Constants } from "../constants";

//ChoiceQuestion: choiceCode - anhand des Codes vom Objekt festgelegt

export class choiceStrategy extends QuestionStrategy {
    answer(router: Router, apollo: Apollo, answerQuestion: any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        //Prüfen ob Button überhaupt verfügbar ist
        let maxChoices=currentQuestion.choices.length;
        if (btn_number>=maxChoices){
            console.log("Button ist nicht verfügbar");
        }else {
            for (let btn of currentQuestion.choices) {
                let _btn: HTMLElement=document.getElementById(btn.id);
                renderer.setProperty(_btn, 'disabled', 'true');
            }

            apollo.mutate({
                fetchPolicy: 'no-cache',
                mutation: choiceAnswerMutate,
                variables: { 
                  questionID: answerQuestion.questionID,
                  choice: currentQuestion.choices[""+btn_number].id},
                }).subscribe((mutationResponse) => 
                console.log("mutation", mutationResponse));
                if (currentQuestion.items!=null && currentQuestion.items[""+btn_number].image.url!=null){
                    //TODO Welches Bild soll im Feedback sein?
                    dataService.setChosenImageUrl(currentQuestion.items[""+btn_number].image.url);
                } else {
                    dataService.setChosenImageUrl(null);
                }
                dataService.setAnswerNumber();
                setTimeout(() => {
                    router.navigate(['/feedback']);
                  }, Constants.TIMER_QUESTION);
        }
       


        }

    support(questiontype:string){
        return (questiontype=="ChoiceQuestion") ? true : false;
    }
}
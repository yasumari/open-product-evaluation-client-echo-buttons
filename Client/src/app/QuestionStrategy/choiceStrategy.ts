import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { choiceAnswerMutate } from "../Components/question/question.model";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";

//ChoiceQuestion: choiceCode - anhand des Codes vom Objekt festgelegt

export class choiceStrategy extends QuestionStrategy {
    answer(apollo: Apollo, answerQuestion: any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        console.log("Hallo aus der CHOICE strategy");
        for (let btn of currentQuestion.choices) {
            let _btn: HTMLElement=document.getElementById(btn.code);
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
            dataService.setChosenImageUrl(currentQuestion.choices[""+btn_number].image.url);
            dataService.setAnswerNumber();
        }

    support(questiontype:string){
        return (questiontype=="ChoiceQuestion") ? true : false;
    }
}
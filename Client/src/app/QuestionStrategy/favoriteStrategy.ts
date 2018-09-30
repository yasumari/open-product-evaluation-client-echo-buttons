import { QuestionStrategy } from "./QuestionStrategy";
import { favoriteAnswerMutate } from "../GraphQL/Context.gql";
import { Apollo } from "apollo-angular";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";
import { Router } from "@angular/router";
import { Constants } from "../constants";

/**
 * Geprüft
 */

//spezifisch für Favorite-> favoriteImage
export class favoriteStrategy extends QuestionStrategy {
     answer(router: Router, apollo: Apollo, answerQuestion: any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        let maxBtn= currentQuestion.items.length;
        if (btn_number<maxBtn){
            for (let btn of currentQuestion.items) {
                let _btn: HTMLElement=document.getElementById(btn.id);
                renderer.setProperty(_btn, 'disabled', 'true');
              }
            apollo.mutate({
                fetchPolicy: 'no-cache',
                mutation: favoriteAnswerMutate,
                variables: { 
                  questionID: answerQuestion.questionID,
                  favoriteItem: currentQuestion.items[""+btn_number].id},
                }).subscribe((mutationResponse) => 
                console.log("mutation", mutationResponse)); 
                if (currentQuestion.items!=null && currentQuestion.items[""+btn_number].image.url!=null){
                    console.log("BILD AUSGEWÄHLT: " +currentQuestion.items[""+btn_number].image.url)
                    dataService.setChosenImageUrl(currentQuestion.items[""+btn_number].image.url);
                } else {
                    dataService.setChosenImageUrl(null);
                }
                dataService.increaseAnswerNumber();
                setTimeout(() => {
                    router.navigate(['/feedback']);
                  }, Constants.TIMER_QUESTION);
        }

    }

    support(questiontype:string){
        return (questiontype=="FavoriteQuestion") ? true : false;
    }
}
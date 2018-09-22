import { QuestionStrategy } from "./QuestionStrategy";
import { favoriteAnswerMutate } from "../GraphQL/Context.gql";
import { Apollo } from "apollo-angular";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";

/**
 * Geprüft
 */

//spezifisch für Favorite-> favoriteImage
export class favoriteStrategy extends QuestionStrategy {
     answer(apollo: Apollo, answerQuestion: any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
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
            dataService.setAnswerNumber();
    }

    support(questiontype:string){
        return (questiontype=="FavoriteQuestion") ? true : false;
    }
}
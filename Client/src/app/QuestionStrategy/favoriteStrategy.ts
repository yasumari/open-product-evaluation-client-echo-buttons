import { QuestionStrategy } from "./QuestionStrategy";
import { favoriteAnswerMutate } from "../Components/question/question.model";
import { Apollo } from "apollo-angular";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";

        //spezifisch für Favorite-> favoriteImage
export class favoriteStrategy extends QuestionStrategy {
     answer(apollo: Apollo, answerQuestion: any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        console.log("Hallo aus der FAVORITE strategy");
        for (let btn of currentQuestion.items) {
            let _btn: HTMLElement=document.getElementById(btn.image.id);
            renderer.setProperty(_btn, 'disabled', 'true');
          }
        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: favoriteAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              favoriteItem: currentQuestion.items[""+btn_number].id},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
            dataService.setChosenImageUrl(currentQuestion.items[""+btn_number].image.url);
            dataService.setAnswerNumber();
    }

    support(questiontype:string){
        return (questiontype=="FavoriteQuestion") ? true : false;
    }
}
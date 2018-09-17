import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { likeDislikeAnswerMutate } from "../Components/question/question.model";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";

export class likeDislikeStrategy extends QuestionStrategy {
    
    answer(apollo: Apollo,answerQuestion: any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        //DislikeQuestion: mutation besondere Variable:  liked - Gefällt oder gefällt das Objekt nicht
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        console.log("HALLO AUS DER LIKEDISLIKE STRATEGY");
        let btn_like: HTMLElement = document.getElementById("btn_like");
        let btn_dislike: HTMLElement = document.getElementById("btn_dislike");
        renderer.setProperty(btn_like, 'disabled', 'true');
        renderer.setProperty(btn_dislike, 'disabled', 'true');

        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: likeDislikeAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              deviceID: answerQuestion.deviceID, 
              contextID: answerQuestion.contextID,
              liked: (btn_number == 0 ? true : false) },
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 

            dataService.setChosenImageUrl(currentQuestion.items[""+btn_number].image.url);
            dataService.setAnswerNumber();
    }
    support(questiontype:string){
        return (questiontype=="LikeDislikeQuestion") ? true : false;
    }
}
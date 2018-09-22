import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { likeDislikeAnswerMutate } from "../GraphQL/Context.gql";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";

export class likeDislikeStrategy extends QuestionStrategy {
    
    answer(apollo: Apollo,answerQuestion: any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        //DislikeQuestion: mutation besondere Variable:  liked - Gefällt oder gefällt das Objekt nicht
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        let btn_like: HTMLElement = document.getElementById("btn_like");
        let btn_dislike: HTMLElement = document.getElementById("btn_dislike");
        renderer.setProperty(btn_like, 'disabled', 'true');
        renderer.setProperty(btn_dislike, 'disabled', 'true');

        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: likeDislikeAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              liked: (btn_number == 0 ? true : false) },
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
            if (currentQuestion.items!=null){
                dataService.setChosenImageUrl(currentQuestion.items[""+btn_number].image.url);
            } else {
                dataService.setChosenImageUrl(null);
            }
            dataService.setAnswerNumber();
    }
    support(questiontype:string){
        return (questiontype=="LikeDislikeQuestion") ? true : false;
    }
}
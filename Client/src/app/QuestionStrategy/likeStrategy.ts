import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { likeAnswerMutate } from "../GraphQL/Context.gql";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";
import { Router } from "@angular/router";
import { Constants } from "../constants";


export class likeStrategy extends QuestionStrategy {
    answer(router: Router, apollo: Apollo, answerQuestion:any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        //Gibt nur ein Like Button, daher ==0
        if (btn_number<=1){
            let _btn: HTMLElement=document.getElementById(currentQuestion.likeIcon.id);
            renderer.setProperty(_btn, 'disabled', 'true');
            //TODO welches Bild soll bei einer Like Frage im Feedback sein?
            if (currentQuestion.items!=null){
                dataService.setChosenImageUrl(currentQuestion.items[""+btn_number].image.url);
            } else {
                dataService.setChosenImageUrl(null);
            }
    
            
            apollo.mutate({
                fetchPolicy: 'no-cache',
                mutation: likeAnswerMutate,
                variables: { 
                  questionID: answerQuestion.questionID,
                  liked: (btn_number==0) ? true : false},
                }).subscribe((mutationResponse) => 
                console.log("mutation", mutationResponse)); 
                dataService.increaseAnswerNumber();
                setTimeout(() => {
                    router.navigate(['/feedback']);
                  }, Constants.TIMER_QUESTION);
        }
        
    }
    support(questiontype:string){
        return (questiontype=="LikeQuestion") ? true : false;
    }
}
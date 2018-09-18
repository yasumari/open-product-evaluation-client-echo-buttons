import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { likeAnswerMutate } from "../Components/question/question.model";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";

export class likeStrategy extends QuestionStrategy {
    answer(apollo: Apollo, answerQuestion:any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        let currentQuestion = dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        let _btn: HTMLElement=document.getElementById(currentQuestion.likeIcon.id);
        renderer.setProperty(_btn, 'disabled', 'true');
        //TODO welches Bild soll bei einer Regulator Frage im Feedback sein?
        dataService.setChosenImageUrl(currentQuestion.likeIcon.url);
        dataService.setAnswerNumber();

        console.log("Hallo aus der LIKE strategy");
        apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: likeAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              liked: (btn_number==0) ? true : false},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
    }
    support(questiontype:string){
        return (questiontype=="LikeQuestion") ? true : false;
    }
}
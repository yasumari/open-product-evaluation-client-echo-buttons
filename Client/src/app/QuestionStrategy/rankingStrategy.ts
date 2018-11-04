import { QuestionStrategy } from "./QuestionStrategy";
import { Apollo } from "apollo-angular";
import { rankingAnswerMutate } from "../GraphQL/Context.gql";
import { Renderer2 } from "@angular/core";
import { DataService } from "../Services/data.service";
import { Router } from "@angular/router";
import { Constants } from "../constants";

export class rankingStrategy extends QuestionStrategy {
    answer(router: Router, apollo: Apollo, answerQuestion:any, btn_number: Number, renderer: Renderer2, dataService:DataService){
        let rankingNr=dataService.getRanking()==undefined ? 0 : dataService.getRanking().length;
        let currentQuestion=dataService.getContext().activeSurvey.questions[dataService.getAnswerNumber()];
        const btn_rank: HTMLElement = document.getElementById(currentQuestion.items[""+btn_number].id);
        renderer.setStyle(btn_rank, 'background', 'lightgrey');
        renderer.setProperty(btn_rank, 'color', '#34a7bd');
        renderer.setProperty(btn_rank, 'disabled', 'true');
        renderer.setProperty(btn_rank, 'innerHTML', 'Platz ' + (rankingNr + 1));
        
        
        //RankingQuestion: mutation besondere Variable:  rankedImages - in welcher Reihenfolge wurden die Bilder ausgewählt
        // [1,2,3,...] - 1 schlecht, 2 mittel, 3 am besten...
        dataService.setRanking(currentQuestion.items[""+btn_number].id);
        if (dataService.getRanking().length == currentQuestion.items.length) {
          //Im Feedback Platz 1 anzeigen
          for (var i = 0; i < currentQuestion.items.length; i++) {
            if (dataService.getRanking[rankingNr-1] == currentQuestion.items[i].id) {
              dataService.setChosenImageUrl(currentQuestion.items[i].image.url);
            }
          }
          let rankings=dataService.getRanking();
          apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: rankingAnswerMutate,
            variables: { 
              questionID: answerQuestion.questionID,
              rankedItems: rankings},
            }).subscribe((mutationResponse) => 
            console.log("mutation", mutationResponse)); 
            dataService.increaseAnswerNumber();
            dataService.resetRanking();
            setTimeout(() => {
                router.navigate(['/feedback']);
              }, Constants.TIMER_QUESTION);
        } else {
          const counter: HTMLElement = document.getElementById("rankingItemslabel");
          renderer.setProperty(counter, 'innerHTML', 'Wähle Platz ' + (rankingNr + 2))
        }
    }

    support(questiontype:string){
        return (questiontype=="RankingQuestion") ? true : false;
    }
}
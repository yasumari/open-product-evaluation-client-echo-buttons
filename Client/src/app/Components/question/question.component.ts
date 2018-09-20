import { Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService} from '../../Services/data.service';
import { Router } from '@angular/router';
import { MessageService } from '../../Services/message.service';
import { Context, Question } from '../../types';
import { Subscription } from 'rxjs/Subscription';
import { Constants } from "../../constants";
import { QuestionService } from "./question.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit, OnDestroy {
  sub: Subscription;
  private currentProject: Context;
  private currentAnswer;
  private currentQuestion: Question;
  private ranking=[]; 
  private count_items; 
  private min;
  private max;
  private step;
  private valueBtn1;
  private valueBtn2;

 constructor(private questionService: QuestionService, private apollo: Apollo, private renderer: Renderer2, private dataService: DataService, private router: Router, private messageService: MessageService) {}

  /**
   * @description Berechnet aus den beantworteten und noch offenen Fragen eine Progressbar-Fortschritt
   */
  calculate():string {
    return (Math.round(this.dataService.getAnswerNumber()*100/this.currentProject.activeSurvey.questions.length))+"%";
  }

  searchButtonValues(diff, possibleNumbers): Number{
    if (possibleNumbers.includes(this.min+diff)){
      if ((this.min+diff)==this.max){
        return null
      }
      return (this.min+diff);
    } else {
      for (let i of possibleNumbers) {
        if (i>(this.min+diff)){
          if (i>=this.max){
            return null
          }
          return i;
        }
     }
    }
    return null;
  }
  /**
   * @description Reaktion auf einen gedrückten Buzzer/Button, entscheidet anhand welches 
   * Fragetypens welche Buttons disabled werden und welche Funktion ausgelöst werden.  StrategyPattern, questionService.answer()
   * btn_number sagt welches Item im Array gewählt wurde 
    Button 0,1,2,3
           | | | |
    Items  0,1,2,3
   * @param btn_number Nummer des gedrückten Buttons
   */
   buttonClick(btn_number: number){    
    this.currentAnswer={
      questionID: this.currentQuestion.id
    }

    if (this.currentQuestion.__typename=="RankingQuestion"){
      const btn_rank: HTMLElement = document.getElementById(this.currentQuestion.items[btn_number].id);
        this.renderer.setStyle(btn_rank, 'background', 'lightgrey');
        this.renderer.setProperty(btn_rank, 'color', '#34a7bd');
        this.renderer.setProperty(btn_rank, 'disabled', 'true');
        this.renderer.setProperty(btn_rank, 'innerHTML', 'Platz '+(this.count_items+1));
        
      //RankingQuestion: mutation besondere Variable:  rankedImages - in welcher Reihenfolge wurden die Bilder ausgewählt 
      // [1,2,3,...] - 1 schlecht, 2 mittel, 3 am besten...
      this.ranking.unshift(this.currentQuestion.items[btn_number].id);
      if (this.ranking.length==this.currentQuestion.items.length){
        //TODO welche Reihenfolge Array in die richtige Reihenfolge bringen. oder umgekehrte Reihenfolge?
          this.currentAnswer.ranking=this.ranking;
          this.dataService.setAnswerNumber();
          //Im Feedback Platz 1 anzeigen
          for (var i=0; i<this.currentQuestion.items.length; i++){
            if (this.ranking[0]==this.currentQuestion.items[i].image.id){
              this.dataService.setChosenImageUrl(this.currentQuestion.items[i].image.url);
            }
          }
          this.questionStrategy(btn_number)
      } else {
        this.count_items++;    
      }
    } else {
      this.questionStrategy(btn_number);
    }
  }

  questionStrategy(btn_number: number){
      //Nach allen Antworten wird anhand Timer_Question noch die Seite abgewartet, 
      //um die gedrückten Buttons zu simulieren. Anschließend auf Feedback-Seite
      this.sub.unsubscribe();
      setTimeout(() => {
        this.router.navigate(['/feedback']);
      }, Constants.TIMER_QUESTION);
      this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, btn_number, this.apollo, this.renderer, this.dataService);
  }

 public ngOnInit(): void {
      this.currentProject = this.dataService.getContext();
      this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()];
      /*Für die Auskunft, welcher Platz gerade gewählt wird, 
       muss die Anzahl der Button-Klicks berechnet werden. Erhöht sich bei rankingQuestionClick*/
      if (this.currentQuestion.__typename=="RankingQuestion"){
        this.count_items= 0;
      }

      if (this.currentQuestion.__typename=="RegulatorQuestion"){
        /**
         * @description Besonders für Regulator müssen die Zahlenwerte berechnet werden, 
         * da die Buzzer nur 4 Werte darstellen können
         */
        this.min=this.currentQuestion.min;
        this.max=this.currentQuestion.max;
        this.step=this.currentQuestion.stepSize;
        let range=(this.max-this.min)/3;
        let i=this.min;
        let possibleNumbers=[];
        //Alle Möglichen Bewertungen
        while (i<=this.max){
          possibleNumbers.push(i);
          i+=this.step;
        }
        this.valueBtn1=this.searchButtonValues(range, possibleNumbers);
        this.valueBtn2=this.searchButtonValues((range+range), possibleNumbers);

        this.dataService.setRegulatorsValue([this.min, this.valueBtn1, this.valueBtn2, this.max]);
      }

      console.log(this.currentQuestion);
      console.log(this.currentProject.activeSurvey.votes);
      //Subscribed die Socket-Kommunikation, falls neue Nachrichten reinkommen
      this.sub=this.messageService.getMessage().subscribe( message => {
        
          //TODO noch benötigt?
          if (message!=undefined || message!=null){
            this.buttonClick(parseInt(message));
          } else {
            console.log("Button ungültig Nachricht");
          }
      })
    }
    
    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}
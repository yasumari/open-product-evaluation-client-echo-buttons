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

 constructor(private questionService: QuestionService, private apollo: Apollo, private renderer: Renderer2, private dataService: DataService, private router: Router, private messageService: MessageService) {}

  /**
   * @description Berechnet aus den beantworteten und noch offenen Fragen eine Progressbar-Fortschritt
   */
  calculate():string {
    return (this.dataService.getAnswerNumber()*100/this.currentProject.activeSurvey.questions.length)+"%";
  }

  /**
   * @description Buttons nach Antwort disablen, Alle Buttons haben den Namen currentQuestion.items[].image.id
   */
  disableAllButtens(){
    for (let btn of this.currentQuestion.items) {
          let _btn: HTMLElement=document.getElementById(btn.image.id);
          this.renderer.setProperty(_btn, 'disabled', 'true');
        }
  }


  /**
   * @description Reaktion auf einen gedrückten Buzzer/Button, entscheidet anhand welches 
   * Fragetypens welche Buttons disabled werden und welche Funktion ausgelöst werden.  StrategyPattern, questionService.answer()
   * btn_number sagt welches Item im Array gewählt wurde 
    Button 0,1,2,3
           | | | |
    Items  0,1,2,3
      Variablen der Mutations sind unterschiedlich: siehe Kommentare der Funktionen
      Nach allen Antworten wird anhand Timer_Question noch die Seite abgewartet, 
      um die gedrückten Buttons zu simulieren. Anschließend auf Feedback-Seite
   * @param btn_number Nummer des gedrückten Buttons
   */
   buttonClick(btn_number: number){    
    this.currentAnswer={
      questionID: this.currentQuestion.id,
      deviceID: this.dataService.getDeviceID(), 
      contextID: this.dataService.getContextID()
    }

    switch(this.currentQuestion.__typename){
      case 'RankingQuestion':
        const btn_rank: HTMLElement = document.getElementById(this.currentQuestion.items[btn_number].image.id);
        this.renderer.setStyle(btn_rank, 'background', 'lightgrey');
        this.renderer.setProperty(btn_rank, 'innerHTML', 'Platz '+(this.count_items+1));
        this.renderer.setProperty(btn_rank, 'color', '#34a7bd');
        this.renderer.setProperty(btn_rank, 'disabled', 'true');
        //RankingQuestion: mutation besondere Variable:  rankedImages - in welcher Reihenfolge wurden die Bilder ausgewählt 
        this.ranking.push(this.currentQuestion.items[btn_number].image.id);
        if (this.ranking.length==this.currentQuestion.items.length){
          //TODO welche Reihenfolge Array in die richtige Reihenfolge bringen. oder umgekehrte Reihenfolge?
            this.currentAnswer.ranking=this.ranking;
            this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, this.apollo);
            this.sub.unsubscribe();
            this.dataService.setAnswerNumber();
            setTimeout(() => {
              //Im Feedback Platz 1 anzeigen
              for (var i=0; i<this.currentQuestion.items.length; i++){
                if (this.ranking[0]==this.currentQuestion.items[i].image.id){
                  this.dataService.setChosenImageUrl(this.currentQuestion.items[i].image.url);
                }
              }
              this.router.navigate(['/feedback']);
            }, Constants.TIMER_QUESTION);
        } else {
          this.count_items++;    
        }
        break;

      case 'LikeDislikeQuestion':
        this.sub.unsubscribe();
        //DislikeQuestion: mutation besondere Variable:  liked - Gefällt oder gefällt das Objekt nicht
        this.currentAnswer.liked=(btn_number == 0 ? true : false);
        this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, this.apollo);
        this.dataService.setChosenImageUrl(this.currentQuestion.items[btn_number].image.url);
        this.dataService.setAnswerNumber();
        setTimeout(() => {
          this.router.navigate(['/feedback']);
        }, Constants.TIMER_QUESTION);

        let btn_like: HTMLElement = document.getElementById("btn_like");
        let btn_dislike: HTMLElement = document.getElementById("btn_dislike");
        this.renderer.setProperty(btn_like, 'disabled', 'true');
        this.renderer.setProperty(btn_dislike, 'disabled', 'true');
        break;

      case 'RegulatorQuestion':
        this.sub.unsubscribe();
        let j=0;
        //Alle 4 Buttons disablen
        while(j<4){
          let btn_reg: HTMLElement=document.getElementById("ranking_"+j);
          this.renderer.setProperty(btn_reg, 'disabled', 'true');
          j++;
        }
        //RegulatorQuestion: mutation besondere Variable:rating - Skala 
        this.currentAnswer.rating=btn_number;
        var normalized=btn_number/this.currentQuestion.items.length;
    
    //TODO welches Bild soll bei einer Regulator Frage im Feedback sein?
    this.dataService.setChosenImageUrl(this.currentQuestion.items[0].image.url);
    this.dataService.setAnswerNumber();
    setTimeout(() => {
      this.router.navigate(['/feedback']);
    }, Constants.TIMER_QUESTION);
    this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, this.apollo);
        break;

      case 'ChoiceQuestion': 
        this.sub.unsubscribe();
        this.disableAllButtens();
        //ChoiceQuestion: choiceCode - anhand des Codes vom Objekt festgelegt
        this.currentAnswer.choiceCode=this.currentQuestion.choices[btn_number].code;
        this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, this.apollo);
        this.dataService.setChosenImageUrl(this.currentQuestion.items[btn_number].image.url);
        this.dataService.setAnswerNumber();
        setTimeout(() => {
          this.router.navigate(['/feedback']);
        }, Constants.TIMER_QUESTION);
        break;

      case 'LikeQuestion':
        this.sub.unsubscribe();
        this.disableAllButtens();
        //TODO geht auch like= false? dann button weiter benötigt?
        this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, this.apollo);

        //TODO welches Bild soll bei einer Regulator Frage im Feedback sein?
        this.dataService.setChosenImageUrl(this.currentQuestion.items[btn_number].image.url);
        this.dataService.setAnswerNumber();
        setTimeout(() => {
          this.router.navigate(['/feedback']);
        }, Constants.TIMER_QUESTION);
        break;

      case 'FavoriteQuestion':
        this.sub.unsubscribe();
        this.disableAllButtens();
        //spezifisch für Favorite-> favoriteImage
        this.currentAnswer.favoriteImage=this.currentQuestion.items[btn_number].image.id;
        //FragetypStrategie
        this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, this.apollo);
        this.dataService.setChosenImageUrl(this.currentQuestion.items[btn_number].image.url);
        this.dataService.setAnswerNumber();
        setTimeout(() => {
          this.router.navigate(['/feedback']);
        }, Constants.TIMER_QUESTION);
        break;
      }
    }


 public ngOnInit(): void {
      this.currentProject = this.dataService.getContext();
      this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()];
      /*Für die Auskunft, welcher Platz gerade gewählt wird, 
       muss die Anzahl der Button-Klicks berechnet werden. Erhöht sich bei rankingQuestionClick*/
      if (this.currentQuestion.__typename=="RankingQuestion"){
        this.count_items= 0;
      }

      //TODO rausnehmen, nur für testdaten drin
      this.currentQuestion.items[0].image.url="../../../assets/images/checklist-1295319_1280.png";
      this.currentQuestion.items[1].image.url="../../../assets/images/checklist-2023731_1280.png";
    
      // testdaten rechnnung Antwort 
      this.currentQuestion.id=1;
        
      this.currentProject.activeSurvey.votes[0].answers[0].question=1;
      console.log("",this.currentProject.activeSurvey.votes);
      this.currentQuestion.id=2;

      this.currentProject.activeSurvey.votes[0].answers[1].question=2; 

      this.currentQuestion.id=3;
      
      this.currentProject.activeSurvey.votes[1].answers[0].question=3;
  
      this.currentQuestion.id=2;
      
      this.currentProject.activeSurvey.votes[1].answers[1].question=4;


    console.log("question datatest",this.currentQuestion);
    console.log("antwort",this.currentProject.activeSurvey.votes);

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
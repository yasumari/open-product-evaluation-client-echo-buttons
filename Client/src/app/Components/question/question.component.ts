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
      questionID: this.currentQuestion.id,
      deviceID: this.dataService.getDeviceID(), 
      contextID: this.dataService.getContextID()
    }

    if (this.currentQuestion.__typename=="RankingQuestion"){
      const btn_rank: HTMLElement = document.getElementById(this.currentQuestion.items[btn_number].image.id);
        this.renderer.setStyle(btn_rank, 'background', 'lightgrey');
        this.renderer.setProperty(btn_rank, 'color', '#34a7bd');
        this.renderer.setProperty(btn_rank, 'disabled', 'true');
        this.renderer.setProperty(btn_rank, 'innerHTML', 'Platz '+(this.count_items+1));
        
      //RankingQuestion: mutation besondere Variable:  rankedImages - in welcher Reihenfolge wurden die Bilder ausgewählt 
      this.ranking.push(this.currentQuestion.items[btn_number].image.id);
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
<<<<<<< HEAD
      console.log("Die ganze Frage: ", this.currentQuestion);
      console.log("Antwort: ", this.currentProject.activeSurvey);
      console.log("DaTA. answers[0]", this.currentProject.activeSurvey.votes[0].answers[0]);
      if(this.currentProject.activeSurvey.votes[0].answers[0].__typename=="LikeAnswer"){
        console.log("DaTA. answers[0]", this.currentProject.activeSurvey.votes[0].answers[0].liked);
      }
      else if(this.currentProject.activeSurvey.votes[0].answers[0].__typename=="LikeDislikeAnswer"){
        console.log("DaTA. answers[0]", this.currentProject.activeSurvey.votes[0].answers[0].liked);
      }
      else if(this.currentProject.activeSurvey.votes[0].answers[0].__typename=="ChoiceAnswer"){
        console.log("DaTA. answers[0]", this.currentProject.activeSurvey.votes[0].answers[0].choiceCode);
      }
      else if(this.currentProject.activeSurvey.votes[0].answers[0].__typename=="RegulatorAnswer"){
        console.log("DaTA. answers[0]", this.currentProject.activeSurvey.votes[0].answers[0].rating);
        console.log("DaTA. answers[0]", this.currentProject.activeSurvey.votes[0].answers[0].normalized);
      }
      else if(this.currentProject.activeSurvey.votes[0].answers[0].__typename=="RankingAnswer"){
        console.log("RankingAnswer", this.currentProject.activeSurvey.votes[0].answers[0]);
      }
      else if(this.currentProject.activeSurvey.votes[0].answers[0].__typename=="FavoriteAnswer"){
        console.log("Favorite", this.currentProject.activeSurvey.votes[0].answers[0].favoriteImage);
      }
=======
>>>>>>> master

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
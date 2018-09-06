import { Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService} from '../../Services/data.service';
import { favoriteAnswerMutate, likeAnswerMutate, likeDislikeAnswerMutate, rankingAnswerMutate, regulatorAnswerMutate, choiceAnswerMutate} from './question.model';
import { Router } from '@angular/router';
import { MessageService } from '../../Services/message.service';
import { Context, Answer, Question } from '../../types';
import { Subscription } from 'rxjs/Subscription';
import { Constants } from "../../constants";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})


export class QuestionComponent implements OnInit, OnDestroy {
  sub: Subscription;
  private currentProject: Context;
  private currentAnswer: Answer;
  private currentQuestion: Question;
  private ranking=[]; 
  private count_items;
  max_items: number;

 constructor(private apollo: Apollo, private renderer: Renderer2, private dataService: DataService, private router: Router, private messageService: MessageService) {
 }

  //Progressbar
  calculate():string {
    return (this.dataService.getAnswerNumber()*100/this.currentProject.activeSurvey.questions.length)+"%";
  }

  //btn_number sagt welches Item im Array gewählt wurde 
  //Button 0,1,2,3
  //       | | | |
  //Items  0,1,2,3

  disableAllButtens(){
    for (let btn of this.currentQuestion.items) {
          let _btn: HTMLElement=document.getElementById(btn.image.id);
          this.renderer.setProperty(_btn, 'disabled', 'true');
        }
  }

favoriteQuestionClick(btn_number: number){
  this.apollo.mutate({
  fetchPolicy: 'no-cache',
  mutation: favoriteAnswerMutate,
  variables: { 
    questionID: this.currentAnswer.questionID,
    deviceID: this.currentAnswer.deviceID, 
    contextID: this.currentAnswer.contextID,
    favoriteImage:this.currentQuestion.items[btn_number].image.id},
  }).subscribe((mutationResponse) => 
  console.log("mutation", mutationResponse)); 
  this.dataService.setChosenImageUrl(this.currentQuestion.items[btn_number].image.url);
  this.dataService.setAnswerNumber();
  setTimeout(() => {
    this.router.navigate(['/feedback']);
  }, Constants.TIMER_QUESTION);
}

likeQuestionClick(btn_number: number){
  this.apollo.mutate({
  fetchPolicy: 'no-cache',
  mutation: likeAnswerMutate,
  variables: { 
    questionID: this.currentAnswer.questionID,
    deviceID: this.currentAnswer.deviceID, 
    contextID: this.currentAnswer.contextID,
    liked: true},
  }).subscribe((mutationResponse) => 
  console.log("mutation", mutationResponse)); 
    //TODO welches Bild soll bei einer Regulator Frage im Feedback sein?
    this.dataService.setChosenImageUrl(this.currentQuestion.items[btn_number].image.url);
  this.dataService.setAnswerNumber();
  setTimeout(() => {
    this.router.navigate(['/feedback']);
  }, Constants.TIMER_QUESTION);
}

choiceQuestionClick(btn_number: number){
  //TODO ChoiceCode ersetzen mit was?
  this.apollo.mutate({
  fetchPolicy: 'no-cache',
  mutation: choiceAnswerMutate,
  variables: { 
    questionID: this.currentAnswer.questionID,
    deviceID: this.currentAnswer.deviceID, 
    contextID: this.currentAnswer.contextID,
    choiceCode: "TODO"},
  }).subscribe((mutationResponse) => 
  console.log("mutation", mutationResponse)); 
  this.dataService.setChosenImageUrl(this.currentQuestion.items[btn_number].image.url);
  this.dataService.setAnswerNumber();
  setTimeout(() => {
    this.router.navigate(['/feedback']);
  }, Constants.TIMER_QUESTION);
}

regulatorQuestionClick(btn_number: number){
  /*TODO: normalized wird im Backend berechnet? */
  var normalized=btn_number/this.currentQuestion.items.length;
  this.apollo.mutate({
  fetchPolicy: 'no-cache',
  mutation: regulatorAnswerMutate,
  variables: { 
    questionID: this.currentAnswer.questionID,
    deviceID: this.currentAnswer.deviceID, 
    contextID: this.currentAnswer.contextID,
    rating: btn_number},
  }).subscribe((mutationResponse) => 
  console.log("mutation", mutationResponse)); 
  //TODO welches Bild soll bei einer Regulator Frage im Feedback sein?
  this.dataService.setChosenImageUrl(this.currentQuestion.items[0].image.url);
  this.dataService.setAnswerNumber();
  setTimeout(() => {
    this.router.navigate(['/feedback']);
  }, Constants.TIMER_QUESTION);
}

likeDislikeQuestion(btn_number: number){
  this.apollo.mutate({
  fetchPolicy: 'no-cache',
  mutation: likeDislikeAnswerMutate,
  variables: { 
    questionID: this.currentAnswer.questionID,
    deviceID: this.currentAnswer.deviceID, 
    contextID: this.currentAnswer.contextID,
    liked: (btn_number == 0 ? true : false) },
  }).subscribe((mutationResponse) => 
  console.log("mutation", mutationResponse)); 
  this.dataService.setChosenImageUrl(this.currentQuestion.items[btn_number].image.url);
  this.dataService.setAnswerNumber();
  setTimeout(() => {
    this.router.navigate(['/feedback']);
  }, Constants.TIMER_QUESTION);
}

rankingQuestionClick(btn_number: number){
  this.ranking.push(this.currentQuestion.items[btn_number].image.id);
  if (this.ranking.length==this.currentQuestion.items.length){
    //TODO welche Reihenfolge Array in die richtige Reihenfolge bringen. oder umgekehrte Reihenfolge?
    this.apollo.mutate({
      fetchPolicy: 'no-cache',
      mutation: rankingAnswerMutate,
      variables: { 
        questionID: this.currentAnswer.questionID,
        deviceID: this.currentAnswer.deviceID, 
        contextID: this.currentAnswer.contextID,
        rankedImages: this.ranking},
      }).subscribe((mutationResponse) => 
      console.log("mutation", mutationResponse)); 
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
}

   buttonClick(btn_number: number){    
    console.log("Button: " + btn_number);

    this.currentAnswer={
      questionID: this.currentQuestion.id,
      deviceID: this.dataService.getDeviceID(), 
      contextID: this.dataService.getContextID()
    }
//Unterscheidung des Fragetyps und damit auch die Antwort
    switch(this.currentQuestion.__typename){
      case 'RankingQuestion':
        const btn_rank: HTMLElement = document.getElementById(this.currentQuestion.items[btn_number].image.id);
        this.renderer.setStyle(btn_rank, 'background', 'lightgrey');
        this.renderer.setProperty(btn_rank, 'innerHTML', 'Platz '+(this.count_items+1));
        this.renderer.setProperty(btn_rank, 'color', '#34a7bd');
        this.renderer.setProperty(btn_rank, 'disabled', 'true');
        this.rankingQuestionClick(btn_number);
        break;

      case 'LikeDislikeQuestion':
        this.sub.unsubscribe();
        this.likeDislikeQuestion(btn_number);
        let btn_like: HTMLElement = document.getElementById("btn_like");
        let btn_dislike: HTMLElement = document.getElementById("btn_dislike");
        this.renderer.setProperty(btn_like, 'disabled', 'true');
        this.renderer.setProperty(btn_dislike, 'disabled', 'true');
        break;

      case 'RegulatorQuestion':
        this.sub.unsubscribe();
          //TODO Schöner gestalten Einfärben der Buttons bei Auswählen der Schritte
        let j=0;
        //Alle 4 Buttons disablen
        while(j<4){
          let btn_reg: HTMLElement=document.getElementById("ranking_"+j);
          this.renderer.setProperty(btn_reg, 'disabled', 'true');
          j++;
        }
        this.regulatorQuestionClick(btn_number);
        break;

      case 'ChoiceQuestion': 
        this.sub.unsubscribe();
        this.disableAllButtens();
        this.choiceQuestionClick(btn_number);
        break;

      case 'LikeQuestion':
        this.sub.unsubscribe();
        this.disableAllButtens();
        this.likeQuestionClick(btn_number);
        break;

      case 'FavoriteQuestion':
        this.sub.unsubscribe();
        this.disableAllButtens();
        this.favoriteQuestionClick(btn_number);
        break;
      }
    }


 public ngOnInit(): void {
      this.currentProject = this.dataService.getContext();
      this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()];
      if (this.currentQuestion.__typename=="RankingQuestion"){


       this.max_items= this.currentQuestion.items.length;
        

        this.max_items= 0;

      }
     
            //TODO rausnehmen, nur für testdaten drin

        this.count_items= 0;
      
      //TODO rausnehmen, nur für testdaten drin

      this.currentQuestion.items[0].image.url="../../../assets/images/checklist-1295319_1280.png";
      this.currentQuestion.items[1].image.url="../../../assets/images/checklist-2023731_1280.png";

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
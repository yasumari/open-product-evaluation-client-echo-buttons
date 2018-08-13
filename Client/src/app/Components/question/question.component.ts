import { Component, OnInit, OnDestroy} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService} from '../../Services/data.service';
import {favoriteAnswerMutate, likeAnswerMutate, likeDislikeAnswerMutate, rankingAnswerMutate, regulatorAnswerMutate, choiceAnswerMutate} from './question.model';
import { Router } from '@angular/router';
import { MessageService } from '../../Services/message.service';
import { Context, Answer, Question } from '../../types';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: []
})

export class QuestionComponent implements OnInit, OnDestroy {
  sub: Subscription;
  public currentProject: Context;
  private currentAnswer: Answer;
  private currentQuestion: Question;
 
  public n:any;


 constructor(private apollo: Apollo, private dataService: DataService, private router: Router, private messageService: MessageService) 
 {}



/*-------------TODO auslagern-------------------- */
favoriteQuestionClick(btn_number: number){
  //TODO btn_number sagt welches Item im Array gewählt wurde 
  //Button 0,1,2,3
  //       | | | |
  //Items  0,1,2,3
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
  this.dataService.setAnswerNumber();
  this.router.navigate(['/feedback']);
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
  this.dataService.setAnswerNumber();
  this.router.navigate(['/feedback']);
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
  this.dataService.setAnswerNumber();
  this.router.navigate(['/feedback']);
}

regulatorQuestionClick(btn_number: number){
  /*TODO: normalized Wird im Backend berechnet? */
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
  this.dataService.setAnswerNumber();
  //TODO noch ein Timer setzen ?
  this.router.navigate(['/feedback']);
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
  this.dataService.setAnswerNumber();
  //TODO noch ein Timer setzen ?
  this.router.navigate(['/feedback']);
}

rankingQuestionClick(btn_number: number){
  //TODO
  console.log("Ranking noch nicht umgesetzt");  
}


   buttonClick(btn_number: number){    
    console.log("Button: " + btn_number);
    this.dataService.setChosenImageUrl(this.currentQuestion.items[btn_number].image.url);
    this.currentAnswer={
      questionID: this.currentQuestion.id,
      deviceID: this.dataService.getDeviceID(), 
      contextID: this.dataService.getContextID()
    }
//Unterscheidung des Fragetypens und damit auch die Antwort
    switch(this.currentQuestion.__typename){
      case 'RankingQuestion':
        this.rankingQuestionClick(btn_number);
        break;
      case 'LikeDislikeQuestion':
        this.sub.unsubscribe();
        this.likeDislikeQuestion(btn_number);
        break;
      case 'RegulatorQuestion':
        this.sub.unsubscribe();
        this.regulatorQuestionClick(btn_number);
        break;
      case 'ChoiceQuestion': 
        this.sub.unsubscribe();
        this.choiceQuestionClick(btn_number);
        break;
      case 'LikeQuestion':
        this.sub.unsubscribe();
        this.likeQuestionClick(btn_number);
        break;
      case 'FavoriteQuestion':
        this.sub.unsubscribe();
        this.favoriteQuestionClick(btn_number);
        break;
      }
    }


  //Progressbar
  calculate():string {
    return (this.dataService.getAnswerNumber()*100/this.currentProject.activeSurvey.questions.length)+"%";
  }

 public ngOnInit(): void {
      this.currentProject = this.dataService.getContext();
      console.log(this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()].__typename);
      this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()];
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





import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService} from '../data.service';
import {favoriteAnswerMutate} from './question.model';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Context, Answer, Question } from '../types';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: []
})

export class QuestionComponent implements OnInit, OnDestroy {
  messages=[];
  message: any;
  sub: Subscription;
  public currentProject: Context;
  private currentAnswer: Answer;
  private token: string;
  private currentQuestion: Question;


 constructor(private apollo: Apollo, private dataService: DataService, private router: Router, private messageService: MessageService) 
 {
 }

   buttonClick(btn_number: number)
 {    
    console.log(btn_number + " wurde gedrück");
    this.messageService.clearMessage();
    //TODO btn_number sagt welches Item im Array gewählt wurde 
   this.currentAnswer={
   contextID: this.currentProject.id,
   deviceID: this.token,
   questionID: this.currentQuestion.id,
   favoriteImage: this.currentQuestion.items[btn_number-1].image.id,
 }
 
 //Sende Antwort der Frage an den Server
    this.apollo.mutate({
      fetchPolicy: 'no-cache',
     mutation: favoriteAnswerMutate,
     variables: { 
       contextID: this.currentAnswer.contextID,
       deviceID: this.currentAnswer.deviceID,
       questionID: this.currentAnswer.questionID,
       favoriteImage: this.currentAnswer.favoriteImage},
   }).subscribe((mutationResponse) => 
         console.log("mutation", mutationResponse));
         this.dataService.setAnswerNumber();
          this.router.navigate(['/feedback']);
      }
   

  private position :any;
calculate ():string {
  return (this.dataService.getAnswerNumber()*100/this.currentProject.activeSurvey.questions.length)+"%";
}

 public ngOnInit(): void {
  this.sub=this.messageService.getMessage().subscribe( message => {
    //Sobald eine Nachricht erhalten wurde, vom messageService unsubsriben
    this.sub.unsubscribe();

    let tmp=parseInt(message);
    console.log("QUESTION: " + tmp);
    
    if (message == undefined || message == null){
     // dann wurde keine Nummer übergeben, also leere Nachricht erhalten, passiert nichts 
   } else {
     console.log("BUTTON GEDRÜCK: " + message);
    this.buttonClick(message);
   }
  })
       this.currentProject = this.dataService.getContext();
       this.token=this.dataService.getToken();
       this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()];
      }
      ngOnDestroy(){
        this.sub.unsubscribe();
    }
}
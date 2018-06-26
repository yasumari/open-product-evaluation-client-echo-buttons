import { Component, OnInit, Input} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService} from '../data.service';
import {CreateLinkMutationResponse, favoriteAnswerMutate} from './question.model';
import { Router } from '@angular/router';

import { Context, Answer} from '../types';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: []
  
})

export class QuestionComponent implements OnInit {
  public currentProject: Context;
  private currentAnswer: Answer;
 constructor(private apollo: Apollo, private dataService: DataService, private router: Router) 
 {

 }
   public currentPositionQuestion; 
   buttonClick(btn_number)
 {    
  //TODO btn_number in itemID, um dem Bild einen Button zuordnen zu können
  //TODO deviceID ändern
 this.currentAnswer={
  contextID: this.currentProject.id,
  deviceID: this.currentProject.devices[0].id,
  questionID: this.currentProject.activeQuestion.id,
  favoriteImage: "Button "+btn_number,
}
console.log(this.currentAnswer);
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

    //TODO letzte Position prüfen
      this.dataService.updatePositionQuestion();
     //Wurde die letzte Frage erreicht, dann zum Ende gehen
     ((this.currentPositionQuestion + 1) == this.currentProject.activeQuestion) ? this.router.navigate(['/end']) : this.router.navigate(['/feedback']);
     }

 public ngOnInit(): void {
      console.log("Question.component.ts init");
       this.currentProject = this.dataService.getContext();
       this.currentPositionQuestion = this.dataService.getPositionQuestion();
      console.log("current: "+ this.currentPositionQuestion);
     
      }
}
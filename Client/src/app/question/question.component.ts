import { Component, OnInit, Input} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService} from '../data.service';
import {favoriteAnswerMutate} from './question.model';
import { Router } from '@angular/router';

import { Context, Answer, Question } from '../types';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: []
  
})

export class QuestionComponent implements OnInit {
  public currentProject: Context;
  private currentAnswer: Answer;
  private token: string;
  private currentPositionQuestion;
  private currentQuestion: Question;
 
  public n:any;
  
 constructor(private apollo: Apollo, private dataService: DataService, private router: Router) 
 {}

   buttonClick(btn_number: number)
 {    
   //btn_number sagt welches Item im Array gewählt wurde 
 this.currentAnswer={
  contextID: this.currentProject.id,
  deviceID: this.token,
  questionID: this.currentQuestion.id,
  favoriteImage: this.currentQuestion.items[btn_number].image.id,
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

        //Nehme die nächste Position des Arrays, 
      this.dataService.updatePositionQuestion();
     //Wurde die letzte Frage erreicht, dann zum Ende gehen
     ((this.currentPositionQuestion + 1) == this.currentProject.activeSurvey.questions.length) ? this.router.navigate(['/end']) : this.router.navigate(['/feedback']);
     }

  private position :any;
  calculate ():string {
  return (this.currentPositionQuestion*100/this.currentProject.activeSurvey.questions.length)+"%";
     

}
  
 public ngOnInit(): void {
   
     
         
       this.currentProject = this.dataService.getContext();
       this.token=this.dataService.getToken();
       this.currentPositionQuestion = this.dataService.getPositionQuestion();
       this.currentQuestion = this.currentProject.activeSurvey.questions[this.currentPositionQuestion];
      }
}
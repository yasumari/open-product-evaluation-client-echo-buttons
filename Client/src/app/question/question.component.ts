import { Component, OnInit, Input} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService} from '../data.service';
import {CreateLinkMutationResponse, CurrentAnswerMutate} from './question.model';
import { Router } from '@angular/router';

import { Survey, Context, Vote} from '../types';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: []
  
})

export class QuestionComponent implements OnInit {
  public currentProject: Context;

 constructor(private apollo: Apollo, private dataService: DataService, private router: Router) 
 {

 }
   public currentPositionQuestion; 
    Arrayproject: Vote []= [];

   buttonClick(btn_number)
 {    
   //TODO btn_number in itemID, um dem Bild einen Button zuordnen zu können
   this.apollo.mutate({
    mutation: CurrentAnswerMutate,
    variables: { contextID: 1,
      deviceID: 1,
      questionID: 1,
      itemCode: "dsfdg",
      choiceCode: "hi"},
  }).subscribe(
    (d) => console.log("mutation", d));;

      this.dataService.updatePositionQuestion(); 
      for (var i=0; i<this.Arrayproject.length; i++){
        console.log(this.Arrayproject[i]._id);
      }
     //Wurde die letzte Frage erreicht, dann zum Ende gehen
     ((this.currentPositionQuestion + 1) == this.currentProject.activeQuestion) ? this.router.navigate(['/end']) : this.router.navigate(['/feedback']);
     }

 public ngOnInit(): void {
      console.log("Question.component.ts init");
       this.currentProject = this.dataService.getContext();
       this.currentPositionQuestion = this.dataService.getPositionQuestion();
      console.log("current: "+ this.currentPositionQuestion);
      //this.Arrayproject = this.dataService.getVote();
      }
}
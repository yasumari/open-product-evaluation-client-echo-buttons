import { Component, OnInit, OnDestroy} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService} from '../../Services/data.service';
import {favoriteAnswerMutate} from './question.model';
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
  private token: string;
  private currentQuestion: Question;
 
  public n:any;


 constructor(private apollo: Apollo, private dataService: DataService, private router: Router, private messageService: MessageService) 
 {}

   buttonClick(btn_number: number){    
      this.sub.unsubscribe();
      console.log(btn_number + " wurde gedrückt");
      //TODO btn_number sagt welches Item im Array gewählt wurde 
      //Button 1,2,3,4
      //       | | | |
      //Items  0,1,2,3

      switch(btn_number){
        case 1:  this.dataService.setChosenImageUrl("2"); break;
        case 2:  this.dataService.setChosenImageUrl("3"); break;
        case 3:  this.dataService.setChosenImageUrl("4"); break;
        case 4:  this.dataService.setChosenImageUrl("5"); break;
      }

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

  calculate():string {
    return (this.dataService.getAnswerNumber()*100/this.currentProject.activeSurvey.questions.length)+"%";
  }

 public ngOnInit(): void {
      this.currentProject = this.dataService.getContext();
      this.token=this.dataService.getToken();
      this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()];
      this.sub=this.messageService.getMessage().subscribe( message => {
          
          //TODO noch benötigt?
          if (message!=undefined || message!=null){
            this.buttonClick(message);
          } else {
            console.log("Button ungültigt Nachricht");
          }
      })
    }
    
    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}
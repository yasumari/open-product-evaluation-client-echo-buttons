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
  private currentQuestion: Question;
 
  public n:any;


 constructor(private apollo: Apollo, private dataService: DataService, private router: Router, private messageService: MessageService) 
 {}

   buttonClick(btn_number: number){    
     console.log("Button: " + btn_number);
      this.sub.unsubscribe();
      //TODO btn_number sagt welches Item im Array gewählt wurde 
      //Button 1,2,3,4
      //       | | | |
      //Items  0,1,2,3
      switch(btn_number){
        case 1:  
            this.dataService.setChosenImageUrl(this.currentQuestion.items[0].image.url); 
            break;
        case 2:  
            this.dataService.setChosenImageUrl(this.currentQuestion.items[1].image.url); 
            break;
        case 3:  
            this.dataService.setChosenImageUrl(this.currentQuestion.items[2].image.url); 
            break;
        case 4:   
            this.dataService.setChosenImageUrl(this.currentQuestion.items[3].image.url); 
            break;
      }

      this.currentAnswer={
        questionID: this.currentQuestion.id,
        deviceID: this.dataService.getDeviceID(), 
        contextID: this.dataService.getContextID()
      }

      
      //Sende Antwort der Frage an den Server
      //TODO die Votes sind this.currentProject.activeSurvey.votes
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: favoriteAnswerMutate,
        variables: { 
          questionID: this.currentAnswer.questionID,
          deviceID: this.currentAnswer.deviceID, 
          contextID: this.currentAnswer.contextID,
          favoriteImage:this.currentQuestion.items[btn_number-1].image.id},
      }).subscribe((mutationResponse) => 
        console.log("mutation", mutationResponse));
        this.dataService.setAnswerNumber();
        this.router.navigate(['/feedback']);
    }

  //Progressbar
  calculate():string {
    return (this.dataService.getAnswerNumber()*100/this.currentProject.activeSurvey.questions.length)+"%";
  }

 public ngOnInit(): void {
      this.currentProject = this.dataService.getContext();
      console.log(this.currentProject.activeSurvey);
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
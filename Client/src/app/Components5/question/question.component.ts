import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { MessageService } from '../../Services/message.service';
import { Context, Question } from '../../types';
import { Subscription } from 'rxjs/Subscription';
import { QuestionService } from "./question.service";
import { SubscriptionsService } from "./../../Services/subscriptions.service";
import { updateDevice } from './../../GraphQL/Device.gql';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Constants } from '../../constants';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit, OnDestroy {
  subSockets: Subscription;
  subContext: Subscription;
  private  ranking=[];
  private currentProject: Context;
  private currentAnswer;
  private currentQuestion: Question;
  private step;
  public count_items=0;
  private valueBTN = [];

  constructor(
    private questionService: QuestionService,
    private apollo: Apollo,
    private renderer: Renderer2,
    private dataService: DataService,
    private router: Router,
    private messageService: MessageService,
    private subscriptionsService: SubscriptionsService,
    private dialog: MatDialog) {
  }

  /**
   * @description Berechnet aus den beantworteten und noch offenen Fragen eine Progressbar-Fortschritt
   */
  calculate(): string {
    return (Math.round(this.dataService.getAnswerNumber() * 100 / this.currentProject.activeSurvey.questions.length)) + "%";
  }

  regulatorButtonValues(diff, possibleNumbers, min, max): Number {
    if (possibleNumbers.includes(min + diff)) {
      if ((min + diff) == max) {
        return null
      }
      return (min + diff);
    } else {
      for (let i of possibleNumbers) {
        if (i > (min + diff)) {
          if (i >= max) {
            return null
          }
          return i;
        }
      }
    }
    return null;
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
  buttonClick(btn_number: number):void {
   

    if(btn_number == 1){
    this.dataService.setChosenImageUrlarray("http://localhost:3000/static/images/default/saft1.jpeg");
    this.dataService.setChosenQuestionarray("FavoriteQuestion");
    let url= this.dataService.getChosenImageUrlarray();
    console.log("url set "+url);
                       }
    if(btn_number== 2){
    this.dataService.setChosenImageUrlarray("http://localhost:3000/static/images/default/saft2.jpeg");
    this.dataService.setChosenQuestionarray("FavoriteQuestion");
    let url= this.dataService.getChosenImageUrlarray();}
    if(btn_number == 3){
      this.dataService.setChosenImageUrlarray("http://localhost:3000/static/images/default/saft3.jpeg");
      this.dataService.setChosenQuestionarray("FavoriteQuestion");
      let url= this.dataService.getChosenImageUrlarray();
      console.log("url set "+url);
                         }
  if(btn_number == 4){
   this.dataService.setChosenImageUrlarray("http://localhost:3000/static/images/default/saft4.jpeg");
                          this.dataService.setChosenQuestionarray("FavoriteQuestion");
                          let url= this.dataService.getChosenImageUrlarray();
                          console.log("url set "+url);
                                             }

  if(btn_number == 5){
   this.dataService.setChosenImageUrlarray("http://localhost:3000/static/images/default/saft5.jpeg");
                                              this.dataService.setChosenQuestionarray("FavoriteQuestion");
                                              let url= this.dataService.getChosenImageUrlarray();
                                              console.log("url set "+url);
                                                                 }

    this.router.navigateByUrl("/feedback");
   // this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, btn_number, this.apollo, this.renderer, this.dataService, this.router);
  // this.questionService.answer("FavoriteQuestion", this.currentAnswer, btn_number, this.apollo, this.renderer, this.dataService, this.router);
  }
  buttonBack():void{ this.dataService.setAnswerNumber(0);
  this.router.navigateByUrl("/");
  }
  buttondelete():void{
    this.currentAnswer = {
      questionID: this.currentQuestion.id
    }
    switch (this.currentQuestion.__typename) {
      case"RankingQuestion":
      {console.log("delete farbe ranking");
      
      for (var i = 0; i < this.currentQuestion.items.length; i++) 
              {
                const btn_rank: HTMLElement = document.getElementById(this.currentQuestion.items[i].id);
               if(i==0){
                this.renderer.setStyle(btn_rank, 'background', '#ff7783');
                this.renderer.setProperty(btn_rank, 'color', '#ff7783');
                  }
                  if(i==1){
                    this.renderer.setStyle(btn_rank, 'background', '#87e259');
                    this.renderer.setProperty(btn_rank, 'color', '#87e259');
                      }
                      if(i==2){
                        this.renderer.setStyle(btn_rank, 'background', '#fed500');
                        this.renderer.setProperty(btn_rank, 'color', '#fed500');
                          }
                          if(i==3){
                            this.renderer.setStyle(btn_rank, 'background', '#1e90ff');
                            this.renderer.setProperty(btn_rank, 'color', '#1e90ff');
                              }
                              
                this.renderer.setProperty(btn_rank, 'enabled', 'true');
                this.renderer.setProperty(btn_rank, 'innerHTML', '');
               
                this.count_items--;
              
              }
      }break;
      case "RegulatorQuestion":
      {console.log("delete farbe");
      for (var i = 0; i < this.currentQuestion.items.length; i++) 
              {
                const btn_reg: HTMLElement = document.getElementById(this.currentQuestion.items[i].id);
               if(i==0){
                this.renderer.setStyle(btn_reg, 'background', '#ff7783');
                this.renderer.setProperty(btn_reg, 'color', '#ff7783');
                  }
                  if(i==1){
                    this.renderer.setStyle(btn_reg, 'background', '#87e259');
                    this.renderer.setProperty(btn_reg, 'color', '#87e259');
                      }
                      if(i==2){
                        this.renderer.setStyle(btn_reg, 'background', '#fed500');
                        this.renderer.setProperty(btn_reg, 'color', '#fed500');
                          }
                          if(i==3){
                            this.renderer.setStyle(btn_reg, 'background', '#1e90ff');
                            this.renderer.setProperty(btn_reg, 'color', '#1e90ff');
                              }
                              
                this.renderer.setProperty(btn_reg, 'enabled', 'true');
                this.renderer.setProperty(btn_reg, 'innerHTML', '');

              }
      }break;
      case"FavoriteQuestion":
       {console.log("delete farbe");
        for (var i = 0; i < this.currentQuestion.items.length; i++) 
              {
                const btn_fav: HTMLElement = document.getElementById(this.currentQuestion.items[i].id);
               if(i==0){
                this.renderer.setStyle(btn_fav, 'background', '#ff7783');
                this.renderer.setProperty(btn_fav, 'color', '#ff7783');
                  }
                  if(i==1){
                    this.renderer.setStyle(btn_fav, 'background', '#87e259');
                    this.renderer.setProperty(btn_fav, 'color', '#87e259');
                      }
                      if(i==2){
                        this.renderer.setStyle(btn_fav, 'background', '#fed500');
                        this.renderer.setProperty(btn_fav, 'color', '#fed500');
                          }
                          if(i==3){
                            this.renderer.setStyle(btn_fav, 'background', '#1e90ff');
                            this.renderer.setProperty(btn_fav, 'color', '#1e90ff');
                              }
                              
                this.renderer.setProperty(btn_fav, 'enabled', 'true');
                this.renderer.setProperty(btn_fav, 'innerHTML', '');

      
              }
       }break;
      case"ChoiceQuestion":
        {console.log("delete farbe lange choice",this.currentQuestion.choices.length);
          
                        for (var i = 0; i < this.currentQuestion.choices.length; i++) 
                        {
                          const btn_rank: HTMLElement = document.getElementById(this.currentQuestion.choices[i].id);
                         if(i==0){
                          this.renderer.setStyle(btn_rank, 'background', '#eb0e1c');
                          this.renderer.setProperty(btn_rank, 'color', '#eb0e1c');
                            }
                            if(i==1){
                              this.renderer.setStyle(btn_rank, 'background', '#118714');
                              this.renderer.setProperty(btn_rank, 'color', '#118714');
                                }
                                if(i==2){
                                  this.renderer.setStyle(btn_rank, 'background', '#fe9800');
                                  this.renderer.setProperty(btn_rank, 'color', '#fe9800');
                                    }
                                   
                                        
                          this.renderer.setProperty(btn_rank, 'enabled', 'true');
                          this.renderer.setProperty(btn_rank, 'innerHTML', '');
                  
                        
                        }    
                         
                              
               
    
          }  
        break;
      case"LikeDislikeQuestion":
        {console.log("delete farbe");
          for (var i = 0; i < this.currentQuestion.items.length; i++) 
          {
            const btn_ld: HTMLElement = document.getElementById(this.currentQuestion.items[i].id);
               if(i==0){
                this.renderer.setStyle(btn_ld, 'background', '#ff7783');
                this.renderer.setProperty(btn_ld, 'color', '#ff7783');
                  }
                  if(i==1){
                    this.renderer.setStyle(btn_ld, 'background', '#87e259');
                    this.renderer.setProperty(btn_ld, 'color', '#87e259');
                      }
                      
                              
                this.renderer.setProperty(btn_ld, 'enabled', 'true');
                this.renderer.setProperty(btn_ld, 'innerHTML', '');
    
          }
        }break;
      case "LikeQuestion":
        {console.log("delete farbe");
          for (var i = 0; i < this.currentQuestion.items.length; i++) 
          {
            const btn_l: HTMLElement = document.getElementById(this.currentQuestion.items[i].id);
               if(i==0){
                this.renderer.setStyle(btn_l, 'background', '#ff7783');
                this.renderer.setProperty(btn_l, 'color', '#ff7783');
                  }
                  if(i==1){
                    this.renderer.setStyle(btn_l, 'background', '#87e259');
                    this.renderer.setProperty(btn_l, 'color', '#87e259');
                      }
                     
                              
                this.renderer.setProperty(btn_l, 'enabled', 'true');
                this.renderer.setProperty(btn_l, 'innerHTML', '');
    
          }
        }break;

    }
     
  } 
 
 
  public ngOnInit(): void {
    
   

    
    /*Für die Auskunft, welcher Platz gerade gewählt wird,
     muss die Anzahl der Button-Klicks berechnet werden. Erhöht sich bei rankingQuestionClick*/

   

    
  }

  ngOnDestroy() {
   
  }
}

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
  private currentProject: Context;
  private currentAnswer;
  private currentQuestion: Question;
  private ranking = [];
  private count_items;
  private step;
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
  buttonClick(btn_number: number) {
    this.currentAnswer = {
      questionID: this.currentQuestion.id
    }
    if (this.currentQuestion.__typename == "RankingQuestion") {
      if (btn_number >= this.currentQuestion.items.length) {
        console.log("Button hat kein zugehöriges Bild");
      } else {
        const btn_rank: HTMLElement = document.getElementById(this.currentQuestion.items[btn_number].id);
        this.renderer.setStyle(btn_rank, 'background', 'lightgrey');
        this.renderer.setProperty(btn_rank, 'color', '#34a7bd');
        this.renderer.setProperty(btn_rank, 'disabled', 'true');
        this.renderer.setProperty(btn_rank, 'innerHTML', 'Platz ' + (this.count_items + 1));

        //RankingQuestion: mutation besondere Variable:  rankedImages - in welcher Reihenfolge wurden die Bilder ausgewählt
        // [1,2,3,...] - 1 schlecht, 2 mittel, 3 am besten...
        this.ranking.unshift(this.currentQuestion.items[btn_number].id);
        if (this.ranking.length == this.currentQuestion.items.length) {
          this.currentAnswer.ranking = this.ranking;
          //Im Feedback Platz 1 anzeigen
          for (var i = 0; i < this.currentQuestion.items.length; i++) {
            if (this.ranking[this.ranking.length - 1] == this.currentQuestion.items[i].id) {
              this.dataService.setChosenImageUrl(this.currentQuestion.items[i].image.url);
            }
          }
          this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, btn_number, this.apollo, this.renderer, this.dataService, this.router);
        } else {
          this.count_items++;
        }
      }
    } else {if(this.currentQuestion.__typename == "ChoiceQuestion"){
      console.log("number :: ",btn_number);
      const btn_ch: HTMLElement = document.getElementById(this.currentQuestion.choices[btn_number].id);
        this.renderer.setStyle(btn_ch, 'background', 'lightgrey');
        this.renderer.setProperty(btn_ch, 'color', '#34a7bd');
        this.renderer.setProperty(btn_ch, 'disabled', 'true');
        this.renderer.setProperty(btn_ch, 'innerHTML', ' ');
         }
        
         
     this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, btn_number, this.apollo, this.renderer, this.dataService, this.router);
    }
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
    this.currentProject = this.dataService.getContext();
    this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()];
    console.log("Angezeigt Frage: " + this.dataService.getAnswerNumber());
    /*Für die Auskunft, welcher Platz gerade gewählt wird,
     muss die Anzahl der Button-Klicks berechnet werden. Erhöht sich bei rankingQuestionClick*/

    if (this.currentQuestion.__typename == "RankingQuestion") {
      this.count_items = 0;
    }

    if (this.currentQuestion.__typename == "RegulatorQuestion") {
      /**
       * @description Besonders für Regulator müssen die Zahlenwerte berechnet werden,
       * da die Buzzer nur 4 Werte darstellen können
       */
      this.step = this.currentQuestion.stepSize;
      let range = (this.currentQuestion.max - this.currentQuestion.min) / 3;
      let i = this.currentQuestion.min;
      let possibleNumbers = [];
      //Alle Möglichen Werte
      while (i <= this.currentQuestion.max) {
        possibleNumbers.push(i);
        i += this.step;
      }
      let value = this.regulatorButtonValues(range, possibleNumbers, this.currentQuestion.min, this.currentQuestion.max);
      let value2 = this.regulatorButtonValues((range + range), possibleNumbers, this.currentQuestion.min, this.currentQuestion.max);

      /**
       * immer die Button von min - max sichtbar
       * wenn button1=min, dann button2=max, daher die Abfragen
       * Vorher waren button1=min und button4=max, und die dazwischen wurden geprüft mit null
       */
      if (value == null && value2 == null) {
        this.valueBTN=[this.currentQuestion.min, this.currentQuestion.max]
        this.dataService.setRegulatorsValue(this.valueBTN);
      }
      else if (value != null && value2 == null) {
        this.valueBTN=[this.currentQuestion.min, value, this.currentQuestion.max]
        this.dataService.setRegulatorsValue(this.valueBTN);
      }
      else {
        this.valueBTN.push(this.currentQuestion.min);
        this.valueBTN=[this.currentQuestion.min, value, value2, this.currentQuestion.max]
        this.dataService.setRegulatorsValue(this.valueBTN);
      }
    }

    console.log(this.currentQuestion);
    console.log(this.currentProject.activeSurvey.votes);

    //Subscribed die Socket-Kommunikation, falls neue Nachrichten reinkommen
    this.subSockets = this.messageService.getMessage().subscribe(message => {
      if (message != undefined || message != null) {
        this.buttonClick(parseInt(message));
      } else {
        console.log("Button ungültig Nachricht");
      }
    })

    //Subscribed Context, falls Updates reinkommen, dann zurück zur Startseite und Device abmelden
    this.subContext = this.subscriptionsService.getMessageSubscription().subscribe(message => {
      console.log("Message: " + message);
      //Vorher noch benachrichtigen, dass es zum Anfang geht
        console.log("Abmelden");
        this.apollo.mutate({
          fetchPolicy: 'no-cache',
          mutation: updateDevice,
          variables: {
            deviceID: this.dataService.getDeviceID(),
            context: null,
          }
        }).subscribe(({data}) => {
            console.log("mutation update DeviceContext", data);
            //Position der Umfrage wieder zum Anfang setzen
            this.dataService.setAnswerNumber(0);
            //close Dialog nach paar Sekungen und dann zurück zum Anfang
            let dialogRef=this.dialog.open(DialogComponent, {
              minHeight: '20%',
              minWidth: '40%'
            });
            setTimeout(() => {
              dialogRef.close();
              this.router.navigateByUrl("/");
            }, Constants.TIMER_DIALOG);
          });
    })
  }

  ngOnDestroy() {
    this.subContext.unsubscribe();
    this.subContext=undefined;
    this.subSockets.unsubscribe();
    this.subSockets=undefined;
  }
}

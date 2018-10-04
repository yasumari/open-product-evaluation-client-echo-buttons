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
    this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, btn_number, this.apollo, this.renderer, this.dataService, this.router);
  }


  public ngOnInit(): void {
    this.currentProject = this.dataService.getContext();
    this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()];
    console.log("Angezeigt Frage: " + this.dataService.getAnswerNumber());
    /*Für die Auskunft, welcher Platz gerade gewählt wird,
     muss die Anzahl der Button-Klicks berechnet werden. Erhöht sich bei rankingQuestionClick*/

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

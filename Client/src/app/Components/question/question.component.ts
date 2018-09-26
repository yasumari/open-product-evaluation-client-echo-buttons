import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { MessageService } from '../../Services/message.service';
import { Context, Question } from '../../types';
import { Subscription } from 'rxjs/Subscription';
import { QuestionService } from "./question.service";
import { SubscriptionsService } from "./../../Services/subscriptions.service";
import { updateDevice } from './../../GraphQL/Device.gql';
import { Overlay, OverlayContainer, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlaySurveyComponent } from '../overlay-survey/overlay-survey.component';

@Component({
  providers: [
    { provide: OverlayContainer }
  ],
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  entryComponents: [ OverlaySurveyComponent ]
})

export class QuestionComponent implements OnInit, OnDestroy {
  subSockets: Subscription;
  subContext: Subscription;
  private currentProject: Context;
  private currentAnswer;
  private currentQuestion: Question;
  private ranking = [];
  private count_items;
  private min;
  private max;
  private step;
  private valueBtn1;
  private valueBtn2;
  private valueBtn3;

  constructor(
    private questionService: QuestionService,
    private apollo: Apollo,
    private renderer: Renderer2,
    private dataService: DataService,
    private router: Router,
    private messageService: MessageService,
    private subscriptionsService: SubscriptionsService,
    private overlay: Overlay) {

    //Subscribed Context, falls Updates reinkommen, dann zurück zur Startseite und Device abmelden
    this.subContext = this.subscriptionsService.getMessageSubscription().subscribe(message => {
      //Vorher noch benachrichtigen, dass es zum Anfang geht
        console.log("Abmelden");
        this.apollo.mutate({
          fetchPolicy: 'no-cache',
          mutation: updateDevice,
          variables: {
            deviceID:this.dataService.getDeviceID(),
            context: null,
          }
        }).subscribe(({data}) => { 
            console.log("mutation update DeviceContext", data);
            //Zurück zum Anfang
            //this.router.navigateByUrl("/");
          });
    })
    //Subscribed die Socket-Kommunikation, falls neue Nachrichten reinkommen
    this.subSockets = this.messageService.getMessage().subscribe(message => {
      console.log("MESSAGE: " + message);
      if (message != undefined || message != null) {
        this.buttonClick(parseInt(message));
      } else {
        console.log("Button ungültig Nachricht");
      }
    })
  }

  openOverlay(){
    /*const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();*/
    let overlayRef = this.overlay.create({height: '5000px', width: '1200px',});
    const filePreviewPortal = new ComponentPortal(OverlaySurveyComponent);
    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);
  }
  /**
   * @description Berechnet aus den beantworteten und noch offenen Fragen eine Progressbar-Fortschritt
   */
  calculate(): string {
    return (Math.round(this.dataService.getAnswerNumber() * 100 / this.currentProject.activeSurvey.questions.length)) + "%";
  }

  regulatorButtonValues(diff, possibleNumbers): Number {
    if (possibleNumbers.includes(this.min + diff)) {
      if ((this.min + diff) == this.max) {
        return null
      }
      return (this.min + diff);
    } else {
      for (let i of possibleNumbers) {
        if (i > (this.min + diff)) {
          if (i >= this.max) {
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
          //TODO welche Reihenfolge Array in die richtige Reihenfolge bringen. oder umgekehrte Reihenfolge?
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

    } else {
      this.questionService.answer(this.currentQuestion.__typename, this.currentAnswer, btn_number, this.apollo, this.renderer, this.dataService, this.router);
    }
  }


  public ngOnInit(): void {
    this.currentProject = this.dataService.getContext();
    this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()];
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
      this.min = this.currentQuestion.min;
      this.max = this.currentQuestion.max;
      this.step = this.currentQuestion.stepSize;
      let range = (this.max - this.min) / 3;
      let i = this.min;
      let possibleNumbers = [];
      //Alle Möglichen Bewertungen
      while (i <= this.max) {
        possibleNumbers.push(i);
        i += this.step;
      }
      let value = this.regulatorButtonValues(range, possibleNumbers);
      let value2 = this.regulatorButtonValues((range + range), possibleNumbers);


      /**
       * immer die Button von min - max sichtbar
       * wenn button1=min, dann button2=max, daher die Abfragen
       * Vorher waren button1=min und button4=max, und die dazwischen wurden geprüft mit null
       */
      if (value == null && value2 == null) {
        this.valueBtn1 = this.max;
        this.valueBtn2 = null;
        this.valueBtn3 = null;
        this.dataService.setRegulatorsValue([this.min, this.max, null, null]);
      }
      else if (value != null && value2 == null) {
        this.valueBtn1 = value;
        this.valueBtn2 = this.max;
        this.valueBtn3 = null;
        this.dataService.setRegulatorsValue([this.min, this.valueBtn1, this.max, null]);
      }
      else {
        this.valueBtn1 = value;
        this.valueBtn2 = value2;
        this.valueBtn3 = this.max;
        this.dataService.setRegulatorsValue([this.min, this.valueBtn1, this.valueBtn2, this.max]);
      }

    }
  }


  ngOnDestroy() {
    this.subContext.unsubscribe();
    this.subContext=undefined;
    this.subSockets.unsubscribe();
    this.subSockets=undefined;
  }
}
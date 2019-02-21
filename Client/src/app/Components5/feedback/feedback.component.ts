import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { MessageService } from '../../Services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Context, Question } from '../../types';
import { Constants } from '../../constants';
import { SubscriptionsService } from '../../Services/subscriptions.service';
import { Apollo } from 'apollo-angular';
import { updateDevice } from './../../GraphQL/Device.gql'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  subContext: Subscription;
  private title_nextPage;
  private max: number;
  private image: string[];
  private timer;

  public currentProject: Context;
  public currentQuestion: Question;

  public DataAntwort: number = 0;
  public DataAntwort1: number = 0;
  public DataAntwort2: number = 0;
  public DataAntwort3: number = 0;
  public DataAntwortP: number = 0;
  public DataAntwortP1: number = 0;

  public barChartOptions: any = {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          beginAtZero: true
        }
      }]
    },
    size: {
      width: 5,
      left: 5,
      rigth: 5
    },
    responsive: true,
    title: {
      text: '',
      fontColor: "white",
      fontSize: 20,
      fontFamily: "Raleway",
      fontWeight: 400,
      display: true
    }
  };
 
 

  constructor(private apollo: Apollo,
    private dataService: DataService,
    private router: Router,
    private messageService: MessageService,
    private subscriptionsService: SubscriptionsService,
    private dialog: MatDialog) {
  }
  nextPage() {
    //Button wurde gedrückt, dann stoppt der Timer
    clearTimeout(this.timer);
    this.sub.unsubscribe();
    this.subContext.unsubscribe();
    //Prüfe ob zum Ende oder zur nächsten Frage
    (this.dataService.getAnswerNumber() == this.max) ? this.router.navigate(['/end']) : this.router.navigate(['/question']);
  }
   /**
   * @description zurück zur Startseite
   */
  goBackToListProjects(): void{
   
    this.router.navigate(['/']);
  }

  ngOnInit() {
    let k;

    

    
    

    let url= this.dataService.getChosenImageUrlarray();
    this.image=(url!=null) ? url : null;
    
    this.title_nextPage="Vielen Dank für Ihre Teilnahme!";
    //ButtonSubscriptions der Nachrichten, Button wählt die nächste Seite aus, egal welcher Button gedrückt wurde
    

    //Subscribed Context, falls Updates reinkommen, dann zurück zur Startseite und Device abmelden
    this.subContext = this.subscriptionsService.getMessageSubscription().subscribe(message => {
      console.log("Abmelden, denn " + message);
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: updateDevice,
        variables: {
          deviceID:this.dataService.getDeviceID(),
          context: null,
        }
      }).subscribe(({data}) => {
        console.log("mutation update DeviceContext", data);
        //Position der Fragen auf 0 setzen
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

  }
}

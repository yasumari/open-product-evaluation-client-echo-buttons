import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {DataService } from '../../Services/data.service';
import { updateDevice, deleteDevice} from './../../GraphQL/Device.gql';
import { MessageService} from '../../Services/message.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SubscriptionsService } from '../../Services/subscriptions.service';
import { Context, Question } from '../../types';
import { Constants } from '../../constants';



@Component({
  
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})

 
export class EndScreenComponent implements OnInit {
  private i: number;
  private max: number;
  private image1:string[]=[];
  private value:any[]=[];
  private sub: Subscription;
  private deviceID;
  public currentProject: Context;
  public currentQuestion: Question;
  public DataAntwort:number=0;
 
  constructor(
    private apollo: Apollo, 
    private router: Router, 
    private dataService: DataService, 
    private messageService: MessageService,
    private subscriptionsService: SubscriptionsService) {}
  
    private timer;
  
  /**
   * @description KontextID des aktuellen Geräts auf null setzen
   */
  abmelden(): void{
    console.log("Abmelden");
    this.apollo.mutate({
      fetchPolicy: 'no-cache',
      mutation: updateDevice,
      variables: {
        deviceID: this.deviceID,
        context: null,
      }
    }).subscribe(({data}) => { 
        console.log("mutation update DeviceContext", data);
      });
  }

  /**
   * @description Das Gerät beim Server löschen (für Umfrage z.B. Smartphones)
   */
  deleteDevice(): void{
    this.apollo.mutate({
      fetchPolicy: 'no-cache',
      mutation: deleteDevice,
      variables: {
        deviceID: this.deviceID,
        context: null,
      }
    }).subscribe(({data}) => { 
        console.log("mutation deleteDevice", data.deleteDevice.status);
      });
  }

  /**
   * @description zurück zur Startseite
   */
  goBackToListProjects(): void{
    this.sub.unsubscribe();
    this.subscriptionsService.unsub();
    this.dataService.setPositionQuestion(0);
    this.dataService.setAnswerNumberZero();
    clearTimeout(this.timer);
    this.abmelden();
    this.router.navigate(['/']);
  }

  public ngOnInit(): void {
    
    this.currentProject = this.dataService.getContext();
    //meiste image gewählt:
  
    this.image1=this.dataService.getChosenImageUrlarray();
    this.value=this.dataService.getMaxAntwortArray();
    
    
    this.max=this.dataService.getContext().activeSurvey.questions.length;
  
    
   
    
    this.deviceID=this.dataService.getDeviceID();

    //Buzzer gedrückt, dann zurück zur Startseite
    this.sub=this.messageService.getMessage().subscribe( message => {
      this.goBackToListProjects();
    });
    
  this.timer= setTimeout( () => {
    this.goBackToListProjects();
}, Constants.TIMER_END);  
  }
  }
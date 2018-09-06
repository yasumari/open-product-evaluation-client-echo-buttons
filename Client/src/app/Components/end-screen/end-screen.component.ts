import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {DataService } from '../../Services/data.service';
import { updateDevice, deleteDevice} from './end-screen.model';
import { MessageService} from '../../Services/message.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { Context, Answer, Question } from '../../types';



@Component({
  
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})

 

export class EndScreenComponent implements OnInit {
  private sub: Subscription;
  private deviceID;
  public currentProject: Context;
  public currentQuestion: Question;
  public DataAntwort:number=0;
 public bild :any[] = [];
  constructor(private apollo: Apollo, private router: Router, private dataService: DataService, private messageService: MessageService) {
  }
  
  
  abmelden(): void{
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

  deleteDevice(): void{
    console.log("DEVICE ID: " + this.deviceID);
    this.apollo.mutate({
      fetchPolicy: 'no-cache',
      mutation: deleteDevice,
      variables: {
        deviceID: this.deviceID,
        context: null,
      }
    }).subscribe(({data}) => { 
        //console.log("mutation deleteDevice", data.deleteDevice.status);
      });
  }

  goBackToListProjects(){
    this.sub.unsubscribe();
    this.dataService.setPositionQuestion(0);
    this.dataService.setAnswerNumberZero();
    this.router.navigate(['/']);
  }

  public ngOnInit(): void {
    this.currentProject = this.dataService.getContext();
    //loop question length
    this.bild[0]=this.dataService.getArrayBilder()[0];
    this.currentQuestion.items[0].image.url=this.dataService.getChosenImageUrlarray()[0];
    
    //this.currentQuestion = this.currentProject.activeSurvey.questions[this.bild[0]];
    
    this.deviceID=this.dataService.getDeviceID();
    this.sub=this.messageService.getMessage().subscribe( message => {
      console.log("EndScreenMessage: " + message);
      this.goBackToListProjects();
    });
  }
  }
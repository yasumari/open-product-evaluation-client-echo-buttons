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
  constructor(private apollo: Apollo, private router: Router, private dataService: DataService, private messageService: MessageService) {
  }
  
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels:string[] = [];
 
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [], label: 'Series A'},
    {data: [], label: 'Series B'}
  ];
 
  // events
  public chartClicked(e:any):void {
   
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
  //abmelden setzt nur context auf null
  //TODO Gerät vollständig entfernen
  abmelden(): void{
    this.apollo.mutate({
      fetchPolicy: 'no-cache',
      mutation: updateDevice,
      variables: {
        deviceID: this.deviceID,
        context: null,
      }
    }).subscribe(({data}) => { 
        //console.log("mutation update DeviceContext", data);
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
    
    console.log("Frage  name ",this.currentProject.activeSurvey.questions);
    //console.log("nombre de reponse ",this.currentProject.activeSurvey.votes.length);
    for (let i = 0; i < this.currentProject.activeSurvey.questions.length; i++) {
      this.barChartLabels[i] = this.currentProject.activeSurvey.questions[i].description;
      this.barChartData[i].data[i] = this.currentProject.activeSurvey.questions[i].value;
    }
    this.deviceID=this.dataService.getDeviceID();
    this.sub=this.messageService.getMessage().subscribe( message => {
      console.log("EndScreenMessage: " + message);
      this.goBackToListProjects();
    });
  }
  }
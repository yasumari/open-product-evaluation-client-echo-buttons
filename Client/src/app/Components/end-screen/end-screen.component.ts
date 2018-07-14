import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {DataService } from '../../Services/data.service';
import { updateDevice, deleteDevice} from './end-screen.model';
import { MessageService} from '../../Services/message.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit {
  private sub: Subscription;
  private deviceID;
  constructor(private apollo: Apollo, private router: Router, private dataService: DataService, private messageService: MessageService) {
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
        console.log("mutation update DeviceContext", data);
      });
  }

  deleteDevice(): void{
    this.apollo.mutate({
      fetchPolicy: 'no-cache',
      mutation: deleteDevice,
      variables: {
        deviceID: this.deviceID,
        context: null,
      }
    }).subscribe(({data}) => { 
        console.log("mutation deleteDevice", data);
      });
  }

  getBacktoListProjects(){
    this.sub.unsubscribe();
    this.dataService.setPositionQuestion(0);
    this.dataService.setAnswerNumberZero();
    this.router.navigate(['/']);
  }
  public ngOnInit(): void {
    this.deviceID=this.dataService.getDeviceID();
    this.sub=this.messageService.getMessage().subscribe( message => {
      console.log("EndScreenMessage: " + message);
      this.getBacktoListProjects();
    });
  }
  }
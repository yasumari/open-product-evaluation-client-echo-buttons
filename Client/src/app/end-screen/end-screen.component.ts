import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {DataService } from '../data.service';
import { updateDevice, deleteDevice} from './end-screen.model';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit {

  private deviceID;
  constructor(private apollo: Apollo, private dataService: DataService) {
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
    let deviceID=this.dataService.getDevice();
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

  public ngOnInit(): void {
    this.deviceID=this.dataService.getDevice();
  }
  }
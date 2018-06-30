import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Subscription} from 'rxjs/Subscription';
import {DataService } from '../data.service';
import { Vote } from '../types';
import { updateDevice} from './end-screen.model';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit {

  constructor(private apollo: Apollo, private dataService: DataService) {
  }

  //abmelden setzt nur context auf null
  //TODO Gerät vollständig entfernen
  abmelden(): void{
    let deviceID=this.dataService.getDevice();
    this.apollo.mutate({
      fetchPolicy: 'no-cache',
      mutation: updateDevice,
      variables: {
        deviceID: deviceID,
        context: null,
      }
    }).subscribe(({data}) => { 
        console.log("mutation update DeviceContext", data);
      });
  }
  public ngOnInit(): void {
  }
  }
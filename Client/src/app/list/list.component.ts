import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { newDeviceMutation, queryAllSurveys } from './list.model';
import { Subscription } from 'rxjs/Subscription';

import { Survey, Query } from '../types'
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {
    surveys: Observable<Survey[]>;
    message: any;
    sub: Subscription;
//Router zum weiterleiten an die nächste Component /project
    constructor(private apollo: Apollo, private router: Router, private dataService: DataService, private messageService: MessageService) { 
        this.sub = this.messageService.getMessage().subscribe(message => { console.log("GET in LISTE") });
    }
    
    openProject(contextID : string): void{
        this.dataService.setContextID(contextID);
        this.router.navigateByUrl('/project');
    }

    openSpecificProject(): void{
        let id=(<HTMLInputElement>document.getElementById("specificContextID")).value;
        this.dataService.setContextID(id);
        this.router.navigateByUrl('/project');
    }

    ngOnInit() {
        //TODO neues Device immer??
        //TODO als Promise auslagern  
        //SOCKETS
        // subscribe to home component messages
        
       

        this.apollo.mutate({
            fetchPolicy: 'no-cache',
            mutation: newDeviceMutation,
            variables: { 
            deviceName: "Fernseher",
            }
        }).subscribe(({data}) => { 
        this.dataService.setDevice(data.createDevice.token, data.createDevice.device.id, data.createDevice.device.name);
        this.surveys = this.apollo.watchQuery<Query>({
            query: queryAllSurveys
            }).valueChanges
            .pipe(
            map(result => result.data.surveys)
            );
        });
}
ngOnDestroy(){
    this.sub.unsubscribe();
}
}
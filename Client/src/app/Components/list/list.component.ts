import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { newDeviceMutation, queryAllSurveys } from './list.model';
import { Subscription } from 'rxjs/Subscription';

import { Context } from '../../types'
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {
    surveys: Observable<Context>;
    testID;
    sub: Subscription;
//Router zum weiterleiten an die nächste Component /project
    constructor(private apollo: Apollo, private router: Router, private dataService: DataService, private messageService: MessageService) { 
        //Wenn app.Component einen button-click gemerkt hat, dann zum nächsten Screen
        this.sub=this.messageService.getMessage().subscribe( message => {
            console.log("Liste: " + message);
            this.sub.unsubscribe();
            //1= links und 2 = rechts
            if (message==1){
                this.openProject(this.surveys[0].id);
            } else {
                this.openProject(this.surveys[1].id);
            }
        })
    }
    
    openProject(contextID : string): void{
        this.dataService.setContextID(contextID);
        this.router.navigateByUrl('/project');
    }

    openSpecificProject(): void{
        let id=(<HTMLInputElement>document.getElementById("specificContextID")).value;
        //TODO später mal selber eintragen
        //this.dataService.setContextID(id);
        this.dataService.setContextID(this.testID);
        this.router.navigateByUrl('/project');
    }

    getProjects(){
        this.apollo.subscribe({
            query: queryAllSurveys
        }).subscribe(({data})=> {
            this.testID=data.contexts[0].id;
            this.surveys=data.contexts;
        })
      
    }
    ngOnInit() {
        let deviceID=this.dataService.getDeviceID();
        if ( deviceID==null ){
            this.apollo.mutate({
                fetchPolicy: 'no-cache',
                mutation: newDeviceMutation,
                variables: { 
                deviceName: "Fernseher",
                }
            }).subscribe(({data}) => { 
                this.dataService.setDevice(data.createDevice.token, data.createDevice.device.id, data.createDevice.device.name);
                this.getProjects();
            });
        } else {
            this.getProjects();
        }
    }
    
    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}
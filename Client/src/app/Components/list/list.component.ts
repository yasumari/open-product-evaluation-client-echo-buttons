import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Context } from '../../types'
import { newDeviceMutation } from './../../GraphQL/Device.gql';
import { queryAllSurveys } from './../../GraphQL/Context.gql';
import { DataService } from '../../Services/data.service';
import { MessageService } from '../../Services/message.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {
    surveys: Observable<Context>;
    sub: Subscription;
    
    constructor(
        private apollo: Apollo, 
        private router: Router, 
        private dataService: DataService, 
        private messageService: MessageService) {
    }

    openProject(contextID : string): void{
        this.dataService.setContextID(contextID);
        this.surveys.forEach(survey=> {
            if (survey.id==contextID){
                this.dataService.sendSurvey(survey);
            }
        })
        this.router.navigateByUrl('/project');
    }

    getProjects(){
        this.apollo.subscribe({
            query: queryAllSurveys
        }).subscribe(({data})=> {
            this.surveys=data.contexts;
        })
    }

    ngOnInit() {
        //Wenn app.Component einen button-click erhält, dann zum nächsten Screen
        this.sub=this.messageService.getMessage().subscribe( message => {
            this.sub.unsubscribe();
            this.openProject(this.surveys[message].id);
        })
        let deviceID=this.dataService.getDeviceID();
        //Wenn das Gerät noch nicht vorhanden ist, muss es neu angelegt werden
        if ( deviceID==null ){
            this.apollo.mutate({
                fetchPolicy: 'no-cache',
                mutation: newDeviceMutation,
                variables: { 
                deviceName: "SmartBoard",
                }
            }).subscribe(({data}) => { 
                console.log(data);
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
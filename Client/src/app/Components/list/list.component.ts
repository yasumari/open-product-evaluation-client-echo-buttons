import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Context } from '../../types'
import { newDeviceMutation, queryAllSurveys } from './list.model';
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

    constructor(private apollo: Apollo, private router: Router, private dataService: DataService, private messageService: MessageService) { 
        //Wenn app.Component einen button-click gemerkt hat, dann zum nächsten Screen
        this.sub=this.messageService.getMessage().subscribe( message => {
            this.sub.unsubscribe();
            //TODO kann doch gar nicht funktionieren später
            this.openProject(this.surveys[message].id);
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
            //TODO testID nur zum TESTEN 
            this.testID=data.contexts[0].id;
            this.surveys=data.contexts;
        })
    }

    ngOnInit() {
        let deviceID=this.dataService.getDeviceID();
        //Wenn das Gerät noch nicht vorhanden ist, muss es neu angelegt werden
        //TODO: deviceName festgelegt
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
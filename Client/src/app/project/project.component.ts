import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../data.service';
import { CurrentProjectSubscription, updateDevice} from './project.model';
import { Context } from '../types';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit, OnDestroy {
  public currentProject: Context;
  message: any;
  sub: Subscription;

  constructor(private apollo: Apollo, private router: Router, private dataService: DataService, private messageService: MessageService) {
//Router zum weiterleiten an die nächste Component /project 
        //Wenn app.Component einen button-click gemerkt hat, dann zum nächsten Screen
        //this.sub = this.messageService.getMessage().subscribe(message => { console.log("Erhalten" + message) });
        
    }
    public ngOnInit(): void {
      this.sub=this.messageService.getMessage().subscribe( message => {
        console.log("PROJECT: " + message);
        this.router.navigateByUrl('/question')}
    )
      //TODO: Kommt bisher von Startseite, was passiert, wenn schon spezifische ContextID kennt, dann das nehmen
      //TODO: DeviceID abfrage immer oder nur bei neuen, speichern der ID
      let contextid = ((this.dataService.getContextID() !=null) ? this.dataService.getContextID() : 1);
      let deviceID = ((this.dataService.getDevice() !=null ) ? this.dataService.getDevice() : "1");
      //Umfrage abfragen ohne Inhalt der Fragen
      this.apollo.subscribe({
        query: CurrentProjectSubscription,
        variables: {contextID: contextid},
      }).subscribe(({data}) => {
        //TODO brauche ich die activeQuestion abzufragen?
        this.currentProject = data['context'];
        //vorne im Array starten und dann eins hochzählen bei einer Antwort 
        //leere Antworten sind nicht möglich bis September
        this.dataService.sendContext(this.currentProject);
        this.dataService.setPositionQuestion(0);
      })

      //Device contextID übergeben mit updateDevice()
      //TODO Name und Nutzer festlegen
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: updateDevice,
        variables: {
          name: "asdf",
          deviceID: deviceID,
          context: contextid,
          owner: ["asdf", "asdf"]
        }
      }).subscribe(({data}) => { 
          //console.log("mutation update Device", data);
        });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
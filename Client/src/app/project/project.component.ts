import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../data.service';
import { CurrentProjectSubscription, updateDevice} from './project.model';
import { Context } from '../types';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit, OnDestroy {
  public currentProject: Context;

  constructor(private apollo: Apollo, private router: Router, private dataService: DataService, private socketService: SocketService) {
  }
    public ngOnInit(): void {

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
        console.log(this.currentProject.activeSurvey.questions);
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
          console.log("mutation update Device", data);
        });
  }
  ngOnDestroy(){
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../../Services/data.service';
import { currentProjectData, updateDevice, newDeviceMutation, queryContextID} from './project.model';
import { Context, Vote } from '../../types';
import { MessageService } from '../../Services/message.service';
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
  Teilnehmer : Vote;

  constructor(private apollo: Apollo, private router: Router, private dataService: DataService, private messageService: MessageService) { }


  //Umfrage abfragen
  /**
   * @description Server-Anfrage für Daten eines Projekts
   * @param contextID ID des Kontextes, deren Daten geladen werden sollen
   */
  getProject(contextID: string){
  this.apollo.subscribe({
    query: currentProjectData,
    variables: {contextID: contextID},
  }).subscribe(({data}) => {

    console.log(data);
    this.currentProject = data.context;

    //vorne im Array starten und dann eins hochzählen bei einer Antwort 
    //TODO: leere Antworten sind nicht möglich --> vllt. doch bei Like Question?

    /* Aktuelles Projekt allen Komponenten verfügbar machen mittels DataService*/
    this.dataService.sendContext(this.currentProject);
    /* Aktuelle Position der Frage auf 0 setzen, vorne anfangen und das Array durchlaufen*/
    this.dataService.setPositionQuestion(0);
  })
}
/**
 * @description Gerät mit der Kontext ID versehen, damit bei Änderung des Kontextes darauf reagiert werden kann
 * @param deviceID 
 * @param contextId 
 */
updateDevice(deviceID: string, contextId: string){
    //Device contextID übergeben mit updateDevice()
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: updateDevice,
        variables: {
          deviceID: deviceID,
          context: contextId
        }
      }).subscribe(({data}) => {
          console.log("mutation update Device", data);
      });
}

    public ngOnInit(): void {
      //TODO: Kommt bisher von Startseite, was passiert, wenn schon spezifische ContextID kennt, dann das nehmen
      //Ist das Device noch nicht vorhanden? dann Registriere es (Für die späteren Surveys, wenn die Liste nicht mehr benötigt wird)
      let contextid = ((this.dataService.getContextID() !=null) ? this.dataService.getContextID() : " "+1);
      let deviceID =  this.dataService.getDeviceID();
      let token = this.dataService.getToken();
      //TODO Name und Nutzer festlegen
      
      //Wenn es ohne Startseite aufgerufen wird, dann 
      //Registriere das Gerät, nehme das erste Projekt vom Server, updateGerät
      if (token==null || token==undefined || deviceID==null){
        this.apollo.mutate({
          fetchPolicy: 'no-cache',
          mutation: newDeviceMutation,
          variables: { 
            deviceName: "Fernseher",
          }
        }).subscribe(({data}) => { 
          this.dataService.setDevice(data.createDevice.token, data.createDevice.device.id, data.createDevice.device.name);
          deviceID=data.createDevice.device.id;
          //danach erst weitere Abfragen
          this.apollo.subscribe({
            query: queryContextID
          }).subscribe((data)=>{
            this.updateDevice(deviceID, data.data.contexts[0].id);
            this.getProject(data.data.contexts[0].id);
          })
          
        });
      }else{
        this.getProject(contextid);
        this.updateDevice(deviceID, contextid);
      }

      //BUZZER: Subscribed die Socket-Kommunikation, falls neue Nachrichten reinkommen
      this.sub=this.messageService.getMessage().subscribe( message => {
        this.sub.unsubscribe();
        this.router.navigateByUrl('/question')}
      )
      
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
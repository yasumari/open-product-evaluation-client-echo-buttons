import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DataService } from '../../Services/data.service';
import { updateDevice, newDeviceMutation} from './../../GraphQL/Device.gql';
import { currentProjectData, queryContextID, subscribeContext } from './../../GraphQL/Context.gql'
import { Context, Vote } from '../../types';
import { MessageService } from '../../Services/message.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

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
  private contextid:string;
  private deviceID: string;
  constructor(
    private apollo: Apollo, 
    private router: Router, 
    private dataService: DataService, 
    private messageService: MessageService) { }


  
  subscribeToNewComments(contextID: string) {
    this.apollo.subscribe({
      query: subscribeContext,
      variables: {cID: contextID}
    }).subscribe({
      next (data) {
        // Notify your application with the new arrived data
        console.log(data);
        console.log("Irgendwas wurde geupdatet");
        this.router.navigateByUrl("/");

      }
    });
  }
  

  /**
   * @description wird vom Button "Starten" ausgelöst, damit wird das Device mit der ContextID geupdatet
   * Weiterleitung an Question
   */
  startSurvey(){
    this.updateDevice(this.deviceID, this.contextid);
    this.router.navigateByUrl('/question');
  }

  backToList(){
    this.router.navigate(['/']);
  }

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
          this.subscribeToNewComments(contextId);
      });
}

    public ngOnInit(): void {
      
      //Ist das Device noch nicht vorhanden? dann Registriere es (Für die späteren Surveys, wenn die Liste nicht mehr benötigt wird)
      this.contextid = ((this.dataService.getContextID() !=null) ? this.dataService.getContextID() : " "+1);
      this.deviceID =  this.dataService.getDeviceID();
      let token = this.dataService.getToken();
      
      //Wenn es ohne Startseite aufgerufen wird, dann 
      //Registriere das Gerät, nehme das erste Projekt vom Server, updateGerät
      if (token==null || token==undefined || this.deviceID==null){
        this.apollo.mutate({
          fetchPolicy: 'no-cache',
          mutation: newDeviceMutation,
          variables: {
            deviceName: "Fernseher",
          }
        }).subscribe(({data}) => {
          this.dataService.setDevice(data.createDevice.token, data.createDevice.device.id, data.createDevice.device.name);
          this.deviceID=data.createDevice.device.id;
          //danach erst weitere Abfragen
          this.apollo.subscribe({
            query: queryContextID
          }).subscribe((data)=>{
            this.getProject(data.data.contexts[0].id);
          })

        });
      }else{
        this.getProject(this.contextid);
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

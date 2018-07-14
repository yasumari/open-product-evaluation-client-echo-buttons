import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../../Services/data.service';
import { CurrentProjectSubscription, updateDevice, newDeviceMutation} from './project.model';
import { Context } from '../../types';
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

  constructor(private apollo: Apollo, private router: Router, private dataService: DataService, private messageService: MessageService) {
        //Router zum weiterleiten an die nächste Component /project 
    }

getProject(contextID: string){
//Umfrage abfragen
this.apollo.subscribe({
  query: CurrentProjectSubscription,
  variables: {contextID: contextID},
}).subscribe(({data}) => {
  //TODO brauche ich die activeQuestion abzufragen?
  console.log(data.context);
  this.currentProject = data.context;
  //vorne im Array starten und dann eins hochzählen bei einer Antwort 
  //leere Antworten sind nicht möglich bis September
  this.dataService.sendContext(this.currentProject);
  this.dataService.setPositionQuestion(0);
})
}
    
updateDevice(deviceID: string, contextId: string){
console.log(name + "   " + deviceID + "  " + contextId);
    //Device contextID übergeben mit updateDevice()
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: updateDevice,
        variables: {
          name: name,
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
      let contextid = ((this.dataService.getContextID() !=null) ? this.dataService.getContextID() : 1);
      let deviceID =  this.dataService.getDeviceID();
      let deviceName =  this.dataService.getDeviceName();
      let token=this.dataService.getToken();
      //TODO Name und Nutzer festlegen
      this.getProject(contextid);

      if (token==null || token==undefined){
        this.apollo.mutate({
          fetchPolicy: 'no-cache',
          mutation: newDeviceMutation,
          variables: { 
            deviceName: deviceName,
          }
        }).subscribe(({data}) => { 
          this.dataService.setDevice(data.createDevice.token, data.createDevice.device.id, data.createDevice.device.name);
          deviceID=data.createDevice.device.id;
          //danach erst weitere Abfragen
          this.updateDevice(deviceID, contextid);
        });
      }else{
        this.updateDevice(deviceID, contextid);
      }
      this.sub=this.messageService.getMessage().subscribe( message => {
      console.log("PROJECT: " + message);
      this.sub.unsubscribe();
      this.router.navigateByUrl('/question')}
      )
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
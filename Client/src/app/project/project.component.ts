import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../data.service';
import { CurrentProjectSubscription, updateDevice} from './project.model';
import { Context } from '../types';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {
  public currentProject: Context;
  constructor(private apollo: Apollo, private dataService: DataService) {
  }
    public ngOnInit(): void {
      //TODO: Prüfen ob es von Liste-Startseite kommt oder schon spezifische ContextID kennt
      //TODO: DeviceID abfrage immer oder nur bei neuen, speichern der ID
      let contextid = ((this.dataService.getContextID() !=null) ? this.dataService.getContextID() : 1);
      let deviceID = ((this.dataService.getDevice() !=null ) ? this.dataService.getDevice() : "1");
      //Komplette Umfrage abfragen
      this.apollo.subscribe({
        query: CurrentProjectSubscription,
        variables: {contextID: contextid},
      }).subscribe(({data}) => {
        this.currentProject = data['context'];
         console.log(this.currentProject);
        this.dataService.sendContext(this.currentProject);
      })

      //Device contextID übergeben mit updateDevice()
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
}
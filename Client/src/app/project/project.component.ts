import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../data.service';
import { CurrentProjectSubscription, newDeviceMutation} from './project.model';
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
      let contextid=this.dataService.getContextID();
      console.log(contextid);
      this.apollo.subscribe({
        query: CurrentProjectSubscription,
        variables: {contextID: contextid},
      }).subscribe(({data}) => {
        this.currentProject = data['context'];
         console.log(this.currentProject);
        this.dataService.sendContext(this.currentProject);
      })

      this.apollo.mutate({
        fetchPolicy: 'no-cache',
       mutation: newDeviceMutation,
       variables: { 
         deviceName: "Fernseher",
       }
     }).subscribe(({data}) => { 
      console.log("mutation", data.createDevice.token);
      this.dataService.setToken(data.createDevice.token);
    });
  }
}
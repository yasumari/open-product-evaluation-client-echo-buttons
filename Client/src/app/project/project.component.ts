import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {DataService } from '../data.service';
import {CurrentProjectQuery} from './project.model';
import 'rxjs/add/operator/map';
import { Survey } from '../types';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {
  public currentProject: Survey;
  private currentProjectSub: Subscription;
  constructor(private apollo: Apollo, private dataService: DataService) {
  }
    public ngOnInit(): void {
      this.currentProjectSub = this.apollo.watchQuery({
        query: CurrentProjectQuery,
        variables: {contextID: 1},
      }).valueChanges.subscribe(({data}) => {
        this.currentProject = data['context'];
         console.log(this.currentProject);
        this.dataService.sendSurvey(this.currentProject);
      })
  }
}
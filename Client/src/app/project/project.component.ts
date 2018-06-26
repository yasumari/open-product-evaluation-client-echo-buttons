import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {DataService } from '../data.service';
import {CurrentProjectSubscription} from './project.model';
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
      this.apollo.subscribe({
        query: CurrentProjectSubscription,
        variables: {contextID: 1},
      }).subscribe(({data}) => {
        this.currentProject = data['context'];
         console.log(this.currentProject);
        this.dataService.sendContext(this.currentProject);
      })
  }
}
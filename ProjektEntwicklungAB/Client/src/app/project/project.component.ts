import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Subscription} from 'rxjs/Subscription';

import {CurrentProjectQuery} from './project.model';

import { Survey, Query } from '../types'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {
  public loading = true;
  public currentProject: Survey;

  private currentProjectSub: Subscription;

  constructor(private apollo: Apollo) {
  }

  public ngOnInit(): void {
    this.currentProjectSub = this.apollo.watchQuery({
      query: CurrentProjectQuery,
    }).valueChanges.subscribe(({data, loading}) => {
      this.currentProject = data['survey'];
      this.loading = loading;
    });
    console.log(this.currentProjectSub);
  }
}
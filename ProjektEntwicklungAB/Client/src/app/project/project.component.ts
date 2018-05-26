import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Subscription} from 'rxjs/Subscription';

import {CurrentProjectQuery} from './project.model';

import { Survey, Query, Owner, Question, Images } from '../types';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {
  public currentProject: Survey;

  private currentProjectSub: Subscription;

  constructor(private apollo: Apollo) {
  }

  public ngOnInit(): void {
    this.currentProjectSub = this.apollo.watchQuery({
      query: CurrentProjectQuery,
      variables: {id: 2},
    }).valueChanges.subscribe(({data}) => {
      this.currentProject = data['survey'];
    });
    console.log(this.currentProjectSub);
  }
}
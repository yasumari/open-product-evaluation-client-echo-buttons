import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService} from '../data.service';
import gql from 'graphql-tag';

import { Survey, Query, Question, Owner, Images } from '../types';
import {CurrentProjectQuery} from '../project/project.model';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: []
})

export class QuestionComponent implements OnInit {
    public currentProject: Survey;
    constructor(private apollo: Apollo, private dataService: DataService) { }

    ngOnInit() {
      this.currentProject=this.dataService.getSurvey();
  }

}


import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import{ map } from 'rxjs/operators';

import gql from 'graphql-tag';

import { Survey, Query } from '../types'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {
 surveys: Observable<Survey>;
    myHero='Windstorm';
    constructor(private apollo: Apollo) { }

    ngOnInit() {
    this.surveys = this.apollo.watchQuery<Query>({
    query: gql`
        query list{
        survey {
            id
            name
        }
        }
    `
    })
    .valueChanges
    .pipe(
    map(result => result.data.survey)
    );
  }

}

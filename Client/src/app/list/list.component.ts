import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import{ map } from 'rxjs/operators';

import gql from 'graphql-tag';

import { Survey, Query } from '../types'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    surveys: Observable<Survey[]>;
    
    constructor(private apollo: Apollo) { }

    ngOnInit() {
    this.surveys = this.apollo.watchQuery<Query>({
    query: gql`
        query list{
        surveys {
            id
            name
        }
        }
    `
    })
    .valueChanges
    .pipe(
    map(result => result.data.surveys)
    );
  }

}

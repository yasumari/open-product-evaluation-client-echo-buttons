import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Subscription} from 'rxjs/Subscription';
import {DataService } from '../data.service';
import gql from 'graphql-tag';
import { Survey, Query, Question, Owner, Images,Vote } from '../types';
export const CurrentProjectQuery: any = gql`
  query CurrentProjectForController ($id: Int){
     survey (id: $id){
      id,
      name,
      description,
      owner{
          firstname, 
          lastname,
          email},
      questions{
          _id,
          sequence,
          value,
          description
      }
      votes{
          _id
      survey{
      id,
      name,
      description,
      owner{
          firstname, 
          lastname,
          email},
      questions{
          _id,
          sequence,
          value,
          description
      }
      }
          
      }
    }
  
  }
`;


@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit {

  array: Vote []= [];
  private currentProjectSub: Subscription;
  
  constructor(private apollo: Apollo, private dataService: DataService) {
  }

  public ngOnInit(): void {
  // get array
  this.dataService.sendVote(this.array);
  // send  Data to Server Graphql
     this.apollo.watchQuery({
      query: CurrentProjectQuery
    }).valueChanges.subscribe(({ data }) => {
         for(var i=0;i<=this.array.length;i++)
            //data.votes=this.array[i];
            console.log(data);
    })
  }
  }
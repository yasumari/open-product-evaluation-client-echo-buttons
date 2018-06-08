import { Component, OnInit, Input} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService} from '../data.service';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

import { Survey, Query, Question, Owner, Images } from '../types';
import {CurrentProjectQuery} from '../project/project.model';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: []
})


export class QuestionComponent implements OnInit {
   public currentProject: Survey;
   public currentPositionQuestion; 
  
   buttonClick(btn_number){
      this.dataService.updatePositionQuestion();
     //Wurde die letzte Frage erreicht, dann zum Ende gehen
     ((this.currentPositionQuestion+1)==this.currentProject.questions.length) ? this.router.navigate(['/end']) : this.router.navigate(['/feedback']);
      
  }
   
    
    constructor(private apollo: Apollo, private dataService: DataService, private router: Router) {
  }

    ngOnInit() {
      this.currentProject=this.dataService.getSurvey();
      this.currentPositionQuestion=this.dataService.getPositionQuestion();
  }
}


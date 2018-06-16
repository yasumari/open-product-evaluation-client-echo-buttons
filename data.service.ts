import { Observable } from 'rxjs';

import { Survey, Query, Owner, Question, Images, Vote } from './types';

export class DataService {
    private subjectProject;
    private currentPositionQuestion=0;
    subjectp:Vote[]=[];
    getPositionQuestion(){
      return this.currentPositionQuestion;
    }
  
    updatePositionQuestion(){
      this.currentPositionQuestion+=1;
    }  
      
    clearSurvey() {
        this.subjectProject.next();
    }

    getSurvey() {
      return this.subjectProject;
    }
    sendSurvey(project1: Survey ) {
      
      this.subjectProject = project1;
     
    }
  sendVote(project: Vote[] ) {
      
      this.subjectProject = project;
     
    }
   getVote() {
      return this.subjectp;
    }
 
  constructor() { }
}

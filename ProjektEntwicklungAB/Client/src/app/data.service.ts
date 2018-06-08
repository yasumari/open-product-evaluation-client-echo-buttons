import { Observable } from 'rxjs';

import { Survey, Query, Owner, Question, Images } from './types';

export class DataService {
    private subjectProject;
    private currentPositionQuestion=0;
  
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
    sendSurvey(project: Survey) {
      this.subjectProject = project;
    }
  constructor() { }
}

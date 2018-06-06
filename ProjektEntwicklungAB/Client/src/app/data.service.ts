import { Observable } from 'rxjs';

import { Survey, Query, Owner, Question, Images } from './types';

export class DataService {
    private subjectProject;
    clearSurvey() {
        this.subjectProject.next();
    }

    getProject(): Observable<Survey> {
      return this.subjectProject.asObservable();
    }
    constructor() { }
    getSurvey() {
      return this.subjectProject;
    }
    sendSurvey(project: Survey) {
      this.subjectProject = project;
    }
}

import { Context, Vote } from './types';

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
      
    clearContext() {
        this.subjectProject.next();
    }

    getContext() {
      return this.subjectProject;
    }
    sendContext(project1: Context ) {
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
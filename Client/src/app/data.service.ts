import { Context, Vote, Device } from './types';

export class DataService {
  //TODO Device ändern: 
    private deviceID;
    private deviceToken;
    private deviceName;
    private subjectProject: Context;
    private currentPositionQuestion=0;
    private contextID;
    private socketID;

    subjectp:Vote[]=[];
    getPositionQuestion(){
      return this.currentPositionQuestion;
    }
  
    setPositionQuestion(position: number){
      this.currentPositionQuestion=position;
    }
    updatePositionQuestion(){
      this.currentPositionQuestion+=1;
    }  
      
    /*clearContext() {
        this.subjectProject.next();
    }*/

    getContext() {
      return this.subjectProject;
    }
    sendContext(project1: Context ) {
      this.subjectProject = project1;
    }

    /*sendVote(project: Vote[] ) {
      this.subjectProject = project;
    }
    
    getVote() {
      return this.subjectp;
    }*/
 
    setDevice(token: string, id: string, name: string){
      this.deviceID=token;
      this.deviceToken=id;
      this.deviceName=name;
    }

    setSocketID(id: string){
      this.socketID=id;
    }

    getSocketID(){
      return this.socketID;
    }
    //TODO: in Device
    getToken(){
      return this.deviceToken;
    }

    getDevice(){
      return (this.deviceID, this.deviceToken, this.deviceName);
    }

    setContextID(id: string){
      this.contextID=id;
    }
    
    getContextID(){
      return this.contextID;
    }

  constructor() { }
}
import { Context, Vote, Device } from './types';

export class DataService {
  //TODO Device ändern: 
    private deviceID;
    private deviceToken;
    private deviceName;
    private subjectProject: Context;
    private currentPositionQuestion=0;
    private contextID;

    subjectp:Vote[]=[];
    getPositionQuestion(){
      return this.currentPositionQuestion;
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
    }*/
    
    getVote() {
      return this.subjectp;
    }
 
    setDevice(token: string, id: string, name: string){
      //TODO Probleme mit Namen
      console.log("Token: " + token + " id: " + id + " name: " +name);
      this.deviceID=token;
      this.deviceToken=id;
      this.deviceName=name;
    }

    //TODO: in Device
    getToken(){
      return this.deviceToken;
    }

    getDevice(){
      return (this.deviceID, this.deviceToken, this.deviceName);
    }

    setContextID(id: string){
      console.log(id);
      this.contextID=id;
      console.log(this.contextID);
    }
    
    getContextID(){
      return this.contextID;
    }

  constructor() { }
}
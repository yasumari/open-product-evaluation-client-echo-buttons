import { Context, Vote, Device,  } from '../types';

export class DataService {
  //TODO Device ändern: 
    private deviceID;
    private deviceToken;
    private deviceName;
    private subjectProject: Context;
    private currentPositionQuestion=0;
    private contextID;
    private socketID;
    private chosenImage;
    private numberAnswerQuestions=0;

    setChosenImageUrl(url: string){
      this.chosenImage=url;
    }

    getChosenImageUrl(){
      return this.chosenImage;
    }
    
    setAnswerNumber(){
      this.numberAnswerQuestions++;
    }

    getAnswerNumber(){
      return this.numberAnswerQuestions;
    }

    setAnswerNumberZero(){
      this.numberAnswerQuestions=0;
    }
    //TODO Wofür noch Votes?
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

    getContext(): Context {
      return this.subjectProject;
    }
    sendContext(project: Context ) {
      this.subjectProject = project;
    }

    /*sendVote(project: Vote[] ) {
      this.subjectProject = project;
    }
    
    getVote() {
      return this.subjectp;
    }*/
 
    setDevice(token: string, id: string, name: string){
      this.deviceID=id;
      this.deviceToken=token;
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

    getDeviceID(){
      return this.deviceID;
    }

    getDeviceName(){
      return this.deviceName
    }
    setContextID(id: string){
      this.contextID=id;
    }
    
    getContextID(){
      return this.contextID;
    }

  constructor() { }
}
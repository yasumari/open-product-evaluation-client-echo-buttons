import { Context, Vote, Device,  } from '../types';

interface myDevice {
  deviceID: string;
  deviceToken: string;
  deviceName: string;
}

export class DataService {
  
    private deviceObj: myDevice;
    private subjectProject: Context;
    private currentPositionQuestion=0;
    private contextID;
    
    private socketID;
    private chosenImage;
    private chosenImagearray:string[]=[];
    private numberAnswerQuestions=0;

    //FeedbackImage
    setChosenImageUrl(url: string){
      this.chosenImage=url;
    }

    getChosenImageUrl(){
      return this.chosenImage;
    }
    //endscreenImage
    setChosenImageUrlarray(url1: string){
      this.chosenImagearray.push(url1);
    }
    

    getChosenImageUrlarray(){
      return this.chosenImagearray;
    }
    //Beanwortete Fragen
    setAnswerNumber(){
      this.numberAnswerQuestions++;
    }

    getAnswerNumber(){
      return this.numberAnswerQuestions;
    }

    setAnswerNumberZero(){
      this.numberAnswerQuestions=0;
    }

    //Welche Frage dran ist
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

    //Welcher Kontext
    getContext(): Context {
      return this.subjectProject;
    }
    sendContext(project: Context ) {
      this.subjectProject = project;
    }

    setContextID(id: string){
      this.contextID=id;
    }
    
    getContextID(){
      return this.contextID;
    }

    //Sockets
    setSocketID(id: string){
      this.socketID=id;
    }

    getSocketID(){
      return this.socketID;
    }

    //Device Objekt
    setDevice(token: string, id: string, name: string){
      this.deviceObj = { 
        deviceID: id, 
        deviceToken: token, 
        deviceName: name 
      };
    }

    getToken(){
      return (this.deviceObj==undefined) ? null : this.deviceObj.deviceToken;
    }

    getDeviceID(){
      return (this.deviceObj==undefined) ? null : this.deviceObj.deviceID;
    }

    getDeviceName(){
      return (this.deviceObj==undefined) ? null : this.deviceObj.deviceName;
    }
getArrayBilder(){
  return this.ArrayBilder;
}

setArrayBilder(array : any[]){
  this.ArrayBilder=array;
}
  constructor() { }
}
import { Context } from '../types';

/* Interface eines Device*/
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
    private chosenQuestion;
    private chosenQuestionarray:string[]=[];
    private MaxAnwortarray:any[]=[];
    private numberAnswerQuestions=0;
    private countRanking=0;
    private regulatorValues=[];

    /**
     * @description Anzeigen des gewählten Bild, muss von Question-Komponente festgelegt und von Feedback verwendet werden
     * @param url 
     */
    setChosenImageUrl(url: string){
      this.chosenImage=url;
    }
 
    getChosenImageUrl(){
      return this.chosenImage;
    }
   //endscreenImage
    setChosenImageUrlarray(q1: string){
      this.chosenImagearray.push(q1);
    } 
     getChosenImageUrlarray(){
      return this.chosenImagearray;
    }
    resetChosenImageUrlarray(){
      this.chosenImagearray.length=0;
    }
    //endscreenquestion
    getChosenQuestionarray(){
      return this.chosenQuestionarray;
    }
    
    setChosenQuestionarray(q: string){
      this.chosenQuestionarray.push(q);
    }
    resetChosenQuestionarray(){
      this.chosenQuestionarray.length=0;
    }
  
//endscreenImage :Wert von beliebste Frage
    setMaxAntwortArray(max:any){
      this.MaxAnwortarray.push(max);
    } 
    
    getMaxAntwortArray(){
      return this.MaxAnwortarray;
    }
    resetMaxAntwortArray(){
      this.MaxAnwortarray.length=0;
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

  

  /**
   * @description Aktuelle Position der Frage aus dem Survey
   * @param position: Position der Fragen im Array
   */
    setPositionQuestion(position: number){
      this.currentPositionQuestion=position;
    }
    getPositionQuestion(){
      return this.currentPositionQuestion;
    }

    //Nach beantworten der Frage, muss die Position erhöht werden, Durchlauf aller Fragen möglich
    updatePositionQuestion(){
      this.currentPositionQuestion++;
    }  
      
    /*clearContext() {
        this.subjectProject.next();
    }*/

    //Welcher Kontext wurde ausgewählt

/**
 * @description Projekt damit die anderen Komponenten darauf zugreifen können
 * @param project 
 */
    sendContext(project: Context ) {
      this.contextID=project.id;
      this.subjectProject = project;
    }
    getContext(): Context {
      return this.subjectProject;
    }

    /**
     * @description ContextID, die auf der Startseite ausgewählt wurde
     * @param id 
     */
    setContextID(id: string){
      this.contextID=id;
    }
    
    getContextID(){
      return this.contextID;
    }

    //Socket-Kommunikation
    /*setSocketID(id: string){
      this.socketID=id;
    }

    getSocketID(){
      return this.socketID;
    }*/

    /**
     * Device speichern für Mutations
     * @param token 
     * @param id 
     * @param name 
     */
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

/**
 * @description Speziell für Ranking, um die Platz zu verteilen, 
 * beschriften und abzugleichen, wann alle Items in eine Reihenfolge gebracht wurde
 */
    getCountRanking(){
      return this.countRanking;
    }

    resetCountRanking(){
      this.countRanking=0;
    }

    updateCountRanking(){
      this.countRanking++;
    }

    /**
     * 
     */
    setRegulatorsValue(regulators: Number[]){
      this.regulatorValues=regulators;
    }

     getRegulatorsValue(){
      return this.regulatorValues;
     }
  constructor() { }
}
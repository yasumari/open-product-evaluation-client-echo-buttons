import { Context, Survey } from '../types';

/* Interface eines Device*/
interface myDevice {
  deviceID: string;
  deviceToken: string;
  deviceName: string;
}

export class DataService {
    private deviceObj: myDevice;
    private subjectProject: Context;
    private survey: Context;
    private contextID;
    private chosenImage;
    private chosenImagearray:string[]=[];
    private chosenQuestionarray:string[]=[];
    private MaxAnwortarray:any[]=[];
    private numberAnswerQuestions=0;
    private regulatorValues=[];

    private count=0;

    private ranking=[];


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
    increaseAnswerNumber(){
      this.numberAnswerQuestions++;
    }
    decreaseAnswerNumber(){
      this.numberAnswerQuestions--;
    }

    getAnswerNumber(){
      return this.numberAnswerQuestions;
    }

    setAnswerNumber(numPosition: number){
      this.numberAnswerQuestions=numPosition;
    }

    setcountnull(count: number){
      this.count=0;
    }
    
    getcount(){
      return this.count;
    }


    sendSurvey(survey: Context){
      this.survey=survey;
    }
    getSurvey(): Context{
      return this.survey;

    }
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
     * @description Question.Component legt wählbare Werte fest, die die RegulatorStrategy benötigt
     */
    setRegulatorsValue(regulators: Number[]){
      this.regulatorValues=regulators;
    }

     getRegulatorsValue(){
      return this.regulatorValues;
     }

     /**
      * @description RankingStrategie benötigt die gewählten Bilder
      * @param imageRanking Das gerade ausgewählte Bild wird vorne ins Array eingefügt
      * Array vorne schlecht --> hinten bestes item
      */
     setRanking(imageRanking: string){
      this.ranking.unshift(imageRanking);
     }

     getRanking(){
       return this.ranking;
     }

     resetRanking(){
       this.ranking=[];
     }
    
  constructor() { }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { MessageService } from '../../Services/message.service'; 
import { ChartsModule } from 'ng2-charts';
import { Context, Answer, Question } from '../../types';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  //private sub: Subscription;
  private max: number;
  private image:string;
  private timer;
  public currentProject: Context;
  public currentQuestion: Question;
  public DataAntwort:number=0;
  
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels:string[] = [];
 
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [], label: "serie a"},{data: [], label: "serie b"}
    
  ];
 
  
  constructor(private dataService: DataService, private router: Router, private messageService: MessageService) { 

  }
  nextPage(){
    //Button wurde gedrückt, dann stoppt der Timer
    clearTimeout(this.timer);
    //this.sub.unsubscribe(); 
    //Prüfe ob zum Ende oder zur nächsten Frage
    (this.dataService.getAnswerNumber() == this.max) ? this.router.navigate(['/end']) : this.router.navigate(['/question']);
  }
  public CalculAntwort():number
  { let k=0;
    //console.log("anzahl der gesamt antwort  : " , (<any>this.currentProject.activeSurvey.votes).length);
    console.log("length",(<any>this.currentProject.activeSurvey.votes).length);
      console.log("Anzahl der antwort einer Frage ",this.currentProject.activeSurvey.votes[k].answers.length)
       for(let x=0;x<this.currentProject.activeSurvey.votes[k].answers.length;x++)
      {
       //if(this.currentProject.activeSurvey.votes[k].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[k].answers[x].__typename==this.currentQuestion.__typename)
      this.DataAntwort=this.DataAntwort+1;
      }
    
  
  return this.DataAntwort;
 }


  ngOnInit() {
    let val=this.CalculAntwort();
    this.currentProject = this.dataService.getContext();
    this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()];
     console.log("reponse",this.currentProject.activeSurvey.votes);
     console.log("Art der Frage: " + this.currentQuestion.value);
     console.log("Art der Frage: " + this.currentQuestion.__typename);
     for(let i=0;i<2;i++)
     {
       this.barChartLabels[i] = this.currentQuestion.value;
    
     this.barChartData[i].data.push(val);
    }
     
    /* switch(this.currentQuestion.__typename){
      case 'RankingQuestion':
     // for(let i=0;i<4;i++)
      //{
        //this.barChartData[0].data[i]=this.CalculAntwort();
        this.barChartData[0].data[0]=this.CalculAntwort();
        this.barChartData[0].data[1].push(this.CalculAntwort());
       // console.log("je suis la ma valeur est ",this.barChartData[0].data[i]);
      //}
      break;

      case 'LikeDislikeQuestion':
      //for(let i=0;i<2;i++)
      //{
       // this.barChartData[0].data[i]=this.CalculAntwort();
        this.barChartData[0].data[0].push(this.CalculAntwort());
        this.barChartData[0].data[1].push(this.CalculAntwort());
       // console.log("je suis la ma valeur est ",this.barChartData[0].data[i]);
      //}
      break;

      case 'RegulatorQuestion':
     // for(let i=0;i<2;i++)
      //{
        //this.barChartData[0].data[i]=this.CalculAntwort();
        this.barChartData[0].data[0]=this.CalculAntwort();
        this.barChartData[1].data[0]=this.CalculAntwort();
       // console.log("je suis la ma valeur est ",this.barChartData[0].data[i]);
      //}
      break;

      case 'ChoiceQuestion': 
    //  for(let i=0;i<2;i++)
      //{// Anzahl jede gewählte Bild 
        //this.barChartData[0].data[i]=this.CalculAntwort();
        this.barChartData[0].data[0]=this.CalculAntwort();
       this.barChartData[1].data[0]=this.CalculAntwort();
        //console.log("je suis la ma valeur est ",this.barChartData[0].data[i]);
      //}
      break;

      case 'LikeQuestion':
    //  for(let i=0;i<2;i++)
     // {// Anzahl like und dislike Bild 
       // this.barChartData[0].data[i]=this.CalculAntwort();
        this.barChartData[0].data[0]=this.CalculAntwort();
       this.barChartData[1].data[0]=this.CalculAntwort();
       // console.log("je suis la ma valeur est ",this.barChartData[0].data[i]);
      //}
      break;

      case 'FavoriteQuestion':
     // for(let i=0;i<2;i++)
      //{// Anzahl jede favorite gewählte Bild 
        this.barChartData[0].data[0]=this.CalculAntwort();
        this.barChartData[0].data[1]=this.CalculAntwort();
      //  console.log("je suis la ma valeur est ",this.barChartData[0].data[i]);
      //}
      break;
    }*/
     
    this.image=this.dataService.getChosenImageUrl();
    //TODO WIRD HIER AUCH mit dem Button gedrückt?
    this.max=this.dataService.getContext().activeSurvey.questions.length;
    /*this.sub=this.messageService.getMessage().subscribe( message => {
      console.log("FEEDBACK: " + message);
      this.nextPage();
    });*/

  this.timer= setTimeout( () => {
        this.nextPage();
    }, 3500);  
  }



  ngOnDestroy(){}
}

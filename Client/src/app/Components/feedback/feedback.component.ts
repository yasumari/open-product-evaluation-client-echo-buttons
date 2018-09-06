import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { MessageService } from '../../Services/message.service'; 

import { ChartsModule } from 'ng2-charts';
import { Context, Answer, Question } from '../../types';

import { Constants } from '../../constants';


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
  public DataAntwort1:number=0;
  public DataAntwort2:number=0;
  public DataAntwort3:number=0;
  public DataAntwortP:number=0;
  public DataAntwortP1:number=0;
  
  public barChartOptions:any = {
    
    size: {
      height: 50,
      width: 50,
      left: 50,
      rigth:50
   },

   // scaleShowVerticalLines: false,
    responsive: true,
    title: {
      text: '', 
      fontColor: "white",
      fontSize: 30,
      display: true
    }
  };
  
  public barChartLabels:string[] = [];
 
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public ArrayBilder:any []=[];
  public barChartData:any[] = [
    {data: [], label: [],   backgroundColor: [
      'rgba(0, 99, 132, 0.6)',
      'rgba(30, 99, 132, 0.6)',
      'rgba(60, 99, 132, 0.6)',
      'rgba(90, 99, 132, 0.6)',
      'rgba(120, 99, 132, 0.6)',
      'rgba(150, 99, 132, 0.6)',
      'rgba(180, 99, 132, 0.6)',
      'rgba(210, 99, 132, 0.6)',
      'rgba(240, 99, 132, 0.6)'
    ],
    
    borderColor: [
      'rgba(0, 99, 132, 1)',
      'rgba(30, 99, 132, 1)',
      'rgba(60, 99, 132, 1)',
      'rgba(90, 99, 132, 1)',
      'rgba(120, 99, 132, 1)',
      'rgba(150, 99, 132, 1)',
      'rgba(180, 99, 132, 1)',
      'rgba(210, 99, 132, 1)',
      'rgba(240, 99, 132, 1)'
    ],
    borderWidth: 2,
    hoverBorderWidth: 0,animation:false,
    scaleOverride:true,
    scaleSteps:6,
    scaleStartValue:0,
    scaleStepWidth:30, left: 50,
    rigth:50
    
    },{data: [], label: [],   backgroundColor: [
      'rgba(0, 99, 132, 0.6)',
      'rgba(30, 99, 132, 0.6)',
      'rgba(60, 99, 132, 0.6)',
      'rgba(90, 99, 132, 0.6)',
      'rgba(120, 99, 132, 0.6)',
      'rgba(150, 99, 132, 0.6)',
      'rgba(180, 99, 132, 0.6)',
      'rgba(210, 99, 132, 0.6)',
      'rgba(240, 99, 132, 0.6)'
    ],
    borderColor: [
      'rgba(0, 99, 132, 1)',
      'rgba(30, 99, 132, 1)',
      'rgba(60, 99, 132, 1)',
      'rgba(90, 99, 132, 1)',
      'rgba(120, 99, 132, 1)',
      'rgba(150, 99, 132, 1)',
      'rgba(180, 99, 132, 1)',
      'rgba(210, 99, 132, 1)',
      'rgba(240, 99, 132, 1)'
    ],
    borderWidth: 2,
    hoverBorderWidth: 0,animation:false,
    scaleOverride:true,
    scaleSteps:4,
    scaleStartValue:0,
    scaleStepWidth:10 ,
    left: 50,
    rigth:50
    
    }
    
  ];
 
 

  private title_nextPage;

  constructor(private dataService: DataService, private router: Router, private messageService: MessageService) { 
    
  }
  nextPage(){
    //Button wurde gedrückt, dann stoppt der Timer
    clearTimeout(this.timer);
    //this.sub.unsubscribe(); 
    //Prüfe ob zum Ende oder zur nächsten Frage
    (this.dataService.getAnswerNumber() == this.max) ? this.router.navigate(['/end']) : this.router.navigate(['/question']);
  }


  ngOnInit() {
    this.currentProject = this.dataService.getContext();
    let k;
    
    this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()-1];
     console.log("reponse",this.currentProject.activeSurvey.votes);
     console.log("Art der Frage: " + this.currentQuestion.value);
     console.log("Art der Frage: " + this.currentQuestion.__typename);
     this.barChartOptions.title.text=this.currentQuestion.value +" ( "+this.currentQuestion.__typename+" ) " ;
   
    
                  
    switch(this.currentQuestion.__typename){
      case 'RankingQuestion':
   this.barChartLabels[0] =this.currentQuestion.items[0].label ;
     this.barChartLabels[1] =this.currentQuestion.items[1].label ;
     
     for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
     {
     for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
     {//console.log("id image 0",this.currentQuestion.items[0].image.id);
       //console.log("idimage reponse Ranking", this.currentProject.activeSurvey.votes[i].answers[x].rankedImages);
       //console.log("id answersquestion array",this.currentProject.activeSurvey.votes[i].answers[x].question);
       //console.log("idenswers actuelle ", this.currentQuestion.id);
       this.DataAntwort=this.DataAntwort+1;
       this.DataAntwort1=this.DataAntwort1+1;
       this.DataAntwortP1=this.DataAntwortP1+1;
       this.DataAntwortP=this.DataAntwortP+1;   
       /*
        if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[k].answers[x].__typename==this.currentQuestion.__typename)
          {
            for(let y;y<(<any>this.currentProject.activeSurvey.votes[i].answers[x].RankingQuestion.rankedImages).length;y++)
              {   
                 if(this.currentProject.activeSurvey.votes[i].answers[x].RankingAnswer.rankedImages[y].id==this.currentQuestion.items[0].image.id)
                  this.DataAntwort=this.DataAntwort+1;
                else if(this.currentProject.activeSurvey.votes[i].answers[x].RankingAnswer.rankedImages[y].id==this.currentQuestion.items[0].image.id)
                    this.DataAntwort1=this.DataAntwort1+1;
                else  {  if(this.currentProject.activeSurvey.votes[i].answers[x].RankingAnswer.rankedImages[y].id==this.currentQuestion.items[1].image.id)
                  this.DataAntwortP=this.DataAntwort+1;
                else if(this.currentProject.activeSurvey.votes[i].answers[x].RankingAnswer.rankedImages[y].id==this.currentQuestion.items[1].image.id)
                    this.DataAntwortP1=this.DataAntwort1+1;
                  }
              }
          }*/
      }
   
      }   
   
   this.barChartData[0].label.push("Platz 1");
   this.barChartData[1].label.push("Platz 2");
   //push data 
 
    this.barChartData[0].data.push(this.DataAntwort);
    this.barChartData[1].data.push(this.DataAntwort1);
    this.barChartData[0].data.push(this.DataAntwortP);
    this.barChartData[1].data.push(this.DataAntwortP1);



    // die Hochste Anzahl einer Antwort
    //  faire une compareison prendre la meilleur valeur et son id question currentQuestion.items[i].image.url
   // il faut voir le 0
    
   
   
   
  
   let maximum = Math.max(this.DataAntwort,this.DataAntwort1,this.DataAntwortP1,this.DataAntwortP); 
   
   
   break;

      case 'LikeDislikeQuestion':
      this.barChartLabels[0] =this.currentQuestion.items[0].label ;
    let ordre=0;
    let ordre1=0;
    
     for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
      {this.DataAntwort=this.DataAntwort+1;
        this.DataAntwort1=this.DataAntwort1+1;
    /*  if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[k].answers[x].__typename==this.currentQuestion.__typename)
        { if(this.currentProject.activeSurvey.votes[i].answers[x].LikeDislikeQuestion.liked==true)
           {this.DataAntwort=this.DataAntwort+1;
          ordre=this.dataService.getAnswerNumber();
           }
          else if(this.currentProject.activeSurvey.votes[i].answers[x].LikeDislikeQuestion.liked==false)
          {this.DataAntwort1=this.DataAntwort1+1;
          ordre1=this.dataService.getAnswerNumber();
          }
        
        } 
          */
      }
    
    }   
          
     this.barChartData[0].data.push(this.DataAntwort);
     this.barChartData[0].label.push("Like");
     this.barChartData[1].data.push(this.DataAntwort1);
     this.barChartData[1].label.push("Dislike");
     let maxi = Math.max(this.DataAntwort,this.DataAntwort1);
     this.ArrayBilder.push(maxi/this.DataAntwort+this.DataAntwort1);
     this.dataService.setArrayBilder(this.ArrayBilder);
     //comment savoir quell image la plus choisie 
     if(maxi==this.DataAntwort)
     this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
     else
     this.dataService.setChosenImageUrlarray(this.currentQuestion.items[1].image.url);
    // this.dataService.setChosenImageUrlarray(this.currentQuestion.items[ordre].image.url);
      break;

      case 'RegulatorQuestion':
      
      this.barChartLabels[0] ="1" ;
      this.barChartLabels[1] ="2" ;
      this.barChartLabels[2] ="3" ;
      this.barChartLabels[3] ="4" ;
      
      for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
      {
      //if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[k].answers[x].__typename==this.currentQuestion.__typename)
      
      //welche variable weißt welche zahl hats der personn gewählt

       this.DataAntwort=this.DataAntwort+1;
       this.DataAntwort1=this.DataAntwort1+1;
       this.DataAntwort2=this.DataAntwort2+1;
       this.DataAntwort3=this.DataAntwort3+1;
          
      
      }
    
    }   
    this.barChartData = [
      {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []},
      
    ];  
   this.barChartData[0].data[0]=this.DataAntwort;
    this.barChartData[0].label.push("Regulator 1 ");
    this.barChartData[1].data[1]=this.DataAntwort1;
     this.barChartData[1].label.push("Regulator 2 ");
     this.barChartData[2].data[2]=this.DataAntwort2;
     this.barChartData[2].label.push("Regulator 3 ");
     this.barChartData[3].data[3]=this.DataAntwort3;
     this.barChartData[3].label.push("Regulator 4");
    
  /*  this.barChartData[0].label.push("1");
     this.barChartData[1].label.push("2");
     this.barChartData[2].label.push("3");
     this.barChartData[3].label.push("4");
     this.barChartData[0].data.push(this.DataAntwort);
     this.barChartData[1].data.push(this.DataAntwort1);
     this.barChartData[2].data.push(this.DataAntwort2);
     this.barChartData[3].data.push(this.DataAntwort3);
     */
   
  
    

      break;
    
      case 'ChoiceQuestion': 
      this.barChartLabels[0] =this.currentQuestion.items[0].label ;
      this.barChartLabels[1] =this.currentQuestion.items[1].label ;
      
      for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
      {
       //if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[k].answers[x].__typename==this.currentQuestion.__typename)
       //choiceCode the code of slected choice ??  
      // if(this.currentProject.activeSurvey.votes[i].answers[x].ChoiceAnswer.choiceCode==)
          this.DataAntwort=this.DataAntwort+1;
        //  else if(this.currentProject.activeSurvey.votes[i].answers[x].ChoiceAnswer.choiceCode==false)
          this.DataAntwort1=this.DataAntwort1+1;
      }
    
    }   
      
    
     this.barChartData[0].data[0]=this.DataAntwort;
     this.barChartData[0].label.push("Choice ");
     this.barChartData[1].data[1]=this.DataAntwort1;     
     this.barChartData[1].label.push("Choice ");
    
     
      break;

      case 'LikeQuestion':
      this.barChartLabels[0] =this.currentQuestion.items[0].label ;
      this.barChartLabels[1] =this.currentQuestion.items[1].label ;
      
      for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
      {
        this.DataAntwort=this.DataAntwort+1;
        this.DataAntwort1=this.DataAntwort1+1;
     /* if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[k].answers[x].__typename==this.currentQuestion.__typename)
        // image 
        if(this.currentProject.activeSurvey.votes[i].answers[x].image[0].id==this.currentQuestion.items[0].image.id && this.currentProject.activeSurvey.votes[i].answers[x].LikeAnswer.liked==true)
           this.DataAntwort=this.DataAntwort+1;
         else   
         if(this.currentProject.activeSurvey.votes[i].answers[x].image[1].id==this.currentQuestion.items[1].image.id && this.currentProject.activeSurvey.votes[i].answers[x].LikeAnswer.liked==true)
         this.DataAntwort1=this.DataAntwort1+1;
       */    
       }
     
     }   
           
     
     this.barChartData[0].data[0]=this.DataAntwort;
     this.barChartData[0].label.push("Like");
     this.barChartData[1].data[1]=this.DataAntwort1;     
     this.barChartData[1].label.push("Like");
  
       break;

      case 'FavoriteQuestion':
      this.barChartLabels[0] =this.currentQuestion.items[0].label ;
      this.barChartLabels[1] =this.currentQuestion.items[1].label ;
      
      for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
      {
        this.DataAntwort=this.DataAntwort+1;
        this.DataAntwort1=this.DataAntwort1+1;
     /* if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[k].answers[x].__typename==this.currentQuestion.__typename)
        // image 
        if( this.currentProject.activeSurvey.votes[i].answers[x].FavoriteAnswer.favoriteImage==this.currentQuestion.items[0].image.id)
           this.DataAntwort=this.DataAntwort+1;
         else   
         if(this.currentProject.activeSurvey.votes[i].answers[x].FavoriteAnswer.favoriteImage==this.currentQuestion.items[1].image.id)
         this.DataAntwort1=this.DataAntwort1+1;
        */   
       }
     
     }   
           
      this.barChartData[0].data[0]=this.DataAntwort;
      this.barChartData[0].label.push("Favorite");
      this.barChartData[1].data[1]=this.DataAntwort1;     
      this.barChartData[1].label.push("Favorite");
      
      break;
    }
     
    this.image=this.dataService.getChosenImageUrl();
    //TODO WIRD HIER AUCH mit dem Button gedrückt?
    this.max=this.dataService.getContext().activeSurvey.questions.length;
    (this.dataService.getAnswerNumber() == this.max) ? this.title_nextPage="Das war's!" : this.title_nextPage="Weiter geht's zur nächsten Frage!";
    /*this.sub=this.messageService.getMessage().subscribe( message => {
      console.log("FEEDBACK: " + message);
      this.nextPage();
    });*/

  this.timer= setTimeout( () => {
       // this.nextPage();
    }, Constants.TIMER_FEEDBACK);  
  }



  ngOnDestroy(){}
}

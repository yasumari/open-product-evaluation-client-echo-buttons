import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { MessageService } from '../../Services/message.service'; 
import { Subscription } from 'rxjs/Subscription';
import { ChartsModule } from 'ng2-charts';
import { Context, Question } from '../../types';
import { Constants } from '../../constants';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  private sub: Subscription;
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
    scales: {
      yAxes: [{
          ticks: {
              min: 0,
              beginAtZero: true
          }
      }]
  },
    size: { 
      width: 5,
      left: 5,
      rigth:5
   },
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
  
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgb(90,132,135)',
      borderColor: 'rgb(90,132,135)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // second color
      backgroundColor: 'rgb(90,132,135)',
      borderColor: 'rgb(90,132,135)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // first color
      backgroundColor: 'rgb(90,132,135)',
      borderColor: 'rgb(90,132,135)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // second color
      backgroundColor: 'rgb(90,132,135)',
      borderColor: 'rgb(90,132,135)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },{ // first color
      backgroundColor: 'rgb(90,132,135)',
      borderColor: 'rgb(90,132,135)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    }
  ];
  public barChartData:any[] = [
    {data: [], label: [],  
      borderWidth: 2,
      hoverBorderWidth: 0,
      scaleOverride:true,
      scaleSteps:1,
      scaleStartValue:0,
      scaleStepWidth:5 
   

    
    },{data: [], label: [], 
    borderWidth: 2,
    hoverBorderWidth: 0,
    scaleOverride:true,
    scaleSteps:1,
    scaleStartValue:0,
    scaleStepWidth:5 ,
   
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  min: 0,
                  beginAtZero: true
              }
          }]
      }
  }

    }
    
  ];
 
  

  private title_nextPage;


  constructor(private dataService: DataService, private router: Router, private messageService: MessageService) {}
  nextPage(){
    //Button wurde gedrückt, dann stoppt der Timer
    clearTimeout(this.timer);
    this.sub.unsubscribe(); 
    //Prüfe ob zum Ende oder zur nächsten Frage
    (this.dataService.getAnswerNumber() == this.max) ? this.router.navigate(['/end']) : this.router.navigate(['/question']);
  }


  ngOnInit() {
    
    this.currentProject = this.dataService.getContext();
    let k;
    
    this.currentQuestion = this.currentProject.activeSurvey.questions[this.dataService.getAnswerNumber()-1];
     
     this.barChartOptions.title.text=this.currentQuestion.value +" ( "+this.currentQuestion.__typename+" ) " ;
   
    //Visualisierung der Grafik und rechnung der Antworten für jede Art von Fragen 
    switch(this.currentQuestion.__typename){
      case 'RankingQuestion':
      //push titel der X axe 
      if(this.currentQuestion.items!=null){
      for(let i=0;i<this.currentQuestion.items.length;i++)
   this.barChartLabels[i] =this.currentQuestion.items[i].label ;
  }
   this.barChartData = [
    {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []}];  
let max=0;let img =this.currentQuestion.items[0].image.id;
console.log("taille de tt les question ",this.currentProject.activeSurvey.votes.length);
    console.log("taille du premier tableau de la  question ",this.currentProject.activeSurvey.votes[0].answers.length);
   
    for(let y=0;y<(<any>this.currentQuestion.items).length;y++)
     {
     for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
     {
     for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
     {
      
        if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[i].answers[x].__typename=="RankingAnswer")
          {
           
               
               // if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[0]==this.currentQuestion.items[y].id)
                 
                  this.DataAntwort=this.DataAntwort+1;
                
               
                
                // if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[1]==this.currentQuestion.items[y].id)
                  this.DataAntwort1=this.DataAntwort1+1;
                
               
               
          }
      }
   
      }  
    }
    
   //push titel für jeder Saülen  
   
   this.barChartData[0].label.push("Platz 1");
   this.barChartData[1].label.push("Platz 2");
   this.barChartData[2].label.push("Platz 1");
   this.barChartData[3].label.push("Platz 2");

   //push data (Anzahl jeder Antwort) in der Grafik Y axe
   
    this.barChartData[0].data[0]=this.DataAntwort;
    
    this.barChartData[1].data[0]=this.DataAntwort1;
    this.barChartData[2].data[1]=this.DataAntwort;
    
    this.barChartData[3].data[1]=this.DataAntwort1;
   
     
//die Platz 1 wird immer die belibste Bild in diesen Fall gezeigt 
if(this.currentQuestion.items!=null) {
     this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.id); 

     this.dataService.setMaxAntwortArray(this.DataAntwort);}
   
   break;

      case 'LikeDislikeQuestion':
      if(this.currentQuestion.items!=null){
        this.barChartLabels[0] =this.currentQuestion.items[0].label ;
      }
        console.log("taille de tt les question ",this.currentProject.activeSurvey.votes.length);
        console.log("taille du premier tableau de la  question ",this.currentProject.activeSurvey.votes[0].answers.length);
    
     for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
      {
      if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[i].answers[x].__typename=="LikeDislikeAnswer")
        { if(this.currentProject.activeSurvey.votes[i].answers[x].liked==true)
           {this.DataAntwort=this.DataAntwort+1;}
          else if(this.currentProject.activeSurvey.votes[i].answers[x].liked==false)
          {this.DataAntwort1=this.DataAntwort1+1;}
        
        } 
        
      }
    
    }   
          //anzahl like und dislike einer Bild 
     this.barChartData[0].data.push(this.DataAntwort);
     
     this.barChartData[0].label.push("✔");
     this.barChartData[1].data.push(this.DataAntwort1);
   
     this.barChartData[1].label.push("✖");
    //der Höchste Anzahl der Antwort für diese Frage 
     let maxi = Math.max(this.DataAntwort,this.DataAntwort1);
    
     //Visualisieren das Bilder als belibeste Bild, wenn der Anzahl der Antwort Like  höher als dislike Antwort ist
     if(this.currentQuestion.items!=null){
     if(maxi==this.DataAntwort)
     { 
       this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url); 
        this.dataService.setMaxAntwortArray(this.DataAntwort);
    }
  }
      break;

      case 'RegulatorQuestion':
      
      this.barChartLabels[0] ="1" ;
      this.barChartLabels[1] ="2" ;
      this.barChartLabels[2] ="3" ;
      this.barChartLabels[3] ="4" ;
      console.log("taille de tt les question ",this.currentProject.activeSurvey.votes.length);
      console.log("taille du premier tableau de la  question ",this.currentProject.activeSurvey.votes[0].answers.length);
      for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
      {
      if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[i].answers[x].__typename=="RegulatorAnswer")
      {
        if(this.currentProject.activeSurvey.votes[i].answers[x].rating==1) 
        this.DataAntwort=this.DataAntwort+1;
        if(this.currentProject.activeSurvey.votes[i].answers[x].rating==2)
        this.DataAntwort1=this.DataAntwort1+1;
        if(this.currentProject.activeSurvey.votes[i].answers[x].rating==3)
        this.DataAntwort2=this.DataAntwort2+1;
        if(this.currentProject.activeSurvey.votes[i].answers[x].rating==4)
        this.DataAntwort3=this.DataAntwort3+1;
        
      }
      
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
    
    
   // visualisirung der Bilder am ende 
   if (this.currentQuestion.items!=null){
    for(let i=0;i<this.currentQuestion.items.length;i++) {
    this.dataService.setChosenImageUrlarray(this.currentQuestion.items[i].image.url);
    }
   }
   
   
    //anzahl der Anwort für  jedes Bild 
    this.dataService.setMaxAntwortArray(this.DataAntwort);
    this.dataService.setMaxAntwortArray(this.DataAntwort1);
    this.dataService.setMaxAntwortArray(this.DataAntwort2);
    this.dataService.setMaxAntwortArray(this.DataAntwort3);
      break;
    
      case 'ChoiceQuestion': 
      console.log("taille de tt les question ",this.currentProject.activeSurvey.votes.length);
    console.log("taille du premier tableau de la  question ",this.currentProject.activeSurvey.votes[0].answers.length);
      for(let i=0;i<this.currentQuestion.choices.length;i++) 
      this.barChartLabels[i] =this.currentQuestion.choices[i].label ;
    
      this.barChartLegend = false;
      for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
      {
      if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[i].answers[x].__typename=="ChoiceAnswer")
        
       if(this.currentProject.activeSurvey.votes[i].answers[x].choice==this.currentQuestion.choices["0"].id)
     // if(this.currentQuestion.choices[0].id==this.currentQuestion.choices[i].id)
          this.DataAntwort=this.DataAntwort+1;
          else // if(this.currentQuestion.choices[1].id==this.currentQuestion.choices[i].id)
          this.DataAntwort1=this.DataAntwort1+1;
      }
    
      }   
    
    //anzahl der gewählte Bider für jeder Bilder (for bilder )
    
    this.barChartData[0].data[0]=this.DataAntwort;
    this.barChartData[0].label.push(" ❤ ");
    this.barChartData[1].data[1]=this.DataAntwort1;     
    this.barChartData[1].label.push(" ❤ ");    
    
     let maximm = Math.max(this.DataAntwort,this.DataAntwort1);
     if(this.currentQuestion.items!=null){
     if(maximm==this.DataAntwort)
    this.dataService.setChosenImageUrlarray(this.currentQuestion.choices[0].image.url);
    else
    this.dataService.setChosenImageUrlarray(this.currentQuestion.choices[1].image.url);
    this.dataService.setMaxAntwortArray(maximm);}
     
      break;

      case 'LikeQuestion':
      this.barChartLabels[0] =this.currentQuestion.value ;
      
    console.log("taille de tt les question ",this.currentProject.activeSurvey.votes.length);
    console.log("taille du premier tableau de la  question ",this.currentProject.activeSurvey.votes[0].answers.length);
      for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      { 
      for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
      {
       
     if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[i].answers[x].__typename=="LikeAnswer")
       if(this.currentProject.activeSurvey.votes[i].answers[x].liked==true)
           this.DataAntwort=this.DataAntwort+1;
         
          
       }
     
     }   
     this.barChartData = [
    {data: [], label: []}];  
           
     //Anzahl der Antwort like für die ganze bilder 
     this.barChartData[0].data[0]=this.DataAntwort;
    
     this.barChartData[0].label.push(" ❤ ");
     //TODO: Kann auch kein Item angezeigt werden?
     //es wird in Endscreen alles bilder für diese Frage gezeigt wird weil alle gleichzeitig als like gewählt sind
    if (this.currentQuestion.items!=null){
      for(let i=0;i<this.currentQuestion.items.length;i++) 
      { this.dataService.setChosenImageUrlarray(this.currentQuestion.items[i].image.url);
      this.dataService.setMaxAntwortArray(this.DataAntwort);}
    }
     
       break;
      case 'FavoriteQuestion':
      console.log("FavoriteQuestionFeedback");
      for(let i=0;i<this.currentQuestion.items.length;i++) 
      this.barChartLabels[i] =this.currentQuestion.items[i].label ;
      console.log("taille de tt les question ",this.currentProject.activeSurvey.votes.length);
      console.log("taille du premier tableau de la  question ",this.currentProject.activeSurvey.votes[0].answers.length);
      this.barChartLegend = false;
      for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<(<any>this.currentProject.activeSurvey.votes[i].answers).length;x++)
      {
        
     if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[i].answers[x].__typename=="FavoriteAnswer")
        
        if( this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[0].id)
           this.DataAntwort=this.DataAntwort+1;
         else   
         if(this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[1].id)
         this.DataAntwort1=this.DataAntwort1+1;
      
    
       }
     }   
       //anzahl der favorit antwort für jedes Bild   
      this.barChartData[0].data[0]=this.DataAntwort;
      this.barChartData[0].label.push(" ❤ ");
      this.barChartData[1].data[1]=this.DataAntwort1;     
      this.barChartData[1].label.push(" ❤ ");
      let m = Math.max(this.DataAntwort,this.DataAntwort1);
      if (this.currentQuestion.items!=null){
      if(m==this.DataAntwort)
      this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
      else
      this.dataService.setChosenImageUrlarray(this.currentQuestion.items[1].image.url);
      this.dataService.setMaxAntwortArray(m);}
      break;
    }
      //console.log("image question ",this.currentQuestion.items[1].image.url);
    
   
      this.image=this.dataService.getChosenImageUrl();
   
    //TODO WIRD HIER AUCH mit dem Button gedrückt?
    this.max=this.dataService.getContext().activeSurvey.questions.length;
    (this.dataService.getAnswerNumber() == this.max) ? this.title_nextPage="Das war's!" : this.title_nextPage="Weiter geht's zur nächsten Frage!";
    this.sub=this.messageService.getMessage().subscribe( message => {
      console.log("FEEDBACK: " + message);
      this.nextPage();
    });

  this.timer= setTimeout( () => {
        this.nextPage();
    }, Constants.TIMER_FEEDBACK);  
  }

  
 

  ngOnDestroy(){}
}

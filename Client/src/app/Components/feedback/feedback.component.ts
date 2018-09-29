import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { MessageService } from '../../Services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Context, Question } from '../../types';
import { Constants } from '../../constants';
import { SubscriptionsService } from '../../Services/subscriptions.service';
import { Apollo } from 'apollo-angular';
import { updateDevice } from './../../GraphQL/Device.gql'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  subContext: Subscription;
  private title_nextPage;
  private max: number;
  private image: string;
  private timer;

  public currentProject: Context;
  public currentQuestion: Question;

  public DataAntwort: number = 0;
  public DataAntwort1: number = 0;
  public DataAntwort2: number = 0;
  public DataAntwort3: number = 0;
  public DataAntwortP: number = 0;
  public DataAntwortP1: number = 0;

  public barChartOptions: any = {
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
      rigth: 5
    },
    responsive: true,
    title: {
      text: '',
      fontColor: "white",
      fontSize: 50,
      fontFamily: "Raleway",
      display: true
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public ArrayBilder: any[] = [];

  public chartColors: Array<any> = [
    { // first color
      fontColor:'#fafafa',
      fontfamily:' Helvetica, Arial, sans-serif',
      backgroundColor: 'rgb(28,128,108)',
      borderColor: 'rgb(28,128,108)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // second color
      backgroundColor: 'rgb(53,104,45)',
      borderColor: 'rgb(53,104,45)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // third color
      backgroundColor: 'rgb(0,136,0)',
      borderColor: 'rgb(0,136,0)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // fourth color
      backgroundColor: 'rgb(0,176,0)',
      borderColor: 'rgb(0,176,0)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },{ // first color
      backgroundColor: 'rgb(28,128,108)',
      borderColor: 'rgb(28,128,108)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // second color
      backgroundColor: 'rgb(53,104,45)',
      borderColor: 'rgb(53,104,45)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // third color
      backgroundColor: 'rgb(0,136,0)',
      borderColor: 'rgb(0,136,0)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // fourth color
      backgroundColor: 'rgb(0,176,0)',
      borderColor: 'rgb(0,176,0)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // first color
      backgroundColor: 'rgb(28,128,108)',
      borderColor: 'rgb(28,128,108)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // second color
      backgroundColor: 'rgb(53,104,45)',
      borderColor: 'rgb(53,104,45)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // third color
      backgroundColor: 'rgb(0,136,0)',
      borderColor: 'rgb(0,136,0)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // fourth color
      backgroundColor: 'rgb(0,176,0)',
      borderColor: 'rgb(0,176,0)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // first color
      backgroundColor: 'rgb(28,128,108)',
      borderColor: 'rgb(28,128,108)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // second color
      backgroundColor: 'rgb(53,104,45)',
      borderColor: 'rgb(53,104,45)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // third color
      backgroundColor: 'rgb(0,136,0)',
      borderColor: 'rgb(0,136,0)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    },
    { // fourth color
      backgroundColor: 'rgb(0,176,0)',
      borderColor: 'rgb(0,176,0)',
      pointBackgroundColor: 'rgb(90,132,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(90,132,135,0.2)',
      pointHoverBorderColor: 'rgb(90,132,135)'
    }
  ];
  public barChartData: any[] = [
    {
      data: [], label: [],
      borderWidth: 2,
      hoverBorderWidth: 0,
      scaleOverride:true,
      scaleSteps:1,
      scaleStartValue:0,
      scaleStepWidth:5,





    }, {
      data: [], label: [],
      borderWidth: 2,
      hoverBorderWidth: 0,
      scaleOverride: true,
      scaleSteps: 1,
      scaleStartValue: 0,
      scaleStepWidth: 5,

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

  constructor(private apollo: Apollo,
    private dataService: DataService,
    private router: Router,
    private messageService: MessageService,
    private subscriptionsService: SubscriptionsService,
    private dialog: MatDialog) {
  }
  nextPage() {
    //Button wurde gedrückt, dann stoppt der Timer
    clearTimeout(this.timer);
    this.sub.unsubscribe();
    this.subContext.unsubscribe();
    //Prüfe ob zum Ende oder zur nächsten Frage
    (this.dataService.getAnswerNumber() == this.max) ? this.router.navigate(['/end']) : this.router.navigate(['/question']);
  }

  ngOnInit() {this.currentProject = this.dataService.getContext();
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

let max=0;
console.log("taille de tt les question ",this.currentProject.activeSurvey.votes.length);
    console.log("taille du premier tableau de la  question ",this.currentProject.activeSurvey.votes[0].answers.length);
let mi=0;let xi=0;
    for(let y=0;y<(<any>this.currentQuestion.items).length;y++)
     {
     for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
     {
     for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
     {

        if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[i].answers[x].__typename=="RankingAnswer")
          { mi=i;xi=x;

if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems!=null)
            {
            if(this.currentQuestion.items.length==4)
            { if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[0]==this.currentQuestion.items[y].id)
                  this.DataAntwort=this.DataAntwort+1;
                  if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[1]==this.currentQuestion.items[y].id)
                  this.DataAntwort1=this.DataAntwort1+1;
                  if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[2]==this.currentQuestion.items[y].id)
                  this.DataAntwort2=this.DataAntwort2+1;
                  if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[3]==this.currentQuestion.items[y].id)
                  this.DataAntwort3=this.DataAntwort3+1;
            }
            if(this.currentQuestion.items.length==3)
            { if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[0]==this.currentQuestion.items[y].id)
                  this.DataAntwort=this.DataAntwort+1;
                  if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[1]==this.currentQuestion.items[y].id)
                  this.DataAntwort1=this.DataAntwort1+1;
                  if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[2]==this.currentQuestion.items[y].id)
                  this.DataAntwort2=this.DataAntwort2+1;

            }

            if(this.currentQuestion.items.length==2)
            { if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[0]==this.currentQuestion.items[y].id)
                  this.DataAntwort=this.DataAntwort+1;
                  if(this.currentProject.activeSurvey.votes[i].answers[x].rankedItems[1]==this.currentQuestion.items[y].id)
                  this.DataAntwort1=this.DataAntwort1+1;


            }
          }

          }
      }

      }
    }

   //push titel für jeder Saülen
   if(this.currentQuestion.items!=null)
   {
   if(this.currentQuestion.items.length==2)
   {
    this.barChartData = [
      {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []}


    ];
    this.barChartData[0].data[0]=this.DataAntwort;

    this.barChartData[1].data[0]=this.DataAntwort1;
    this.barChartData[2].data[1]=this.DataAntwort;
    this.barChartData[3].data[1]=this.DataAntwort1+5;
   this.barChartData[0].label.push("Platz 1");
   this.barChartData[1].label.push("Platz 2");
   this.barChartData[2].label.push("Platz 1");
   this.barChartData[3].label.push("Platz 2");



  }
    if(this.currentQuestion.items.length==3)
    {
      this.barChartData = [
        {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []},
        {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []},
        {data: [], label: []}
      ];this.barChartLegend=false;
      this.barChartData[0].label.push("Platz 1");
    this.barChartData[1].label.push("Platz 2");
    this.barChartData[2].label.push("Platz 3");
    this.barChartData[3].label.push("Platz 1");
    this.barChartData[4].label.push("Platz 2");
    this.barChartData[5].label.push("Platz 3");
    this.barChartLegend=true;
    this.barChartData[6].label.push("Platz 1");
    this.barChartData[7].label.push("Platz 2");
    this.barChartData[8].label.push("Platz 3");
    this.barChartData[0].data[0]=this.DataAntwort;
    this.barChartData[1].data[0]=this.DataAntwort1;
    this.barChartData[2].data[0]=this.DataAntwort2;
    this.barChartData[3].data[1]=this.DataAntwort+5;
    this.barChartData[4].data[1]=this.DataAntwort1;
    this.barChartData[5].data[1]=this.DataAntwort2+7;
    this.barChartData[6].data[2]=this.DataAntwort+2;
    this.barChartData[7].data[2]=this.DataAntwort1+5;
    this.barChartData[8].data[2]=this.DataAntwort2+1;


    }
    if(this.currentQuestion.items.length==4)
    {
      this.barChartData = [
        {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []},
        {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []},
        {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []},
        {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []}

      ];this.barChartLegend=false;
      this.barChartData[0].label.push("Platz 1");
    this.barChartData[1].label.push("Platz 2");
    this.barChartData[2].label.push("Platz 3");
    this.barChartData[3].label.push("Platz 4");
    this.barChartData[4].label.push("Platz 1");
    this.barChartData[5].label.push("Platz 2");
    this.barChartData[6].label.push("Platz 3");
    this.barChartData[7].label.push("Platz 4");
    this.barChartData[8].label.push("Platz 1");
    this.barChartData[9].label.push("Platz 2");
    this.barChartData[10].label.push("Platz 3");
    this.barChartData[11].label.push("Platz 4");
    this.barChartLegend=true;
    this.barChartData[12].label.push("Platz 1");
    this.barChartData[13].label.push("Platz 2");
    this.barChartData[14].label.push("Platz 3");
    this.barChartData[15].label.push("Platz 4");
    this.barChartData[0].data[0]=this.DataAntwort;

    this.barChartData[1].data[0]=this.DataAntwort1;
    this.barChartData[2].data[0]=this.DataAntwort2;
    this.barChartData[3].data[0]=this.DataAntwort3+5;
    this.barChartData[4].data[1]=this.DataAntwort;
    this.barChartData[5].data[1]=this.DataAntwort1+2;
    this.barChartData[6].data[1]=this.DataAntwort2+2;
    this.barChartData[7].data[1]=this.DataAntwort3+5;
    this.barChartData[8].data[2]=this.DataAntwort+2;
    this.barChartData[9].data[2]=this.DataAntwort1+5;
    this.barChartData[10].data[2]=this.DataAntwort2+4;
    this.barChartData[11].data[2]=this.DataAntwort3+4;
    this.barChartData[12].data[3]=this.DataAntwort+2;
    this.barChartData[13].data[3]=this.DataAntwort1+5;
    this.barChartData[14].data[3]=this.DataAntwort2+4;
    this.barChartData[15].data[3]=this.DataAntwort3+4;


this.barChartLegend=false;
    }}
   //push data (Anzahl jeder Antwort) in der Grafik Y axe
   //this.barChartLegend=false;




//die Platz 1 wird immer die belibste Bild in diesen Fall gezeigt
if(this.currentQuestion.items!=null) {
  console.log("Ranking");
     this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
     this.dataService.setChosenQuestionarray(this.currentQuestion.value);
     this.dataService.setMaxAntwortArray(this.DataAntwort);
     console.log("data ",this.DataAntwort);
    }

   break;

      case 'LikeDislikeQuestion':

        //this.barChartLabels[0] =" " ;

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

     this.barChartData[0].label.push("✔ Like ");

     this.barChartData[1].data.push(this.DataAntwort1);

     this.barChartData[1].label.push("✖ Dislike ");
    //der Höchste Anzahl der Antwort für diese Frage
     let maxi = Math.max(this.DataAntwort,this.DataAntwort1);

     //Visualisieren das Bilder als belibeste Bild, wenn der Anzahl der Antwort Like  höher als dislike Antwort ist
     if(this.currentQuestion.items!=null){
      /*for(let i=0;i<this.currentQuestion.items.length;i++) {
    this.dataService.setChosenImageUrlarray(this.currentQuestion.items[i].image.url);
    }*/
    if(maxi==this.DataAntwort)
     { console.log("likedislike");
      this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
      this.dataService.setChosenQuestionarray(this.currentQuestion.value);
      this.dataService.setMaxAntwortArray(maxi);
      console.log("data ",maxi);
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


   // visualisirung aller Bilder am ende

   if (this.currentQuestion.items!=null){
    console.log("regolator");
    this.dataService.setChosenQuestionarray(this.currentQuestion.value)
    this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
    /*for(let i=0;i<this.currentQuestion.items.length;i++) {
    this.dataService.setChosenImageUrlarray(this.currentQuestion.items[i].image.url);
    }*/
   }


    //anzahl der Anwort für  den regolator 1 beliebste Bild
    this.dataService.setMaxAntwortArray(this.DataAntwort);
    console.log("data ",this.DataAntwort);
      break;

      case 'ChoiceQuestion':
      console.log("taille de tt les question ",this.currentProject.activeSurvey.votes.length);
    console.log("taille du premier tableau de la  question ",this.currentProject.activeSurvey.votes[0].answers.length);
    if (this.currentQuestion.items!=null){

      for(let i=0;i<this.currentQuestion.choices.length;i++)
      this.barChartLabels[i] =this.currentQuestion.choices[i].label ;
    }
      this.barChartLegend = false;

      for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<this.currentProject.activeSurvey.votes[i].answers.length;x++)
      {
      if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[i].answers[x].__typename=="ChoiceAnswer")

      {mi=i;xi=x;
      if(this.currentProject.activeSurvey.votes[i].answers[x].choice!=null)
                  {
                  if(this.currentQuestion.items.length==4)
                  {
                     if(this.currentProject.activeSurvey.votes[i].answers[x].choice==this.currentQuestion.choices[0].id)
                        this.DataAntwort=this.DataAntwort+1;
                        if(this.currentProject.activeSurvey.votes[i].answers[x].choice==this.currentQuestion.choices[1].id)
                        this.DataAntwort1=this.DataAntwort1+1;
                        if(this.currentProject.activeSurvey.votes[i].answers[x].choice==this.currentQuestion.choices[2].id)
                        this.DataAntwort2=this.DataAntwort2+1;
                        if(this.currentProject.activeSurvey.votes[i].answers[x].choice==this.currentQuestion.choices[3].id)
                        this.DataAntwort3=this.DataAntwort3+1;
                  }
                  if(this.currentQuestion.items.length==3)
                  {
                    if(this.currentProject.activeSurvey.votes[i].answers[x].choice==this.currentQuestion.choices[0].id)
                        this.DataAntwort=this.DataAntwort+1;
                        if(this.currentProject.activeSurvey.votes[i].answers[x].choice==this.currentQuestion.choices[1].id)
                        this.DataAntwort1=this.DataAntwort1+1;
                        if(this.currentProject.activeSurvey.votes[i].answers[x].choice==this.currentQuestion.choices[2].id)
                        this.DataAntwort2=this.DataAntwort2+1;

                  }
                  if(this.currentQuestion.items.length==2)
                  { if(this.currentProject.activeSurvey.votes[i].answers[x].choice==this.currentQuestion.choices[0].id)
                        this.DataAntwort=this.DataAntwort+1;
                        if(this.currentProject.activeSurvey.votes[i].answers[x].choice==this.currentQuestion.choices[1].id)
                        this.DataAntwort1=this.DataAntwort1+1;


                  }
                }


      }
    }}

    //anzahl der gewählte Bider für jeder Bilder (for bilder )


    if(this.currentQuestion.items!=null)
   {
   if(this.currentQuestion.items.length==2)
   {
    this.barChartData = [
      {data: [], label: []},{data: [], label: []}


    ];
    this.barChartData[0].data[0]=this.DataAntwort;
    this.barChartData[0].label.push(" ❤ ");
    this.barChartData[1].data[1]=this.DataAntwort1;
    this.barChartData[1].label.push(" ❤ ");
    let maximm = Math.max(this.DataAntwort,this.DataAntwort1);
    if(this.currentQuestion.items!=null){
    if(maximm==this.DataAntwort){
     console.log("choiisequestion");
    this.dataService.setChosenQuestionarray(this.currentQuestion.value)
  this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
  this.dataService.setMaxAntwortArray(maximm);
  console.log("data ",maximm);
}
   else{
     console.log("choisequestion");
   this.dataService.setChosenQuestionarray(this.currentQuestion.value)
  this.dataService.setChosenImageUrlarray(this.currentQuestion.items[1].image.url);}
   this.dataService.setMaxAntwortArray(maximm);
   console.log("data ",maximm);
  }

  }
    if(this.currentQuestion.items.length==3)
    {
      this.barChartData = [
        {data: [], label: []},{data: [], label: []},{data: [], label: []}


      ];
      this.barChartData[0].data[0]=this.DataAntwort;
      this.barChartData[0].label.push(" ❤ ");
      this.barChartData[1].data[1]=this.DataAntwort1;
      this.barChartData[1].label.push(" ❤ ");
      this.barChartData[2].data[2]=this.DataAntwort2;
      this.barChartData[2].label.push(" ❤ ");
      let maximm = Math.max(this.DataAntwort,this.DataAntwort1,this.DataAntwort2);
      this.dataService.setMaxAntwortArray(maximm);
     console.log("data ",maximm);
      if(this.currentQuestion.items!=null){
      if(maximm==this.DataAntwort){
       console.log("choisequestion");
      this.dataService.setChosenQuestionarray(this.currentQuestion.value)
    this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
  break;
  }
     if(maximm==this.DataAntwort1){
       console.log("chisequestion");
     this.dataService.setChosenQuestionarray(this.currentQuestion.value)
    this.dataService.setChosenImageUrlarray(this.currentQuestion.items[1].image.url);
  break;
  }
    if(maximm==this.DataAntwort2){
      console.log("choicequestion");
      this.dataService.setChosenQuestionarray(this.currentQuestion.value)
     this.dataService.setChosenImageUrlarray(this.currentQuestion.items[2].image.url);
     break;
    }

    }


    }
    if(this.currentQuestion.items.length==4)
    {
      this.barChartData = [
        {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []}

      ];this.barChartLegend=false;
      this.barChartData[0].data[0]=this.DataAntwort;
      this.barChartData[0].label.push(" ❤ ");
      this.barChartData[1].data[1]=this.DataAntwort1;
      this.barChartData[1].label.push(" ❤ ");
      this.barChartData[2].data[2]=this.DataAntwort2;
      this.barChartData[2].label.push(" ❤ ");
      this.barChartData[3].data[3]=this.DataAntwort3;
      this.barChartData[3].label.push(" ❤ ");
      this.barChartLegend=false;
      let maximm = Math.max(this.DataAntwort,this.DataAntwort1,this.DataAntwort2,this.DataAntwort3);
      this.dataService.setMaxAntwortArray(maximm);
      this.dataService.setChosenQuestionarray(this.currentQuestion.value);
      console.log("data ",maximm);
      if(this.currentQuestion.items!=null){
      if(maximm==this.DataAntwort){
       console.log("choisequestion");

    this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
    break;
  }
     if(maximm==this.DataAntwort1){
       console.log("chisequestion");

    this.dataService.setChosenImageUrlarray(this.currentQuestion.items[1].image.url);
   break;
  }
    if(maximm==this.DataAntwort2){
      console.log("choicequestion");

     this.dataService.setChosenImageUrlarray(this.currentQuestion.items[2].image.url);
     break;
    }
    if(maximm==this.DataAntwort3){
      console.log("choicequestion");

     this.dataService.setChosenImageUrlarray(this.currentQuestion.items[3].image.url);
     break;
    }

    }


    }}



      break;

      case 'LikeQuestion':
      this.barChartLabels[0] ="Like" ;

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
      console.log("likequ");
      this.dataService.setChosenQuestionarray(this.currentQuestion.value);
    this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
    this.dataService.setMaxAntwortArray(this.DataAntwort);
    console.log("data ",this.DataAntwort);
     /* for(let i=0;i<this.currentQuestion.items.length;i++)
      { this.dataService.setChosenImageUrlarray(this.currentQuestion.items[i].image.url);
      this.dataService.setMaxAntwortArray(this.DataAntwort);}*/
    }

       break;
      case 'FavoriteQuestion':
      if (this.currentQuestion.items!=null){
      for(let i=0;i<this.currentQuestion.items.length;i++)
      this.barChartLabels[i] =this.currentQuestion.items[i].label ;
      }
      console.log("taille question ",this.currentQuestion.items.length);
      console.log("taille du premier tableau de la  question ",this.currentProject.activeSurvey.votes[0].answers.length);
      this.barChartLegend = false;
      for(let i=0;i<(<any>this.currentProject.activeSurvey.votes).length;i++)
      {
      for(let x=0;x<(<any>this.currentProject.activeSurvey.votes[i].answers).length;x++)
      {

     if(this.currentProject.activeSurvey.votes[i].answers[x].question==this.currentQuestion.id && this.currentProject.activeSurvey.votes[i].answers[x].__typename=="FavoriteAnswer")

     {




         if(this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem!=null)
         {
         if(this.currentQuestion.items.length==4)
         {
          if( this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[0].id)
          this.DataAntwort=this.DataAntwort+1;
          if( this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[1].id)
          this.DataAntwort1=this.DataAntwort1+1;
           if( this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[2].id)
          this.DataAntwort2=this.DataAntwort2+1;
           if( this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[3].id)
          this.DataAntwort3=this.DataAntwort3+1;
         }
         if(this.currentQuestion.items.length==3)
         {
          if( this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[0].id)
          this.DataAntwort=this.DataAntwort+1;
          if( this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[1].id)
          this.DataAntwort1=this.DataAntwort1+1;
           if( this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[2].id)
          this.DataAntwort2=this.DataAntwort2+1;

         }
         if(this.currentQuestion.items.length==2)
         { if( this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[0].id)
          this.DataAntwort=this.DataAntwort+1;
          if( this.currentProject.activeSurvey.votes[i].answers[x].favoriteItem==this.currentQuestion.items[1].id)
          this.DataAntwort1=this.DataAntwort1+1;



         }
       }
      }


}




       }
       if(this.currentQuestion.items!=null)
       {
       if(this.currentQuestion.items.length==2)
       {
        this.barChartData = [
          {data: [], label: []},{data: [], label: []}


        ];
        this.barChartData[0].data[0]=this.DataAntwort;
      this.barChartData[0].label.push(" ❤ ");
      this.barChartData[1].data[1]=this.DataAntwort1;
      this.barChartData[1].label.push(" ❤ ");
      let m = Math.max(this.DataAntwort,this.DataAntwort1);
      if (this.currentQuestion.items!=null){
      if(m==this.DataAntwort){
        console.log("favorite");
        this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
        this.dataService.setChosenQuestionarray(this.currentQuestion.value);
        this.dataService.setMaxAntwortArray(m);
        console.log("data ",m);
      }
      else {
        console.log("favorite");
        this.dataService.setChosenImageUrlarray(this.currentQuestion.items[1].image.url);
       this.dataService.setChosenQuestionarray(this.currentQuestion.value);
       this.dataService.setMaxAntwortArray(m);
       console.log("data ",m);
      }
      }

      }
       //anzahl der favorit antwort für jedes Bild

       if(this.currentQuestion.items.length==3)
       {
         this.barChartData = [
           {data: [], label: []},{data: [], label: []},{data: [], label: []}


         ];
         this.barChartData[0].data[0]=this.DataAntwort;
         this.barChartData[0].label.push(" ❤ ");
         this.barChartData[1].data[1]=this.DataAntwort1;
         this.barChartData[1].label.push(" ❤ ");
         this.barChartData[2].data[2]=this.DataAntwort2;
         this.barChartData[2].label.push(" ❤ ");
         let maximm = Math.max(this.DataAntwort,this.DataAntwort1,this.DataAntwort2);
         this.dataService.setMaxAntwortArray(maximm);
         console.log("data ",maximm);
         if(this.currentQuestion.items!=null){
         if(maximm==this.DataAntwort){
          console.log("favquestion");
         this.dataService.setChosenQuestionarray(this.currentQuestion.value)
       this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
      break;
      }
        if(maximm==this.DataAntwort1){
          console.log("favquestion");
        this.dataService.setChosenQuestionarray(this.currentQuestion.value)
       this.dataService.setChosenImageUrlarray(this.currentQuestion.items[1].image.url);
      break;
      }
       if(maximm==this.DataAntwort2){
         console.log("favquestion");
         this.dataService.setChosenQuestionarray(this.currentQuestion.value)
        this.dataService.setChosenImageUrlarray(this.currentQuestion.items[2].image.url);
        break;
       }

      }


       }
       if(this.currentQuestion.items.length==4)
       {
         this.barChartData = [
           {data: [], label: []},{data: [], label: []},{data: [], label: []},{data: [], label: []}

         ];
         this.barChartData[0].data[0]=this.DataAntwort;
         this.barChartData[0].label.push(" ❤ ");
         this.barChartData[1].data[1]=this.DataAntwort1;
         this.barChartData[1].label.push(" ❤ ");
         this.barChartData[2].data[2]=this.DataAntwort2;
         this.barChartData[2].label.push(" ❤ ");
         this.barChartData[3].data[3]=this.DataAntwort3;
         this.barChartData[3].label.push(" ❤ ");
         this.barChartLegend=false;
         let maximm = Math.max(this.DataAntwort,this.DataAntwort1,this.DataAntwort2,this.DataAntwort3);

         if(this.currentQuestion.items!=null){ this.dataService.setMaxAntwortArray(maximm);
          console.log("data ",maximm);
         if(maximm==this.DataAntwort){
          console.log("favquestion");
         this.dataService.setChosenQuestionarray(this.currentQuestion.value)
       this.dataService.setChosenImageUrlarray(this.currentQuestion.items[0].image.url);
      break;
      }
        if(maximm==this.DataAntwort1){
          console.log("favquestion");
        this.dataService.setChosenQuestionarray(this.currentQuestion.value)
       this.dataService.setChosenImageUrlarray(this.currentQuestion.items[1].image.url);break;}
       if(maximm==this.DataAntwort2){
         console.log("faequestion");
         this.dataService.setChosenQuestionarray(this.currentQuestion.value)
        this.dataService.setChosenImageUrlarray(this.currentQuestion.items[2].image.url);break;
       }
       if(maximm==this.DataAntwort3){
         console.log("favquestion");
         this.dataService.setChosenQuestionarray(this.currentQuestion.value)
        this.dataService.setChosenImageUrlarray(this.currentQuestion.items[3].image.url);break;
       }

      }


       }}

      break;

    }


    let url= this.dataService.getChosenImageUrl();
    this.image=(url!=null) ? url : null;
    this.max=this.dataService.getContext().activeSurvey.questions.length;
    (this.dataService.getAnswerNumber() == this.max) ? this.title_nextPage="Das war's!" : this.title_nextPage="Weiter geht's zur nächsten Frage!";
    //ButtonSubscriptions der Nachrichten, Button wählt die nächste Seite aus, egal welcher Button gedrückt wurde
    this.sub = this.messageService.getMessage().subscribe(message => {
      //console.log(message);
      this.nextPage();
    });

    //Subscribed Context, falls Updates reinkommen, dann zurück zur Startseite und Device abmelden
    this.subContext = this.subscriptionsService.getMessageSubscription().subscribe(message => {
      console.log("Abmelden, denn " + message);
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: updateDevice,
        variables: {
          deviceID:this.dataService.getDeviceID(),
          context: null,
        }
      }).subscribe(({data}) => {
        console.log("mutation update DeviceContext", data);
        //Position der Fragen auf 0 setzen
        this.dataService.setPositionQuestion(0);
        this.dataService.setAnswerNumberZero();
        //close Dialog nach paar Sekungen und dann zurück zum Anfang
        let dialogRef=this.dialog.open(DialogComponent, {
          minHeight: '20%',
          minWidth: '40%'
        });
        setTimeout(() => {
          dialogRef.close();
          this.router.navigateByUrl("/");
        }, Constants.TIMER_DIALOG);
      });
  })

  this.timer= setTimeout( () => {
    this.nextPage();
}, Constants.TIMER_FEEDBACK);
  }



  ngOnDestroy() {

  }
}

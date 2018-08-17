import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { MessageService } from '../../Services/message.service'; 

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
    this.image=this.dataService.getChosenImageUrl();
    //TODO WIRD HIER AUCH mit dem Button gedrückt?
    this.max=this.dataService.getContext().activeSurvey.questions.length;
    (this.dataService.getAnswerNumber() == this.max) ? this.title_nextPage="Das war's!" : this.title_nextPage="Weiter geht's zur nächsten Frage!";
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

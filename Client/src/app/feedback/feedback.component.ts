import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { MessageService } from '../message.service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  //private sub: Subscription;
  private max: number;
  constructor(private dataService: DataService, private router: Router, private messageService: MessageService) { 

  }
  nextPage(){
    //this.sub.unsubscribe(); 
    console.log("Aktuelle Anzahl " + this.dataService.getAnswerNumber());
    console.log("Maximal Anzahl " + this.max); 
    //Prüfe ob zum Ende oder zur nächsten Frage
    (this.dataService.getAnswerNumber() == this.max) ? this.router.navigate(['/end']) : this.router.navigate(['/question']);
  }

  ngOnInit() {
    //TODO WIRD HIER AUCH mit dem Button gedrückt?
    this.max=this.dataService.getContext().activeSurvey.questions.length;
    /*this.sub=this.messageService.getMessage().subscribe( message => {
      console.log("FEEDBACK: " + message);
      this.nextPage();
    });*/

    console.log("im Feedback");
    setTimeout( () => {
      this.nextPage();
  }, 5000);  //5s

  }



  ngOnDestroy(){
}
}

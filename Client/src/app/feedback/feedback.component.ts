import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { MessageService } from '../message.service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  constructor(private apollo: Apollo, private router: Router, private messageService: MessageService) { 

  }
  

  ngOnInit() {

    this.sub=this.messageService.getMessage().subscribe( message => {
      //console.log("FEEDBACK: " + message);
      if (message == undefined || message == null){
        // dann wurde keine Nummer übergeben, also leere Nachricht erhalten, passiert nichts 
      } else {
        this.messageService.clearMessage();
        this.router.navigate(['/question']);
      }
    });

    console.log("im Feedback");
    setTimeout( () => {
      this.router.navigate(['/question']);
  }, 5000);  //5s

  }
  ngOnDestroy(){
    this.sub.unsubscribe();
}
}

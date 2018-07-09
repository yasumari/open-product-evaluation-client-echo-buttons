import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private apollo: Apollo, private router: Router) {  }

  ngOnInit() {
    setTimeout( () => {
      this.router.navigate(['/question']);
  }, 5000);  //5s

  }

}

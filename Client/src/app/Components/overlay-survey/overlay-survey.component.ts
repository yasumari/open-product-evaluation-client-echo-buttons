import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-survey',
  templateUrl: './overlay-survey.component.html',
  styles: [`
    :host {
      display: block;
      background: blue;
    }

    h1 {
      margin: 0;
      padding: 1em;
    }
  `]
})
export class OverlaySurveyComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    console.log("CONTAINER OFFEN");
  }

}

import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from './data.service';

import { Survey, Query, Owner, Question, Images } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { subscribeContext } from '../GraphQL/Context.gql';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionsService {
  private subject = new Subject<string>();

  constructor(private apollo: Apollo, private router: Router) {
  }
 
  sendMessageSubscription(message: string) {
    console.log("MESSAGE: " + message);
    this.subject.next(message);
}


getMessageSubscription(): Observable<any> {
    return this.subject.asObservable();
}

   subscribeContext(contextID: String){
     var survey=this.apollo.subscribe({
       query: subscribeContext,
       variables: {cID: contextID}
     })
     survey.subscribe( (hi) => {
       console.log(hi);
       this.sendMessageSubscription("HII");
     });
 }


}

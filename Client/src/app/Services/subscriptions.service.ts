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
  private survey;
  constructor(private apollo: Apollo, private router: Router) {
  }
 
  sendMessageSubscription(message: string) {
    this.subject.next(message);
}

    getMessageSubscription(): Observable<any> {
        return this.subject.asObservable();
    }

    unSubscribe(){
      this.subject.next();
      this.subject.complete();
    }

   subscribeContext(contextID: String){
      this.survey=this.apollo.subscribe({
       query: subscribeContext,
       variables: {cID: contextID}
     })
     this.survey.subscribe( (data) => {
       console.log(data);
       //nur benachrichten, wenn es sich um das activeSurvey handelt. 
       if (data.data.contextUpdate.changedAttributes.includes("activeSurvey")){
          console.log("ActiveSurvey wurde geändert");
          this.sendMessageSubscription("ActiveSurvey");
          //Sobald eine Änderung für das Survey 
          this.unSubscribe();
       } else {
          console.log("Device wird nicht von Änderungen beeinflusst");
          this.sendMessageSubscription("TEST");
          this.unSubscribe();
       }
    });
 }


}

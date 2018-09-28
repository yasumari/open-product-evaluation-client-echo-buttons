import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { subscribeContext } from '../GraphQL/Context.gql';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionsService {
  private subject = new Subject<string>();
  private survey;
  private subscription;
  constructor(private apollo: Apollo) {}
 
  sendMessageSubscription(message: string) {
    console.log("MESSAGE wird gesendet: " + message);
    this.subject.next(message);
}

    getMessageSubscription(): Observable<any> {
      return this.subject.asObservable();
    }

    unsub(){
      this.subscription.unsubscribe();
    }

   subscribeContext(contextID: String){
      this.survey=this.apollo.subscribe({
       query: subscribeContext,
       variables: {cID: contextID}
     })
     this.subscription=this.survey.subscribe( (data) => {
       console.log("SUBSCRIPTION: ", data);
       //nur benachrichten, wenn es sich um das activeSurvey handelt. 
       if (data.data.contextUpdate.changedAttributes.includes("activeSurvey")){
          console.log("ActiveSurvey wurde geändert");
          this.sendMessageSubscription("ActiveSurvey");
          this.unsub();
          //Sobald eine Änderung für das Survey 
       } else if (data.data.contextUpdate.changedAttributes.includes("name")){
        console.log("Name wurde geändert");
        this.sendMessageSubscription("Name");
        this.unsub();
        //Sobald eine Änderung für das Survey 
     } 
       else {
          console.log("Device wird nicht von Änderungen beeinflusst");
       }
    })
 }


}

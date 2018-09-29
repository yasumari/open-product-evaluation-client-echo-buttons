import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { subscribeContext } from '../GraphQL/Context.gql';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionsService {
  private subject = new Subject<string>();
  private survey;
  private subscription;
  constructor(private apollo: Apollo) {}
 
  sendMessageSubscription(message: string) {
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
       if (data.data.contextUpdate.event=="DELETE" && data.data.contextUpdate.changedAttributes==null){
        console.log("ActiveSurvey wurde gelöscht");
        this.sendMessageSubscription("activeSurvey");
        this.unsub();
       } else if (data.data.contextUpdate.changedAttributes==null){
         console.log("Attribut ist null, keine Änderung");
       }
       //nur benachrichten, wenn es sich um das activeSurvey handelt. 
       else if (data.data.contextUpdate.changedAttributes.includes("activeSurvey")){
          console.log("ActiveSurvey wurde geändert");
          this.sendMessageSubscription("activeSurvey");
          this.unsub();
          //Sobald eine Änderung für das Survey 
       } else {
         //Keine Reaktionen
        console.log("Geändert: ", data.data.contextUpdate.changedAttributes[0]);
       }
    })
 }
}

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { subscribeContext } from './../GraphQL/Context.gql';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionsService {

  constructor(private messageService: MessageService, private router: Router, private apollo: Apollo) {
  }

  hi(name: string){
    console.log(name);
  }
  subscribeContext(contextID: String){
    this.apollo.subscribe({
      query: subscribeContext,
      variables: {cID: contextID}
    }).subscribe({
      next (data) {
        // Notify your application with the new arrived data
        console.log("Irgendwas wurde geupdatet", data);
        //TODO Fälle Abfragen, wo es egal ist, sonst zurück zum Anfang
      }
    });
    this.hi("adsfg");
}

}

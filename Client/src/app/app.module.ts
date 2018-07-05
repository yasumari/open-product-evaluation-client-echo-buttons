import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { QuestionComponent } from './question/question.component';
import { MenuComponent } from './menu.component';
import { CONST_ROUTING } from './app.routing';
import { ProjectComponent } from './project/project.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EndScreenComponent } from './end-screen/end-screen.component';
import { HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { ApolloLink, concat } from 'apollo-link';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    QuestionComponent,
    MenuComponent,
    ProjectComponent,
    FeedbackComponent,
    EndScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
     CONST_ROUTING
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private dataService: DataService
  ) {
  const http = httpLink.create({uri: 'http://localhost:3000/'});
    
        const authMiddleware = new ApolloLink((operation, forward) => {
          let token = this.dataService.getToken();
        console.log("NEUER HEADER " + token);
          // add the authorization to the headers
          operation.setContext({
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
          });

          return forward(operation);
        });
    apollo.create({
      link:concat(authMiddleware, http),
      cache: new InMemoryCache()
    });
  }
}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { CONST_ROUTING } from './app.routing';
import { ListComponent } from './Components/list/list.component';
import { QuestionComponent } from './Components/question/question.component';
import { ProjectComponent } from './Components/project/project.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { EndScreenComponent } from './Components/end-screen/end-screen.component';
import { ButtonRegisterComponent } from './Components/button-register/button-register.component';
import { HttpHeaders } from '@angular/common/http';
import { DataService } from './Services/data.service';
import { ApolloLink, concat } from 'apollo-link';
import { Constants } from './constants';


 
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    QuestionComponent,
    ProjectComponent,
    FeedbackComponent,
    EndScreenComponent,
    ButtonRegisterComponent
    
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
  const http = httpLink.create({uri: Constants.SERVER_URL});
    
        const authMiddleware = new ApolloLink((operation, forward) => {
          let token = this.dataService.getToken();
          // add the authorization to the headers when token isn't empty
          if (token !=null || token != undefined){
          operation.setContext({
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
          });
        }

          return forward(operation);
        });
    apollo.create({
      link:concat(authMiddleware, http),
      cache: new InMemoryCache()
    });
  }
}
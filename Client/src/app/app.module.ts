import { BrowserModule } from '@angular/platform-browser';
import { NgModule, FactoryProvider, Renderer2 } from '@angular/core';
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


import { ChartsModule } from 'ng2-charts';

import { Constants } from './constants';
import { QuestionService } from './Components/question/question.service';
import { QuestionStrategy } from './QuestionStrategy/QuestionStrategy';
import { likeDislikeStrategy } from './QuestionStrategy/likeDislikeStrategy';
import { favoriteStrategy } from './QuestionStrategy/favoriteStrategy';
import { likeStrategy } from './QuestionStrategy/likeStrategy';
import { choiceStrategy } from './QuestionStrategy/choiceStrategy';
import { regulatorStrategy } from './QuestionStrategy/regulatorStrategy';
import { rankingStrategy } from './QuestionStrategy/rankingStrategy';

export function questionServiceFactory(renderer: Renderer2, dataService: DataService, apollo:Apollo, ...types: Array<QuestionStrategy>): QuestionService {
  return new QuestionService(renderer, dataService, apollo, types);
}

const STRATEGY_PROVIDER: FactoryProvider = {
  provide: QuestionService,
  useFactory: questionServiceFactory,
  deps: [
      likeStrategy,
      favoriteStrategy,
      choiceStrategy,
      likeDislikeStrategy,
      regulatorStrategy,
      rankingStrategy,
      likeStrategy,
      favoriteStrategy,
      choiceStrategy,
      likeDislikeStrategy,
      regulatorStrategy,
      rankingStrategy
  ]
};
 
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
     CONST_ROUTING,
     ChartsModule,
  ],
  providers: [
    DataService, 
    likeDislikeStrategy,
    favoriteStrategy,
    choiceStrategy, 
    likeStrategy,
    regulatorStrategy,
    rankingStrategy,
    STRATEGY_PROVIDER],
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
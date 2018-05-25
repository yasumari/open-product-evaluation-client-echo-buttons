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

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    QuestionComponent,
    MenuComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
     CONST_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
    apollo: Apollo,
    httpLink: HttpLink    
    ){
     apollo.create({
     link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
         cache: new InMemoryCache()
     })
    }
}

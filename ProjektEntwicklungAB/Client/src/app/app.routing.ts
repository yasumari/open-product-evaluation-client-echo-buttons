import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { QuestionComponent } from "./question/question.component";
import { ListComponent } from "./list/list.component";
import { ProjectComponent } from "./project/project.component";
const MAINMENU_ROUTES: Routes = [
    //full : makes sure the path is absolute 
    { path: '', component: ProjectComponent, pathMatch: 'full'},
    { path: 'question', component: QuestionComponent, pathMatch: 'full' },
     { path: 'list', component: ListComponent, pathMatch: 'full' },
     { path: 'project', component: ProjectComponent, pathMatch: 'full' },
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);

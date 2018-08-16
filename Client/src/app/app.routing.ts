import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { QuestionComponent } from "./Components/question/question.component";
import { ListComponent } from "./Components/list/list.component";
import { ProjectComponent } from "./Components/project/project.component";
import { FeedbackComponent } from "./Components/feedback/feedback.component";
import { EndScreenComponent } from "./Components/end-screen/end-screen.component";
import { ButtonRegisterComponent} from './Components/button-register/button-register.component';

const MAINMENU_ROUTES: Routes = [
    //full : makes sure the path is absolute 
    { path: '', component: ListComponent, pathMatch: 'full'},
    { path: 'question', component: QuestionComponent, pathMatch: 'full' },
    { path: 'project', component: ProjectComponent, pathMatch: 'full' },
    { path: 'feedback', component: FeedbackComponent, pathMatch: 'full' },
    { path: 'end', component: EndScreenComponent, pathMatch: 'full' },
    { path: 'button', component:ButtonRegisterComponent, pathMatch: 'full' },
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);

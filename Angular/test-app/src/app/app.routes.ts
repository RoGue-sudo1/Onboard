import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ChildComponent } from './child/child.component';

export const routes: Routes = [
    {
        path:'user',
        title:'User page',
        component: UserComponent,
    },
    {
        path:'child',
        title:'Child page',
        component:ChildComponent
    }
];

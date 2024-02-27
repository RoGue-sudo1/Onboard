import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CrisisComponent } from './crisis/crisis.component';
import { HeroesComponent } from './heroes/heroes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
    children: [
      {
        path: 'crisis',
        component: CrisisComponent,
      },
      {
        path: 'heroes',
        component: HeroesComponent,
      },
      
    ],
  },

  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

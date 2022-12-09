import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './core/logout/logout.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { CanActivateTeam } from './core/routeGuards.js/routeGuards';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateTeam]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [CanActivateTeam]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [CanActivateTeam]
  },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [CanActivateTeam]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FaqComponent } from './faq/faq.component';
import { MoviesComponent } from '../movies/movies.component';
import { LogoutComponent } from './logout/logout.component';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { CanActivateTeam } from './routeGuards.js/routeGuards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'add-movie',
    component: AddMovieComponent,
    canActivate: [CanActivateTeam]
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    PageNotFoundComponent,
    FaqComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RouterModule
  ]
})
export class CoreModule { }

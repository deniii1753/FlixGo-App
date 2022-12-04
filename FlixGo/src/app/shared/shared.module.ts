import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardItemComponent } from './home-card-item/home-card-item.component';
import { MoviesCardItemComponent } from './movies-card-item/movies-card-item.component';


@NgModule({
  declarations: [
    HomeCardItemComponent,
    MoviesCardItemComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeCardItemComponent,
    MoviesCardItemComponent,
  ]
})
export class SharedModule { }

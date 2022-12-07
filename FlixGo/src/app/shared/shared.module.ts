import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardItemComponent } from './home-card-item/home-card-item.component';
import { MoviesCardItemComponent } from './movies-card-item/movies-card-item.component';
import { RouterModule } from '@angular/router';
import { CalcTimePipe } from './pipes/calc-passed-time.pipe';

@NgModule({
  declarations: [
    HomeCardItemComponent,
    MoviesCardItemComponent,
    CalcTimePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeCardItemComponent,
    MoviesCardItemComponent,
    CalcTimePipe
  ]
})
export class SharedModule { }

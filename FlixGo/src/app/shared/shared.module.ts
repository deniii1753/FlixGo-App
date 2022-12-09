import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeCardItemComponent } from './home-card-item/home-card-item.component';
import { MoviesCardItemComponent } from './movies-card-item/movies-card-item.component';

import { CalcTimePipe } from './pipes/calc-passed-time.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { ConvertTimePipe } from './pipes/convertTime.pipe';

@NgModule({
  declarations: [
    HomeCardItemComponent,
    MoviesCardItemComponent,
    CalcTimePipe,
    SafePipe,
    ConvertTimePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeCardItemComponent,
    MoviesCardItemComponent,
    CalcTimePipe,
    SafePipe,
    ConvertTimePipe
  ]
})
export class SharedModule { }

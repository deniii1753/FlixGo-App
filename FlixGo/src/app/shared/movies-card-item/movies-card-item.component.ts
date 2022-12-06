import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from '../interfaces/imovie';

@Component({
  selector: 'app-movies-card-item',
  templateUrl: './movies-card-item.component.html',
  styleUrls: [
    '../card.css',
    './movies-card-item.component.css'
  ]
})
export class MoviesCardItemComponent implements OnInit {

  @Input() movie!: IMovie;

  constructor() { }

  ngOnInit(): void {
  }

}

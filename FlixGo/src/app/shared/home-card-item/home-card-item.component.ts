import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';

@Component({
  selector: 'app-home-card-item',
  templateUrl: './home-card-item.component.html',
  styleUrls: [
    '../card.css',
    './home-card-item.component.css'
  ]
})
export class HomeCardItemComponent implements OnInit {
  @Input() movie: IMovie | null = null;

  constructor() { }

  ngOnInit(): void {
    
  }

}

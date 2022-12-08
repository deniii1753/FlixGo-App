import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie } from '../shared/interfaces/IMovie';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public movies: IMovie[] | [] = [];

  constructor(
    private movieService: MovieService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.movieService.getMovies(4, 0, '_creationDate', 'desc')
      .subscribe({
        next: (data) => this.movies = data.movies,
        error: () => this.router.navigate(['404'])
      })
  }

}

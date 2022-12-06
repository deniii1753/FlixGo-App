import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie } from '../shared/interfaces/imovie';
import { MovieService } from '../shared/services/movie.service';

const MOVIES_PER_REQUEST = 1;
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public movies: { count: Number, movies: IMovie[] } | undefined;

  constructor(
    public movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.movieService.getMovies(MOVIES_PER_REQUEST, 0)
      .subscribe({
        next: (data) => {
          this.movies = data;
        },
        error: () => {
          this.router.navigate(['404']);
        }
      })
  }

  moreClickHandler() {   
    this.movieService.getMovies(MOVIES_PER_REQUEST, this.movies?.movies.length || 0)
      .subscribe({
        next: (data) => {    
          this.movies = {count: data.count, movies: (this.movies?.movies.concat(data.movies) as IMovie[])};
        },
        error: () => {
          this.router.navigate(['404']);
        }
      })
  }

}

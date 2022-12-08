import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap, of, zip } from 'rxjs';

import { IGenre } from '../shared/interfaces/IGenre';
import { IMovie } from '../shared/interfaces/IMovie';
import { GenreService } from '../shared/services/genre.service';
import { MovieService } from '../shared/services/movie.service';

const MOVIES_PER_REQUEST = 2;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public movies: { count: Number, movies: IMovie[] } | undefined;
  public genres!: IGenre[];
  public selectedGenre: string | null = null;
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public movieService: MovieService,
    public genreService: GenreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      genre: [this.route.snapshot.queryParams['genre'] || '']
    });

    // const package$ = zip(this.movieService.getMovies(), this.genreService.getGenres())

    // package$.subscribe({
    //   next: ([movies, genres]) => {
    //     this.movies = movies;
    //     this.genres = genres.genres;
    //   },
    //   error: () => this.router.navigate(['404'])
    // });

    this.route.queryParams.pipe(
      mergeMap(x => {
        const selectedGenre = x['genre'] || null;
        this.selectedGenre = selectedGenre;

        if(this.genres?.length) return of({count: null, genres: []});
        return this.genreService.getGenres();
      }),
      mergeMap(genres => {
        if(!this.genres?.length) this.genres = genres.genres;
        const genre = this.genres.find((x: IGenre) => x.value === this.selectedGenre) as IGenre | undefined; 
        
        if(!genre) return this.movieService.getMovies(MOVIES_PER_REQUEST, 0);
        return this.movieService.getMovies(MOVIES_PER_REQUEST, 0, 'genres', genre?._id);
      })
    ).subscribe({
      next: (movies) => this.movies = movies,
      error: () => this.router.navigate(['404'])
    })

    // this.route.queryParams.subscribe((x: Params) => {
    //   const selectedGenre = x['genre'];
    //   this.selectedGenre = selectedGenre;

    //   if(!selectedGenre) return;

    // })
  }

  moreClickHandler() {
    // check if selected genre is defined and if it is make request for movies with specific genres.
    const genre = this.genres.find(x => x.value === this.selectedGenre) || null;
    if (genre) {
      this.movieService.getMovies(MOVIES_PER_REQUEST, this.movies?.movies.length, 'genres', genre?._id)
      .subscribe({
        next: (data) => {
          this.movies = { count: data.count, movies: (this.movies?.movies.concat(data.movies) as IMovie[]) };
        },
        error: () => {
          this.router.navigate(['404']);
        }
      })
    } else {
      this.movieService.getMovies(MOVIES_PER_REQUEST, this.movies?.movies.length)
        .subscribe({
          next: (data) => {
            this.movies = { count: data.count, movies: (this.movies?.movies.concat(data.movies) as IMovie[]) };
          },
          error: () => {
            this.router.navigate(['404']);
          }
        })
    }
  }

  filterHandler(form: FormGroup) {
    this.router.navigate(
      ['/movies'],
      {
        queryParams:
          { genre: form.value.genre }
      }
    )
  }

  filterClearHandler() {
    this.form.setValue({genre: ''});
    this.router.navigate(['/movies']);
  }

}

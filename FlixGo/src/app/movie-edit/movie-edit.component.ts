import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { zip, tap } from 'rxjs';

import { IGenre } from '../shared/interfaces/IGenre';
import { AuthService } from '../shared/services/auth.service';
import { GenreService } from '../shared/services/genre.service';
import { MovieService } from '../shared/services/movie.service';
import { isLink } from '../shared/validators/isLink';
import { isNumber } from '../shared/validators/isNumber';
import { isYoutubeLink } from '../shared/validators/isYoutubeLink';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['../shared/movie-add-edit.css']
})
export class MovieEditComponent implements OnInit {
  public form!: FormGroup;
  public fetchErrorMessage: string | null = null;
  public genres!: IGenre[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private genreService: GenreService,
    private movieService: MovieService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      genres: [[], [Validators.required]],
      time: ['', [Validators.required, isNumber()]],
      releaseYear: ['', [Validators.required, isNumber()]],
      imgUrl: ['', [Validators.required, isLink()]],
      trailer: ['', [Validators.required, isYoutubeLink()]],
      description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]]
    });

    const package$ = zip([
      this.movieService.getMovie(this.route.snapshot.params['id']),
      this.genreService.getGenres()
    ]);

    package$.pipe(
      tap(([movie]): void => {
        if(movie.postCreator !== this.authService.user?._id) {
          this.router.navigate(['home']);
          return;
        }
      })
    )
    .subscribe({
      next: (([movie, genres]) => {
        this.form.setValue({
          title: movie.title,
          genres: movie.genres.map(x => x.value),
          time: movie.time,
          releaseYear: movie.releaseYear,
          imgUrl: movie.imgUrl,
          trailer: movie.trailer,
          description: movie.description
        })
        this.genres = genres.genres;
      }),
      error: () => this.router.navigate(['404'])
    })
  }

  submitHandler(form: FormGroup) {
    const formData = form.value;
    formData.genres = this.genres.filter(x => formData.genres.includes(x.value));

    this.movieService.editMovie(this.route.snapshot.params['id'], formData)
      .subscribe({
        next: (data) => this.router.navigate([`/movies/${data._id}`]),
        error: (err) => this.fetchErrorMessage = err.message
      })
  }
}

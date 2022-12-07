import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IGenre } from '../shared/interfaces/IGenre';
import { AuthService } from '../shared/services/auth.service';
import { GenreService } from '../shared/services/genre.service';
import { MovieService } from '../shared/services/movie.service';
import { isLink } from '../shared/validators/isLink';
import { isNumber } from '../shared/validators/isNumber';
import { isYoutubeLink } from '../shared/validators/isYoutubeLink';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  public form!: FormGroup;
  public fetchErrorMessage: string | null = null;
  public genres!: IGenre[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private genreService: GenreService,
    private movieService: MovieService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.genreService.getGenres()
      .subscribe({
        next: (data) => {
          this.genres = data.genres;
        },
        error: (err) => {
          console.error(err);
        }
      });

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      genres: [[], [Validators.required]],
      time: ['', [Validators.required, isNumber()]],
      releaseYear: ['', [Validators.required, isNumber()]],
      imgUrl: ['', [Validators.required, isLink()]],
      trailer: ['', [Validators.required, isYoutubeLink()]],
      description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]]
    });
  }

  submitHandler(form: FormGroup) {
    const formData = form.value;
    formData.genres = this.genres.filter(x => formData.genres.includes(x.value));
    formData.postCreator = this.authService.user?._id;
    
    this.movieService.postMovie(formData)
      .subscribe({
        next: (data) => this.router.navigate([`/movies/${data._id}`]),
        error: (err) => this.fetchErrorMessage = err.message
      })
        
  }
}

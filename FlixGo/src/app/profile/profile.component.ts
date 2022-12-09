import { Component, OnInit } from '@angular/core';
import { IMovie } from '../shared/interfaces/IMovie';
import { MovieService } from '../shared/services/movie.service';
import { MOVIES_PER_REQUEST } from '../shared/constants';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../shared/interfaces/IUser';
import { zip } from 'rxjs';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    '../shared/card.css',
    './profile.component.css'
  ]
})

export class ProfileComponent implements OnInit {
  public movies!: {count: number, movies: IMovie[]};
  public user: IUser | null = null;

  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const package$ = zip([
      this.movieService.getMovies(MOVIES_PER_REQUEST, 0, 'postCreator', this.authService.user?._id), 
      this.userService.getUserInfo(this.authService.user?._id || '', this.authService.user?.['X-Auth-Token'] || '')
    ])

    package$.subscribe({
      next: ([movies, user]) => {
        this.movies = movies;
        this.user = user;      
                
      },
      error: () => this.router.navigate(['404'])
    })
  }

  moreClickHandler() {
    this.movieService.getMovies(MOVIES_PER_REQUEST, this.movies?.movies.length, 'postCreator', this.authService.user?._id)
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

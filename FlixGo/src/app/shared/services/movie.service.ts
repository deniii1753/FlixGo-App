import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMovie } from '../interfaces/IMovie';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getMovies(limit: Number, skip: Number) {
    return this.http.get<{ count: Number, movies: IMovie[] }>(`/api/movies?limit=${limit}&skip=${skip}`);
  }

  postMovie(data: IMovie) {
    const headers = new HttpHeaders({
      'X-Auth-Token': this.authService.user?.['X-Auth-Token'] || 'KYS ANGULAR THE WORST FUCKIGN SHIT'
    });
    return this.http.post<IMovie>('/api/movies', data, {headers: headers})
  }

  getMovie(movieId: string) {
    return this.http.get<IMovie>(`/api/movies/${movieId}?genres=true`);
  }
}

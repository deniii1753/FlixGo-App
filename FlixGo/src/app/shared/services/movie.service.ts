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

  getMovies(limit?: number, skip?: number, sortField?: string, order?: string) {
    let url = '/api/movies';
    if (limit || skip || sortField || order) url += '?';

    if (limit) url += `limit=${limit}&`;
    if (skip) url += `skip=${skip}&`;
    if (sortField) url += `sort=${sortField}&`;
    if (order) url += `order=${order}&`;

    if (url.endsWith('&')) url = url.slice(0, url.length - 1);

    return this.http.get<{ count: number, movies: IMovie[] }>(url);
  }

  postMovie(data: IMovie) {
    const headers = new HttpHeaders({
      'X-Auth-Token': this.authService.user?.['X-Auth-Token'] || ''
    });
    return this.http.post<IMovie>('/api/movies', data, { headers: headers })
  }

  getMovie(movieId: string) {
    return this.http.get<IMovie>(`/api/movies/${movieId}?genres=true`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../interfaces/imovie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(limit: Number, skip: Number) {
    return this.http.get<{count: Number, movies: IMovie[]}>(`/api/movies?limit=${limit}&skip=${skip}`);
  }
}

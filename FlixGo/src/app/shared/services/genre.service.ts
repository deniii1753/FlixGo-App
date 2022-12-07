import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenres() {
    return this.http.get<{count: Number, genres: []}>('/api/genres');
  }
}

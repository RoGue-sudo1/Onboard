import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  getMovies(){
    return this.http.get('/movies')
  }

  constructor(private http :HttpClient) { }
}

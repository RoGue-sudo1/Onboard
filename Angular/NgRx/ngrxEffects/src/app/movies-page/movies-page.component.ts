import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent {

  movies: any[] =[]
 ngOnInit() { 
  this.moviesService.getMovies().subscribe(movies => {
    console.log(movies);
  })
 }

 constructor(private moviesService: MoviesService) { }
}

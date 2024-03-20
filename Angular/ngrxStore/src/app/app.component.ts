import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BooksCollectionComponent } from './books-collection/books-collection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BookListComponent,BooksCollectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NgRx Store Example';

  book$ = 
  
}

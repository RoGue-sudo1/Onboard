import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BooksCollectionComponent } from './books-collection/books-collection.component';
import { GoogleBooksService } from './books.service';
import { Store } from '@ngrx/store';
import {
  selectBookCollection,
  selectBooks,
} from './ngrx/selector/books.selector';
import { BooksActions, BooksApiActions } from './ngrx/actions/books.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookListComponent, BooksCollectionComponent,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'NgRx Store Example';

  books$ = this.store.select(selectBooks);
  booksCollection$ = this.store.select(selectBookCollection);

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }

  constructor(private booksService: GoogleBooksService, private store: Store) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((books) => {
      this.store.dispatch(BooksApiActions.retrievedBookList({ books }));
     
    });

   
    

    
  }
}

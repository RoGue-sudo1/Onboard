import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAllBooks} from '../ngrxEntity/books.selector';
import { BooksState } from '../ngrxEntity/books.adapter';
import { Books } from '../books';
import { addBook, deleteBook, updateBook } from '../ngrxEntity/books.actions';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  
  books$ = this.store.select(selectAllBooks)

  constructor(private store: Store<BooksState>) { }


  addBook(book: Books){
    this.store.dispatch(addBook({book}))
  }

  updateBook(book:Books){
    this.store.dispatch(updateBook({book}))
  }

  removeBook(bookId:number){
    this.store.dispatch(deleteBook({bookId}))
  }
}

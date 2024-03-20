import { createReducer, on } from '@ngrx/store';
import { Book } from '../../book';
import { BooksApiActions } from '../actions/books.actions';

export const intialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  intialState,
  on(BooksApiActions.retrievedBookList, (_state, { books }) => books)
);

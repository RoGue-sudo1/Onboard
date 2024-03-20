import { createReducer, on } from '@ngrx/store';
import { BooksActions } from '../actions/books.actions';

export const intialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  intialState,
  on(BooksActions.addBook, (state, { bookId }) => {
    if (state.indexOf(bookId) > -1) {
      return state;
    }

    return [...state, bookId];
  }),

  on(BooksActions.removeBook, (state, { bookId }) => {
    return state.filter((id) => id !== bookId);
  })
);

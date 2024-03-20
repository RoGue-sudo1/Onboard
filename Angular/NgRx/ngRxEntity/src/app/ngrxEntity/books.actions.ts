import { createAction, props } from '@ngrx/store';
import { Books } from '../books';

export const addBook = createAction(
  '[Books] Add Book',
  props<{ book: Books }>()
);
export const updateBook = createAction(
  '[Books] Update Book',
  props<{ book: Books }>()
);
export const deleteBook = createAction(
  '[Books] Delete Book',
  props<{ bookId: number }>()
);

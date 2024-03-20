import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromBooks from './books.reducer';
import * as fromCollection from './collection.reducer';
import { Book } from '../../book';

export interface AppState {
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<string>;
}

export const reducers: ActionReducerMap<AppState> = {
  books: fromBooks.booksReducer,
  collection: fromCollection.collectionReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

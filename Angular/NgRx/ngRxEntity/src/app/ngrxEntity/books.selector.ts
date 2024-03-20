import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BooksState, bookAdapter } from "./books.adapter";

export const selectBookState = createFeatureSelector<BooksState>('books');

export const selectAllBooks = createSelector(
    selectBookState,
    bookAdapter.getSelectors().selectAll
)

export const selectBookById = createSelector(
    selectBookState,
    (state:BooksState, bookId:number) => state.entities[bookId]
)
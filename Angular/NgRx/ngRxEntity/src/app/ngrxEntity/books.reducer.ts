
import { createReducer, on } from '@ngrx/store';
import * as BooksActions from './books.actions'
import { bookAdapter } from './books.adapter';
import { intialState } from './books.state';

export const bookReducer = createReducer(
    intialState,
    on(BooksActions.addBook, (state, action) => {
        return bookAdapter.addOne(action.book, state)
    }),

    on(BooksActions.updateBook, (state,{book})=>{
        return bookAdapter.updateOne({id: book.id, changes: book}, state)
    }),

    on(BooksActions.deleteBook,(state,{bookId})=>{
        return bookAdapter.removeOne(bookId, state)
    })
)
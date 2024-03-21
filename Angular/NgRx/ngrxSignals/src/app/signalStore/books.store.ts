import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Book } from '../book';
import { computed, inject } from '@angular/core';
import { BooksService } from '../books.service';

type BooksState = {
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'dsc' };
};

const intialState: BooksState = {
  books: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withState(intialState),

  withComputed(({ books, filter }) => ({
    booksCount: computed(() => books().length),
    sortedBooks: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return books().sort((a: Book, b: Book) => {
        return direction * a.volumeInfo.title.localeCompare(b.volumeInfo.title);
      });
    }),
  })),

  withMethods((store, booksService = inject(BooksService)) => ({
    updateQuery(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },

    updateOrder(order: 'asc' | 'dsc'): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },

    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });

      const books = await booksService.getAll().toPromise();
      patchState(store, { books, isLoading: false });
    },
  }))
);

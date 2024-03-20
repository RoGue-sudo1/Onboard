import { Books } from "../books";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface BooksState extends EntityState<Books> {}

export const bookAdapter: EntityAdapter<Books> = createEntityAdapter<Books>({
    selectId: (book: Books) => book.id,
    sortComparer: false
})


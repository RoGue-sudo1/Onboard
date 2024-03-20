import { ajax } from 'rxjs/ajax';
import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class GoogleBooksService {
 

  getBooks(): Observable<Book[]> {
    return ajax.getJSON<{ items: Book[] }>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
      )
      .pipe(map((books) => books.items || []));
  }
}

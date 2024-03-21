import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book } from './book';
import {ajax} from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

 
  getAll() {
    return ajax.getJSON<{ items: Book[] }>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
      )
      .pipe(map((books) => books.items || []));
  }

  constructor() { }
}

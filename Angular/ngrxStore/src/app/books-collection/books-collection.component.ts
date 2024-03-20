import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-books-collection',
  standalone: true,
  imports: [],
  templateUrl: './books-collection.component.html',
  styleUrl: './books-collection.component.css'
})
export class BooksCollectionComponent {
@Input() books: ReadonlyArray<Book>  =[]

@Output() remove = new EventEmitter<string>()
}

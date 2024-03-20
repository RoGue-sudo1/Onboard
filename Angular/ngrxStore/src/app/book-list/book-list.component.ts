import { Book } from './../book';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  @Input() books: ReadonlyArray<Book> | null = [];

  @Output() add = new EventEmitter<string>();
}

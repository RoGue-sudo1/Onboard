import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { BooksStore } from '../signalStore/books.store';
import { JsonPipe } from '@angular/common';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [JsonPipe],
  providers: [BooksStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  readonly store = inject(BooksStore);

  constructor() {
    effect(() => {
      const state = getState(this.store);
      console.log('Books state changed',state);
    });
  }
}

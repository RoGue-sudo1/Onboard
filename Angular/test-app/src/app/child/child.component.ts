import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  @Output() incrementCountEvent = new EventEmitter<number>();
  @Output() addItemEvent = new EventEmitter<string>();

  item = '';
  count = 0;
  onClick() {
    this.count++;
    this.incrementCountEvent.emit(this.count);
  }

  addItem() {
    this.item=this.item + '🪜'
    this.addItemEvent.emit(this.item);
  }
}

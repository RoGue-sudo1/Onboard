import { Component } from '@angular/core';
import { RouterOutlet ,RouterLink} from '@angular/router';
import { UserComponent } from './user/user.component';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, UserComponent, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-app';
  isView = true;
  users = [
    { id: 0, name: 'Sarah' },
    { id: 1, name: 'Amy' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Jessica' },
    { id: 4, name: 'Poornima' },
  ];

  isEditable = true;

  message = '';

  greet() {
    window.alert('Hello, there');
  }

  onMouseOver() {
    this.message = 'way to go';
  }
  count = 0;
  item = '';
  incrementCount($event: number) {
    this.count = $event;
  }

  addItem($event: string) {
    this.item = $event;
  }
}

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { MessageComponent } from './message/message.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,HeroesComponent,MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tour Of Heroes';
}

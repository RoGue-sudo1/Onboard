import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OperatorsComponent } from './creation-operators/operators.component';
import { ConditionalOperatorsComponent } from './conditional-operators/conditional-operators.component';
import { TransformationOperatorsComponent } from './transformation-operators/transformation-operators.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    OperatorsComponent,
    ConditionalOperatorsComponent,
    TransformationOperatorsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Rxjs';
}

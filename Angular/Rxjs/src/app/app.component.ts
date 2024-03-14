import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OperatorsComponent } from './creation-operators/operators.component';
import { ConditionalOperatorsComponent } from './conditional-operators/conditional-operators.component';
import { TransformationOperatorsComponent } from './transformation-operators/transformation-operators.component';
import { CombinationalOperatorsComponent } from './combinational-operators/combinational-operators.component';
import { ErrorOperatorsComponent } from './error-operators/error-operators.component';
import { MulticastingOperatorsComponent } from './multicasting-operators/multicasting-operators.component';
import { FilteringOperatorsComponent } from './filtering-operators/filtering-operators.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    OperatorsComponent,
    ConditionalOperatorsComponent,
    TransformationOperatorsComponent,
    CombinationalOperatorsComponent,
    ErrorOperatorsComponent,
    MulticastingOperatorsComponent,
    FilteringOperatorsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Rxjs';
}

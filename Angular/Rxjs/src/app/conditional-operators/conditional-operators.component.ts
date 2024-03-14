import { Component } from '@angular/core';
import { every, iif, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-conditional-operators',
  standalone: true,
  imports: [],
  templateUrl: './conditional-operators.component.html',
  styleUrl: './conditional-operators.component.css',
})
export class ConditionalOperatorsComponent {
  constructor() {

    console.log('Conditional Operators');
    // 1. every()

    const everySource = of(1, 2, 3, 4, 5, 6);

    const everyExample = everySource.pipe(every((val) => val % 2 === 0));

    const everySubscribe = everyExample.subscribe(console.log);

    // 2. iif() (iif(condition: () => boolean, trueResult: Observable, falseResult: Observable): Observable

    const iifSource = of(1, 2, 3, 4, 5,6);
    const iifExample = iifSource.pipe(mergeMap((v) =>
      iif(() => v % 2 === 0, of('Even'), of('Odd'))
    ));

    const iifSubscribe = iifExample.subscribe(console.log);
  }
}

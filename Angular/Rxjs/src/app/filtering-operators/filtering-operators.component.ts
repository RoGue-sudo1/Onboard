import { Component, OnInit } from '@angular/core';
import {
  debounce,
  distinct,
  distinctUntilChanged,
  from,
  interval,
  of,
  skip,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-filtering-operators',
  standalone: true,
  imports: [],
  templateUrl: './filtering-operators.component.html',
  styleUrl: './filtering-operators.component.css',
})
export class FilteringOperatorsComponent implements OnInit {
  ngOnInit(): void {
    console.log('Filtering Operators');

    // 1. debounce() (Discard emitted values that take less than the specified time between output.)

    const debounceSource = of('WAIT', 'ONE', 'SECOND', 'Last will display');

    const debounceExample = debounceSource.pipe(debounce(() => timer(1000)));

    const debounceSubscribe = debounceExample.subscribe(console.log);

    const debounceSource2 = interval(1000);

    const debounceExample2 = debounceSource2.pipe(
      debounce((val) => timer(val * 200))
    );

    const debounceSubscribe2 = debounceExample2.subscribe(console.log);

    // 2. debounceTime() (Discard emitted values that take less than the specified time between output.)

    // 3. distinct() (Emit unique values from source.)

    const obj1 = { id: 3, name: 'name 1' };
    const obj2 = { id: 4, name: 'name 2' };
    const obj3 = { id: 3, name: 'name 3' };
    const vals = [obj1, obj2, obj3];

    from(vals)
      .pipe(distinct((val) => val.id))
      .subscribe(console.log);

    // 4. distinctUntilChanged() (Emit unique values from source.)
    const source$ = from([1, 1, 2, 2, 3, 3]);

    source$.pipe(distinctUntilChanged()).subscribe(console.log);

    const source$2 = from([
      { name: 'Brian' },
      { name: 'Joe' },
      { name: 'Joe' },
      { name: 'Sue' },
    ]);

    source$2
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return prev.name === curr.name;
        })
      )
      .subscribe(console.log);

    // 5. skip()  (Skip the first n values emitted by an observable.)

    const numArrayObs = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const skipObs = numArrayObs.pipe(skip(5)).subscribe(console.log);
  }
}

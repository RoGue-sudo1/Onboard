import { Component, OnInit } from '@angular/core';
import {
  combineAll,
  combineLatest,
  combineLatestAll,
  interval,
  map,
  take,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-combinational-operators',
  standalone: true,
  imports: [],
  templateUrl: './combinational-operators.component.html',
  styleUrl: './combinational-operators.component.css',
})
export class CombinationalOperatorsComponent implements OnInit {
  ngOnInit(): void {
    console.log('Combinational Operators');

    // 1. combineAll() (Converts a higher-order Observable into a first-order Observable by waiting for the outer Observable to complete, then applying combineLatest.)

    const combineAllSource = interval(1000).pipe(take(2));
    const combineAllExample = combineAllSource.pipe(
      map((val) =>
        interval(1000).pipe(
          map((i) => `Result ${val}): ${i}`),
          take(5)
        )
      )
    );

    const combineAllSubscribe = combineAllExample
      .pipe(combineAll())
      .subscribe(console.log);

    // 2. combineLatest() (When any observable emits a value, emit the last emitted value from each.)

    const timerOne = timer(1000, 4000);
    const timerTwo = timer(2000, 4000);
    const timerThree = timer(3000, 4000);

    const combineLatestSubscribe = combineLatest(timerOne, timerTwo, timerThree).subscribe(
      ([timerValOne, timerValTwo, timerValThree]) => {
        console.log(
          `Timer One Latest: ${timerValOne},
             Timer Two Latest: ${timerValTwo},
             Timer Three Latest: ${timerValThree}`
        );

        
      }
    );

    setTimeout(() => {
      combineLatestSubscribe.unsubscribe();
    },20000)
  }
}

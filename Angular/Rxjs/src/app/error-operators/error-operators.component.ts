import { Component, OnInit } from '@angular/core';
import { catchError, interval, mergeMap, of, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-error-operators',
  standalone: true,
  imports: [],
  templateUrl: './error-operators.component.html',
  styleUrl: './error-operators.component.css',
})
export class ErrorOperatorsComponent implements OnInit {
  ngOnInit(): void {
    console.log('Error Handling Operators');

    // 1. catchError() (Gracefully handle errors in an observable sequence.)
    const catchErrorSource = throwError('This is an error!');

    const catchErrorExample = catchErrorSource.pipe(
      catchError((val) => of(`I caught: ${val}`))
    );

    const catchErrorSubscribe = catchErrorExample.subscribe(console.log);

    // 2. retry() (Retry an observable sequence a specific number of times should an error occur.)

            const retrySource = interval(1000);
            const retryExample = retrySource.pipe(
              mergeMap((val) => {
                if (val > 5) {
                  throwError('This is an error!');
                }
                return of(val);
              }),

              retry(2)
            );

            const retrySubscribe = retryExample.subscribe({
              next: (val) => console.log(val),
              error: (err) => console.log(`${err}: Retried 2 times then quit!`),
            });


   
  }
}

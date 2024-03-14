import { Component, OnInit } from '@angular/core';
import {
  EMPTY,
  Observable,
  defer,
  from,
  fromEvent,
  generate,
  interval,
  merge,
  of,
  range,
  switchMap,
  throwError,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css',
})
export class OperatorsComponent implements OnInit {
  ngOnInit() {
    console.log('Creation Operators');
    // Creation Operators
    /* 1. ajax (Create an observable for an Ajax request with 
                either a request object with url, headers, 
                etc or a string for a URL.)*/

    const githubUsers = `https://api.github.com/users?per_page=2`;
    const users = ajax(githubUsers);

    const subscribe = users.subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

    /* a. ajax.getJSON() [Observable that emits only the json key of
                                 the response object that is being returned 
                                 from the request.]*/

    const users2 = ajax.getJSON(githubUsers);

    const subsribe2 = users.subscribe(
      (res) => console.log('ajax.getJSON', res),
      (err) => console.log(err)
    );

    // If we wanted in any case a body or header
    const users3 = ajax({
      url: githubUsers,
      method: 'GET',
      headers: {
        /*some headers*/
      },
      body: {
        /*in case you need a body*/
      },
    });

    // 2. Create

    const hello = Observable.create(function (observer: any) {
      observer.next('Hello');
      observer.next('World');
      observer.complete();
    });

    const subscribe3 = hello.subscribe((val: any) =>
      console.log('create', val)
    );

    // 3. defer for creating an observable that is not created until the observer subscribes ( dates also )

    const s1 = of(new Date());
    const s2 = defer(() => of(new Date()));

    console.log(new Date());

    timer(2000)
      .pipe(switchMap((_) => merge(s1, s2)))
      .subscribe(console.log);

    /*
             OUTPUT => 
             2019-02-10T12:38:30.000Z (currrent date/time from first console log)
             2019-02-10T12:38:30.000Z (date/time in s1 console log, captured date/time at the moment of observable creation)
             2019-02-10T12:38:32.000Z (date/time in s2 console log, captured date/time at the moment of subscription)
          */

    // 3. EMPTY (observable that completes immediately)

    const emptySubscribe = EMPTY.subscribe({
      next: () => console.log('Next'),
      complete: () => console.log('Complete'),
    });

    //output: 'Complete!'

    // 4. from (convert an array, promise, or iterable to an observable)

    const arraySource = from([1, 2, 3, 4, 5]);
    const fromSubscribe = arraySource.subscribe((val) =>
      console.log('from', val)
    );

    //output: 1,2,3,4,5

    const promiseSource = from(new Promise((res) => res('Hello World!')));
    const subscribe4 = promiseSource.subscribe((val) =>
      console.log('from', val)
    );

    // output : Hello World!

    const map = new Map();

    map.set(1, 'Hi');
    map.set(2, 'rxjs');

    const mapSource = from(map);
    const mapSubscribe = mapSource.subscribe((val) => console.log('from', val));

    // 5. fromEvent (turn a event to observables)

    const source = fromEvent(document, 'click');
    const fromEventSubscribe = source
      .pipe(switchMap((_) => timer(1000)))
      .subscribe((val) => console.log('fromEvent', val));

    // document.addEventListener('click',()=>console.log('Clicked!'))

    // 6. generate() [generate an observable sequence by running a state-driven loop producing]

    const generateSource = generate(
      2,
      (x) => x <= 38,
      (x) => x + 2,
      (x) => '*'.repeat(x)
    );

    const generateSubscribe = generateSource.subscribe((val) =>
      console.log('generate', val)
    );

    // 7. interval (Emit numbers in sequence based on provided timeframe.)

    const intervalSource = interval(1000);

    const intervalSubscribe = intervalSource.subscribe((val) =>
      console.log('interval', val)
    );

    setTimeout(() => {
      intervalSubscribe.unsubscribe();
    }, 10000);

    // 8. of() (Emit variable amount of values in a sequence and then emits a complete notification.)

    const ofSource = of({ name: 'Brian' }, [1, 2, 3], function hello() {
      return 'Hello';
    });

    const ofSubscribe = ofSource.subscribe((val) => console.log('of', val));

    //output: {name: 'Brian'}, [1,2,3], function hello() { return 'Hello' }

    /* 
    **** 
    So when to use of() and when to use from():-
    Use of when:
         - You have a fixed set of values you want to emit in a specific order.
         - You want to create an observable that completes immediately after emitting all the values.
         - You need to initialize an observable with default values.

    Use from when:

            - You need to convert various data types (arrays, promises, iterables, event objects)
              into observables for uniform handling within your RxJS streams.

            - You want to create observables from asynchronous operations like promises or events.
     */

    // 7. range() (Emit a sequence of numbers within a specified range.)

    const rangeSource = range(1, 10);
    const rangeSubscribe = rangeSource.subscribe((val) =>
      console.log('range', val)
    );

    // 8. throw() (Create an observable that immediately emits an error)

    const throwSource = throwError('Oops there is a error');

    const throwSubscribe = throwSource.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Complete!'),
      error: (err) => console.log('Error occurred:', err),
    });

    // 9. timer(initialDelay,scheduler)

    //emit 0 after 1 second then complete, since no second argument is supplied
    const timerSource = timer(1000);
    //output: 0
    const timerSubscribe = timerSource.subscribe((val) =>
      console.log('timer', val)
    );

    /*
                 timer takes a second argument, how often to emit subsequent values
                 in this case we will emit first value after 1 second and subsequent
                 values every 2 seconds after
              */
    const timerSource2 = timer(1000, 2000);
    //output: 0,1,2,3,4,5......
    const timerSubscribe2 = timerSource2.subscribe((val) => console.log(val));

    setTimeout(() => {
      timerSubscribe2.unsubscribe();
    }, 10000); // this will unsubscribe the timer after 10 seconds
  }
}

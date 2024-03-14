import { Component, OnInit } from '@angular/core';
import { interval, mapTo, publish, share, tap, timer } from 'rxjs';

@Component({
  selector: 'app-multicasting-operators',
  standalone: true,
  imports: [],
  templateUrl: './multicasting-operators.component.html',
  styleUrl: './multicasting-operators.component.css',
})
export class MulticastingOperatorsComponent implements OnInit {
  ngOnInit(): void {
    console.log('Multicasting Operators');

    // 1. publish() (Converts a unicast observable into a multicast observable.)

    const publishSource = interval(1000);
    const publishExample = publish()(
      publishSource.pipe(tap((_) => console.log('Hey There!')))
    );

    const publishSuubscribe = publishExample.subscribe((val) =>
      console.log(`Subscriber One: ${val}`)
    );
    const publishSuubscribe2 = publishExample.subscribe((val) =>
      console.log(`Subscriber Two: ${val}`)
    );

    setTimeout(() => {
      publishExample.connect();
    }, 5000);

    setTimeout(() => {
      publishSuubscribe.unsubscribe();
      publishSuubscribe2.unsubscribe();
    }, 10000);

    //2. share() (Share source among multiple subscribers.)

    const source = timer(1000);
    //log side effect, emit result
    const example = source.pipe(
      tap(() => console.log('***SIDE EFFECT***')),
      mapTo('***RESULT***')
    );
     /*
      * NOT SHARED, will log '***SIDE EFFECT***' for each subscriber
      * SHARED, will log '***SIDE EFFECT***' once, and emit '***RESULT***' to each subscriber
      */
    const subscribe = example.subscribe((val) => console.log(val));
    const subscribeTwo = example.subscribe((val) => console.log(val));

    const sharedExample = example.pipe(share());

    const subscribeThree = sharedExample.subscribe((val) => console.log(val));
    const subscribeFour = sharedExample.subscribe((val) => console.log(val));
  }
}

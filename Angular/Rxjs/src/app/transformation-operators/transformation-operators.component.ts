import { Component } from '@angular/core';
import { buffer, concatMap, concatMapTo, delay, exhaustMap, from, fromEvent, interval, map, mapTo, of, take } from 'rxjs';

@Component({
  selector: 'app-transformation-operators',
  standalone: true,
  imports: [],
  templateUrl: './transformation-operators.component.html',
  styleUrl: './transformation-operators.component.css',
})
export class TransformationOperatorsComponent {
  constructor() {
    console.log('Transformation Operators');

    // 1. buffer() (Collects values from the past as an array, and emits that array only when another observable emits.)

              const myInterval = interval(1000);
              const bufferby = fromEvent(document, 'click');

              const bufferExample = myInterval.pipe(buffer(bufferby));

              const bufferSubscribe = bufferExample.subscribe((val) =>
                console.log('Buffer:', val)
              );

    // 2. concatMap() (Projects each source value to an Observable which is merged in the output Observable, in a serialized fashion waiting for each one to complete before merging the next.)

            const concatMapSource = of('Hello', 'Goodbye');

            const examplePromise = (val: any) =>
              new Promise((resolve) => resolve(val + ' World!'));

            const concatMapExample = concatMapSource.pipe(
              concatMap((val) => examplePromise(val))
            );

          

            const concatMpaSubscribe = concatMapExample.subscribe((val) =>
              console.log('ConcatMap:', val)
            );

    
    // 3. concatMapTo() (Projects each source value to the same Observable which is merged multiple times in the output Observable.)

            const sampleInterval = interval(2000).pipe(take(5))

            const fakeRequest =of('Network request complete').pipe(delay(3000))
            
            console.log(new Date())
            const concatMapToExample = sampleInterval.pipe(concatMapTo(fakeRequest))
             
            const concatMapToSubscribe = concatMapToExample.subscribe((val) =>
              console.log('ConcatMapTo:'+ val + '\n '+ new Date())
            );

            const interval$ = interval(1000)

            const source = interval(2000).pipe(take(5))

            /*
             ***Be Careful***: In situations like this where the source emits at a faster pace
                than the inner observable completes, memory issues can arise.
                (interval emits every 1 second, basicTimer completes every 5)
              */
            // basicTimer will complete after 5 seconds, emitting 0,1,2,3,4
            console.log(new Date())
            const example = interval$.pipe(concatMapTo(source,(firstValue,secondValue)=> `${firstValue} ${secondValue}`))

            const subscribe = example.subscribe(val=>console.log('ConcatMapTo:'+ val + ' \n'+ new Date()))

                /*
                  output: 0 0
                          0 1
                          0 2
                          0 3
                          0 4
                          1 0
                          1 1
                          continued...

                */

    // 4. exhaustMap() 
          /* Imagine you're at a coffee shop where each customer is 
            allowed to place only one order at a time and must wait 
            until that order is fully prepared before making another.
            If they try to order again while their coffee is still brewing,
            the barista simply ignores them. That's the essence of exhaustMap.*/    
            
          const firstInterval =interval(1000).pipe(take(10))
          const secondInterval = interval(1000).pipe(take(2))

          const exhaustMapExample = firstInterval.pipe(exhaustMap((val) => {
            console.log('Emmision in first interval:', val)
            return secondInterval
          }))

          const exhaustMapSubscribe = exhaustMapExample.subscribe((val) =>
            console.log('ExhaustMap:', val)
          );

            /*
                When we subscribed to the first interval, it starts to emit a values (starting 0).
                This value is mapped to the second interval which then begins to emit (starting 0).  
                While the second interval is active, values from the first interval are ignored.
                We can see this when firstInterval emits number 3,6, and so on...

                  Output:
                  Emission of first interval: 0
                  0
                  1
                  Emission of first interval: 3
                  0
                  1
                  Emission of first interval: 6
                  0
                  1
                  Emission of first interval: 9
                  0
                  1
              */
      
    // 5. map() (Apply projection with each value from source.)

          const mapSource = from([1,2,3,4,5])

          /*
             * now when we are using from operator, it will emit values/observables one by one
               so output will be like this: 11,12,13,14,15

               but when we are using of operator, i.e const mapSource = of([1,2,3,4,5])
               It will emit all the values at once, so output will be like this: 1,2,3,4,510
          */
          
          const mapExample = mapSource.pipe(map((val:any)=>val + 10))
          const mapSubscribe = mapExample.subscribe((val) =>  console.log('Map:', val))

    // 6. mapTo() (Map emissions to constant value.)
        
           const mapToSource = interval(2000).pipe(take(5))

           const mapToExample = mapToSource.pipe(mapTo('Hello World!')).subscribe((val) => console.log('MapTo:', val))
           



  }
}

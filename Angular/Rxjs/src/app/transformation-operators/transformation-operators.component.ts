import { Component } from '@angular/core';
import { buffer, fromEvent, interval } from 'rxjs';

@Component({
  selector: 'app-transformation-operators',
  standalone: true,
  imports: [],
  templateUrl: './transformation-operators.component.html',
  styleUrl: './transformation-operators.component.css'
})
export class TransformationOperatorsComponent {

  constructor(){
    console.log('Transformation Operators');

    // 1. buffer() (Collects values from the past as an array, and emits that array only when another observable emits.)
           
          const myInterval = interval(1000);
          const bufferby = fromEvent(document,'click')

          const bufferExample = myInterval.pipe(buffer(bufferby))

          const bufferSubscribe = bufferExample.subscribe(val=>console.log('Buffer:',val))
  }

}

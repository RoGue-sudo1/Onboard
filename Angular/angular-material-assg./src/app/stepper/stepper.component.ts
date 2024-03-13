import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl:['', Validators.required]
  })

  secondFormGroup = this._formBuilder.group({
    secondCtrl:['', Validators.required]
  })
  isLinear = false;
  isVertical=true
  constructor(public _formBuilder : FormBuilder){}
}

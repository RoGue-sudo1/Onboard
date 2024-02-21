import { Component} from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './form-validation.component.html',
  styleUrl: './form-validation.component.css',
})


export class FormValidationComponent {


  employeeDetailsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?) |0)?[0-9]{10}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl('', [Validators.required]),
    addressLane: new FormControl('', Validators.required),
    city:new FormControl('',Validators.required),
    state:new FormControl('',Validators.required),
    pincode: new FormControl('',Validators.required),

  });


  templateEmployeeDetailsForm = {
    name:"",
    mobileNumber:'',
    email:'',
    dateOfBirth:'',
    addressLane:'',
    city:'',
    state:'',
    pincode:'',
  }

  onSubmit(){
    alert("Reactive form data submitted succesfully")
  }
   
  templateOnSubmit(){
    alert("Template form data submitted succesfully")
  }



}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent {

  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined
  myControl = new FormControl('')
  options:string[]=['One','Two','Three','Four','Five']
  filteredOptions:string[]

  constructor(){
    this.filteredOptions = this.options.slice()
  }

  filter():void{
    if(this.input){
      const filterValue = this.input.nativeElement.value.toLowerCase()
      this.filteredOptions = this.options.filter(option=>option.toLowerCase().includes(filterValue))
    }
    
  }
}

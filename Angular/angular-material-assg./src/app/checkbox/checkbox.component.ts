import { Component } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [MatCheckboxModule,MatRadioModule,FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  checked = false;
  indeterminate = false;  
  labelPosition :'before' | 'after' = 'after';
  disabled = false;     
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormFieldComponent } from './form-field/form-field.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ButtonComponent } from './button/button.component';
import { ChipsComponent } from './chips/chips.component';
import { DialogComponent } from './dialog/dialog.component';
import { ExpnasionPanelComponent } from './expnasion-panel/expnasion-panel.component';
import { StepperComponent } from './stepper/stepper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormFieldComponent,
    CheckboxComponent,
    ButtonComponent,
    ChipsComponent,
    DialogComponent,
    StepperComponent,
    ExpnasionPanelComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular Material Assg.';
}

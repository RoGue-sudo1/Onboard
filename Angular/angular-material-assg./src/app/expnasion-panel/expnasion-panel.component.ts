import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  templateUrl: './expnasion-panel.component.html',
  styleUrl: './expnasion-panel.component.css',
})
export class ExpnasionPanelComponent {
  step=0;
  setStep(index:number){
    this.step = index;
  }

  nextStep(){
    this.step++;
  }

  prevStep(){
    this.step--;
  }
}

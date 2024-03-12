import { Component } from '@angular/core';
import {COMMA, E, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent,MatChipInputEvent,MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon'
import { ThemePalette } from '@angular/material/core';

export interface ChipColor{
  name:string,
  color:ThemePalette
}

export interface Fruit{
  name:string
}

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [MatChipsModule,MatIconModule,MatFormFieldModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css'
})
export class ChipsComponent {
  availableColors:ChipColor[] =[
     {name:'none',color:undefined},
     {name:'Primary',color:'primary'},
     {name:'Accent',color:'accent'},
     {name:'Warn',color:'warn'}    
  ]
 
  readonly separatorKeysCodes = [ENTER,COMMA] as const

  fruits:Fruit[]=[{name:'Banana'},{name:'Apple'},{name:'Kiwi'},{name:'Watermelon'},{name:'Tomato'}]


  add(event:MatChipInputEvent):void{
    const value = ((event.value) || '').trim()

    if(value){
      this.fruits.push({name:value})
    }

    event.chipInput!.clear()
  }
  remove(fruit:Fruit):void{
    const index = this.fruits.indexOf(fruit)

    if(index>=0){
      this.fruits.splice(index,1)
    }
  }

  edit(fruit:Fruit,event:MatChipEditedEvent){
    const value = event.value.trim()

    if(!value){
      this.remove(fruit)
      return
    }

    const index = this.fruits.indexOf(fruit)

    if(index>=0){
      this.fruits[index].name= value
    }
  }
}

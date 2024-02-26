import {
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { FilterPipe } from '../filter.pipe';
import { debounce, debounceTime, from, fromEvent, pipe } from 'rxjs';


@Component({
  selector: 'app-home',

  standalone: true,
  imports: [HousingLocationComponent, FormsModule, CommonModule, FilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
  city=''
  pipeFilterValue = '';
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  signalLocationList: WritableSignal<HousingLocation[]> = signal(
    this.housingLocationList
  );

  signalFilteredLocationList: WritableSignal<HousingLocation[]> = signal(
    this.housingLocationList
  );

  searchText: WritableSignal<string> = signal('');


  signalComputedLocationList: Signal<void | HousingLocation[]> = computed(
    () => {
      const text = this.searchText();
      
      if (!text) {
        return this.signalLocationList()
      } else {
        return this.signalLocationList().filter(
          (signalLocation: HousingLocation) =>
            signalLocation?.city.toLowerCase().includes(text.toLowerCase())
        );
      }
    
    }
  );

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[] = []) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
        this.signalLocationList.set(housingLocationList);
        this.signalFilteredLocationList.set(housingLocationList);
      });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  signalSearch(text: string) {
   
   if(text===''){
    this.searchText.set(text);
   }
    const searchText2 = from(text).pipe(debounceTime(1500));
    searchText2.subscribe(() => {
     this.searchText.set(text)
    });
  }

  private timerId: NodeJS.Timeout | null = null

  // signalSearch(text: string) {
  //   if (text === '') {
  //     this.searchText.set(text);
  //     return; 
  //   }
  
  //   if(this.timerId){
  //   clearTimeout(this.timerId); 
  // }

  //   this.timerId = setTimeout(() => {
  //     this.searchText.set(text);
  //   }, 500);
  // }
}


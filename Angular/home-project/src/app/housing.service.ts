import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  housingLocationList : HousingLocation[]= [];

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    const json = await data.json();
    this.housingLocationList = json;
    return this.housingLocationList ?? [];
  }
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
   const data = await fetch(`${this.url}/${id}`)
   const json = data.json()
   return json
    
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}

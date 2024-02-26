import { Pipe, PipeTransform } from '@angular/core';
import { HousingLocation } from './housing-location';

@Pipe({
  name: 'filterSearch',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(data: HousingLocation[], filterSearchValue: string): HousingLocation[] {
    const filterValue = filterSearchValue.toLowerCase();
    return filterValue ? data.filter((housingLocation: HousingLocation) => 
      housingLocation?.city.toLowerCase().includes(filterValue)
    ) : data;
  }

}

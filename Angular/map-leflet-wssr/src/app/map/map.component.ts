import { Component } from '@angular/core';

import { LeafletMapService } from '../leaflet-map.service';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {


  ngOnInit() {
    this.leafletService.initMap();
  }

  constructor(public leafletService : LeafletMapService){}

 
}

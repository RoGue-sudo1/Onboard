import { Component } from '@angular/core';

import { LeafletMapService } from '../leaflet-map.service';
import { Marker } from 'leaflet';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  markers: { marker: Marker<any>; index: number }[];
  active = false;
  ngOnInit() {
    this.leafletService.initMap();
  }

  handleVehicleButton(id: number) {
    this.leafletService.handleMarkers(id);
  }

  constructor(public leafletService: LeafletMapService) {
    this.markers = this.leafletService.markers.map((marker, index) => {
      return {
        marker: marker,
        index: index,
      };
    });
  }
}

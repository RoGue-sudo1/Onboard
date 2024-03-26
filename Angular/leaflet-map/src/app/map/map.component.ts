import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeafletMapService } from '../leaflet-map.service';
import * as L from 'leaflet'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {


  constructor(public mapService : LeafletMapService) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.mapService.initMap();
      L.Icon.Default.imagePath = 'assets/leaflet/';
    }
  }

  ngAfterViewInit() {
  
  
  }


 
}
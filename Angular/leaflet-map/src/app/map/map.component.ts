import { Component, OnInit,AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit,AfterViewInit {

  private map !: L.Map

  markers: L.Marker[]=[
    L.marker([31.9539, 35.9106]), // Amman
    L.marker([32.5568, 35.8469]) // Irbid
  ]

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
   this.intializeMap()
   this.addMarker()
   this.centerMap()
    
  }


 

  private intializeMap(): void {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    this.map = L.map('map',{layers:this.markers})
    L.tileLayer(baseMapURl).addTo(this.map)
  }

  private addMarker(){
    this.markers.forEach(marker=>marker.addTo(this.map))
  }

  private centerMap(){
    const bounds = L.latLngBounds(this.markers.map(marker=>marker.getLatLng()))

    this.map.fitBounds(bounds)
  }
}

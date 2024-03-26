import { Injectable } from '@angular/core';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class LeafletMapService {
  private map!: L.Map;
  markers: L.Marker[] = [
    L.marker([28.457523, 77.026344]),

    L.marker([26.9124, 75.7873]),
    L.marker([28.7041, 77.1025]),
  ];

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map', { layers: this.markers });
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private addMarkers() {
    this.markers.forEach((marker) => marker.addTo(this.map));
  }

  private centerMap() {
    const bounds = L.latLngBounds(
      this.markers.map((marker) => {
        
        return marker.getLatLng();
      })
    );

  

    this.map.fitBounds(bounds);

    this.markers.forEach((marker, index) =>
      marker.bindPopup(`Hello popup no. ${index}`).openPopup()
    );
    this.markers.forEach((marker) => marker.bindTooltip('my tooltip text'));

    

    // create a red polygon from an array of LatLng points
  }

  private moveMarker() {
    // setInterval(() => {
    //   this.markers.forEach(marker => marker.setLatLng([Math.random()*10,Math.random()*10]));
    //   this.centerMap()
    // },2000)
   const polygonCoordinates = this.getPolygonCordinates()

   const polygon = L.polygon(polygonCoordinates, {color: 'red'}).addTo(this.map);
   L.circle([28.457523, 77.026344], {radius: 10000}).addTo(this.map);

   this.map.fitBounds(polygon.getBounds());
  }

  private getPolygonCordinates():L.LatLng[] {
    const minLat = Math.min(...this.markers.map(marker=>marker.getLatLng().lat));
    const maxLat = Math.max(...this.markers.map(marker=>marker.getLatLng().lat));
    const minLng = Math.min(...this.markers.map(marker=>marker.getLatLng().lng));
    const maxLng = Math.max(...this.markers.map(marker=>marker.getLatLng().lng)); 

    return [
      L.latLng(minLat, minLng), 
      L.latLng(minLat, maxLng), 
      L.latLng(maxLat, maxLng), 
      L.latLng(maxLat, minLng), 
     
    ];
  }

  initMap() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
    this.moveMarker();
  }

  constructor() {}
}

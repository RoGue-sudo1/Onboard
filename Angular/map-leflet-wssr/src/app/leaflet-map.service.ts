import { Injectable } from '@angular/core';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class LeafletMapService {
  private map!: L.Map;
  markers: L.Marker[] = [
    L.marker([28.4592, 77.0725]),
    L.marker([28.4722, 77.0724]),
    L.marker([28.618282, 77.108218]),
    L.marker([28.5293, 77.1484]),
    L.marker([28.495, 77.0895]),
    L.marker([28.4410412, 77.079207914587]),
    L.marker([28.4276, 77.0492]),
    L.marker([28.4521, 77.0728]),
  ];

  private exactCircleMarker: L.Circle | null = null;

  markersDuplicate: L.Marker[] = [];
  polygonMarker: L.Marker[] = [];

  public handleMarkers(id: number) {
    this.removeCircleMarker();
    this.clearExistingMarkers();
    this.polygonMarker.push(this.markers[id]);
    this.markersDuplicate.push(this.markers[id]);

    this.addMarkers();
    this.centerMap();
    // this.moveMarker();
    this.circleMarker();
  }

  private clearExistingMarkers() {
    this.markersDuplicate.forEach((marker) => marker.remove());
    this.markersDuplicate = [];
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map', { center: [28.457523, 77.026344], zoom: 6 });
    L.tileLayer(baseMapURl).addTo(this.map);
  }
  private clearAllLayers() {
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
  }

  private addMarkers() {
    const updatedMarker =
      this.markersDuplicate[this.markersDuplicate.length - 1];
    this.clearAllLayers();
    updatedMarker.addTo(this.map);
  }

  private centerMap() {
    if (this.markersDuplicate.length >= 1) {
      const bounds = L.latLngBounds(
        this.markersDuplicate.map((marker) => {
          return marker.getLatLng();
        })
      );

      this.map.fitBounds(bounds);

      this.markersDuplicate.forEach((marker, index) =>
        marker.bindPopup(`Hello popup no. ${index}`).openPopup()
      );
      this.markersDuplicate.forEach((marker) =>
        marker.bindTooltip('my tooltip text')
      );
    }
  }

  private circleMarker() {
    if (this.markersDuplicate.length >= 1) {
      const circle = L.circle(this.markersDuplicate[0].getLatLng(), {
        color: 'blue',
        fillColor: 'lightblue',
        fillOpacity: 0.5,
        radius: 100,
      });

      this.removeCircleMarker();
      this.exactCircleMarker = circle.addTo(this.map);
      this.map.fitBounds(circle.getBounds());
    }
  }

  private removeCircleMarker() {
    if (this.exactCircleMarker) {
      this.map.removeLayer(this.exactCircleMarker);
      this.exactCircleMarker = null;
    }
  }

  private moveMarker() {
    // setInterval(() => {
    //   this.markers.forEach(marker => marker.setLatLng([Math.random()*10,Math.random()*10]));
    //   this.centerMap()
    // },2000)
    const polygonCoordinates = this.getPolygonCordinates();
  }

  private getPolygonCordinates(): L.LatLng[] {
    const minLat = Math.min(
      ...this.markers.map((marker) => marker.getLatLng().lat)
    );
    const maxLat = Math.max(
      ...this.markers.map((marker) => marker.getLatLng().lat)
    );
    const minLng = Math.min(
      ...this.markers.map((marker) => marker.getLatLng().lng)
    );
    const maxLng = Math.max(
      ...this.markers.map((marker) => marker.getLatLng().lng)
    );

    return [
      L.latLng(minLat, minLng),
      L.latLng(minLat, maxLng),
      L.latLng(maxLat, maxLng),
      L.latLng(maxLat, minLng),
    ];
  }

  private addPolyline() {
    let index = 0;
    setInterval(() => {
      if (index < this.markers.length) {
        this.markersDuplicate.push(this.markers[index]);
        index++;
        console.log('index',index)

        this.addMarkers();
        const polyline = L.polyline(this.getPolylineCoordinates(), {
          color: 'blue',
          noClip: true,
          smoothFactor: 1,
        }).addTo(this.map);
        this.map.fitBounds(polyline.getBounds());
      }
    }, 2000);

    // this.map.fitBounds(polyline.getBounds());
  }

  private getPolylineCoordinates(): L.LatLng[] {
    const polylineMarker = this.markersDuplicate.map((marker) => {
      marker.getLatLng();

      return L.latLng(marker.getLatLng().lat, marker.getLatLng().lng);
    });

    console.log('polylineMarker', polylineMarker);

    return polylineMarker;
  }

  initMap() {
    this.initializeMap();
    // this.addMarkers();
    this.centerMap();
    this.moveMarker();
    this.addPolyline();
  }

  constructor() {}
}

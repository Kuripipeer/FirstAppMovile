import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  latitude: number | undefined;
  longitude: number | undefined;
  precision: number | undefined;
  altitud: number | null=null;
  direccion: number | null=null;
  velocidad: number | null=null;

  constructor() {}

  async getCurrentLocation(){
    const coordinates = await Geolocation.getCurrentPosition();

    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    this.precision = coordinates.coords.accuracy;
    this.altitud = coordinates.coords.altitude;
    this.direccion = coordinates.coords.heading;
    this.velocidad = coordinates.coords.speed;

    console.log('Current position:', coordinates);
  }


}

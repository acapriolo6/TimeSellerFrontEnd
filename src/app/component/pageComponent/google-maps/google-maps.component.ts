import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {Address} from '../../../class/Address';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  @Output() positionSend = new EventEmitter<Address>();

  locationError = true;
  load = true;
  constructor() { }

  ngOnInit() {
    if ('geolocation' in navigator) {
      console.log('Sono nel if');
      navigator.geolocation.getCurrentPosition((position) => {
        const mapProp = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.locationError = false;
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        const geocoder = new google.maps.Geocoder;
        const infowindow = new google.maps.InfoWindow;
        this.geocodeLatLng(geocoder, this.map, infowindow, mapProp);
        this.load = false;
        console.log('Boh1: ' + this.load);
      }, error1 => {
        console.log('Boh2: ' + this.load);
        this.locationError = true;
      });
    } else {
      console.log('Sono nel else');
      /* da completare*/
      const mapProp = {
        center: new google.maps.LatLng(0, 0),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }
  }

  geocodeLatLng(geocoder, map, infowindow, mapProp) {
    const latlng = map.center;
    const address = new Address();
    address.latitude = mapProp.center.lat();
    address.longitude = mapProp.center.lng();
    this.positionSend.emit(address);
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        console.log(JSON.stringify(results[0]).toString());

        console.log(JSON.stringify(results[0].formatted_address));
        if (results[0]) {
          const marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

}

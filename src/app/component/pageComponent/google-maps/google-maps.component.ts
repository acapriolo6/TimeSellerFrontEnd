import {Component, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  locationError = true;
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
        const marker = new google.maps.Marker({
          position: mapProp.center,
          title: 'You are here'
        });
// To add the marker to the map, call setMap();
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        const geocoder = new google.maps.Geocoder;
        const infowindow = new google.maps.InfoWindow;
        marker.setMap(this.map);
        this.geocodeLatLng(geocoder, this.map, infowindow);
        console.log('mappa creata');
      }, error1 => {
        this.locationError = true;
      });
    } else {
      console.log('Sono nel else');
      const mapProp = {
        center: new google.maps.LatLng(0, 0),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }
  }


  geocodeLatLng(geocoder, map, infowindow) {
    const latlng = map.center;
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        console.log(JSON.stringify(results[0]).toString());

        console.log(JSON.stringify(results[0]));
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

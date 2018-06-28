import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-gmap-wrapper',
  templateUrl: './gmap-wrapper.component.html',
  styleUrls: ['./gmap-wrapper.component.css'],
})

export class GMapWrapperComponent implements OnInit {


   latitude: number;
   longitude: number;
   searchControl: FormControl;
   zoom: number;
   initialState = true;
   locationError = true;


  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {

    this.zoom = 14;
    this.latitude = 40.4656073;
    this.longitude = 9.2314158;

    this.searchControl = new FormControl();

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            this.locationError = true;
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 17;
        });
      });
    });

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 17;
        this.locationError = false;
      }, error1 => {
        this.locationError = true;
      });
    }
    console.log('pippo dice: ' + this.locationError );
  }

}

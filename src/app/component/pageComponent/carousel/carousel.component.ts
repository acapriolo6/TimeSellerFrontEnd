import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  /*@Input("config") carouselList: CarouselInterface[];*/

  alert(msg) {
    alert(msg);
  }

  @Input() auctionLink: string;

  constructor() { }

  ngOnInit() {
  }

}

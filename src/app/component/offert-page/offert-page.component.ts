import { Component, OnInit } from '@angular/core';
import {ModeAuction} from "../../class/ModeAuction";

@Component({
  selector: 'app-offert-page',
  templateUrl: './offert-page.component.html',
  styleUrls: ['./offert-page.component.css']
})
export class OffertPageComponent implements OnInit {
  bid: ModeAuction;

  constructor() {
  }

  ngOnInit() {
    this.bid = JSON.parse(localStorage.getItem('bid'));
    console.log(this.bid.startPrice);
  }

}

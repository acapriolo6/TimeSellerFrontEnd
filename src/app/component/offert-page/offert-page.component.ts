import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModeAuction} from "../../class/ModeAuction";

@Component({
  selector: 'app-offert-page',
  templateUrl: './offert-page.component.html',
  styleUrls: ['./offert-page.component.css']
})
export class OffertPageComponent implements OnInit {
  bid: ModeAuction;

  constructor(private  route: ActivatedRoute) {
    this.bid = this.route.snapshot.params['bid'];
  }

  ngOnInit() {
  }

}

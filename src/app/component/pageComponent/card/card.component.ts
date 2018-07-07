import {Component, Input, OnInit} from '@angular/core';
import {Banner} from '../../../interface/banner';
import {ApiService} from '../../../service/api.service';
import {Router} from '@angular/router';
import {DataService} from "../../../service/store.service";
import {ModeAuction} from "../../../class/ModeAuction";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() listaBanner: Banner[];

  /*get data():ModeAuction {
    return this.dataService.serviceData;
  }

  set data(value: ModeAuction) {
    this.dataService.serviceData = value;
  }*/

  constructor() { }


  ngOnInit() {
  }
}

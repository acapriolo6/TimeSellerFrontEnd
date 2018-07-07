import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Banner} from '../../../interface/banner';
import {ApiService} from '../../../service/api.service';
import {Router} from '@angular/router';
import {DataService} from "../../../service/store.service";
import {ModeAuction} from "../../../class/ModeAuction";
import {timer} from "rxjs/internal/observable/timer";
import { interval } from 'rxjs';
import {map, pluck, take, timeInterval} from 'rxjs/operators'
import {CountdownComponent} from "ngx-countdown";
import {forEach} from "@angular/router/src/utils/collection";
import Timer = NodeJS.Timer;
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
  }*!/

  countDown = this.listaBanner[0].countDownTimeEnd.getTime();
  count = 60; //6s
  startCountdownTimer() {
    this.countDown = timer(0,1000).pipe(
      take(this.count),
      map(()=> --this.count)
    );
  }

  constructor() {
  }


  ngOnInit() {
  }
}*/
  @ViewChild(CountdownComponent) counter: CountdownComponent;

  onStart() {
    //this.counter.begin();
  }

  onFinished() {
    this.counter.stop();
  }

  constructor() {
  }

  getSec(d: Date) {
    // console.log(d.toDateString() + d.getSeconds());
    var x = new Date(d);
    // x = new Date();
    console.log(x.getTime() + x.getSeconds());
    return x.getMilliseconds() * 1000;
  }

  getElement(x: Date, i: number) {
    setTimeout(this, 1, 1);

    // document.getElementById("txt" + i).innerHTML =;
  }

  countDown() {

    this.listaBanner.forEach(card => {
      // Date.parse(Date.now())
      // console.log(new Date(card.countDownTimeEnd.getTime() - Date.now()).getHours());
      var x = new Date(card.countDownTimeEnd);
      var y = new Date(card.countDown);
      // card.countDown = x - y;
    });

  }

  /*ngOnInit() {
    var i = 0;
    this.listaBanner.forEach(card => {
      /!*card.countDown = card.countDownTimeEnd;*!/
      card.countDown = i;
      i++;
    });
    setInterval(this.countDown,1000);
  }*/

  ngOnInit(){
    var i = 100;
    this.listaBanner.forEach(card => {
      card.countDown = card.countDownTimeEnd;
      /*card.countDown = i;*/
      i++;
    });
    setInterval( () => {
      console.log("ehi")
      this.countDown();
    }, 1000);
  }
}

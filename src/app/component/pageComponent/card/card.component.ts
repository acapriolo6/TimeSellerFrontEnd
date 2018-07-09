import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Banner} from '../../../interface/banner';
import {CountdownComponent} from 'ngx-countdown';
import {ModeAuction, StateOfAuction} from '../../../class/ModeAuction';
import {environment} from '../../../../environments/environment';
import {CloseauctionService} from '../../../service/closeauction.service';
import {isBoolean} from 'util';
const moment = require('moment');

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() listaBanner: ModeAuction[];
  success = false;
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
    /*this.counter.begin();*/
  }

  onFinished() {
    this.counter.stop();
  }

  constructor(private closeAuctionService: CloseauctionService) {
  }


  getElement(x: Date, i: number) {
    setTimeout(this, 1, 1);

    // document.getElementById("txt" + i).innerHTML =;
  }

  countDown() {

    /*this.listaBanner.forEach(card => {
      // Date.parse(Date.now())
      // console.log(new Date(card.countDownTimeEnd.getTime() - Date.now()).getHours());
      const end_date = moment(card.countDownTimeEnd, 'YYYY-MM-DD HH:mm:ss');
      const start_date = moment(new Date(Date.now()), 'YYYY-MM-DD HH:mm:ss');
      const duration = moment.duration(end_date.diff(start_date));
      console.log(moment);

      /*const h = parseInt( (duration.asSeconds() / 3600).toString(), 10);
      const m = parseInt( (duration.minutes() / 60).toString(), 10);
      const s = parseInt( (duration.seconds()).toString(), 10);*/

      /*const h = duration.asSeconds();
      const m = duration.minutes();
      const s = duration.seconds();
      /*card.countDown = ' ' + h + ':' + m + ':' + s;*/
      // card.countDown = x - y;
    /*});*/

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

  ngOnInit() {
    /*this.countDown();
    setInterval( () => {
      this.countDown();
    }, 1000);*/
  }

  disableBtn(i: number, card: ModeAuction) {
    // console.log('asta chiusa. Bid '+i);
    if (card.stateOfAuction !== StateOfAuction.CLOSED) {
      document.getElementById('btnbid' + i).setAttribute('disabled', 'disabled');
      // console.log(i + ' ' + card.id)
      card.stateOfAuction = StateOfAuction.CLOSED;
      this.closeAuction(card);
    }
  }

  closeAuction(auction: ModeAuction) {
    console.log(auction.id);
    this.closeAuctionService.getCloseAuction(auction.id, '/user/closeAuction/' + auction.id)
      .subscribe((data: boolean) => {
        this.success = data;
        console.log(this.success);
      },
      (data: Error) => {
        // alert('Error: '.concat(data.message));
        console.log('Error while setting closed auction: '.concat(data.message));
      });
  }

  setDataOffer(c: ModeAuction) {
    localStorage.setItem('bid', JSON.stringify(c));
  }
}

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Banner} from '../../../interface/banner';
import {CountdownComponent} from 'ngx-countdown';
import {ModeAuction, StateOfAuction} from '../../../class/ModeAuction';
import {environment} from '../../../../environments/environment';
import {CloseauctionService} from '../../../service/closeauction.service';
import {isBoolean} from 'util';
import {Address} from '../../../class/Address';
import {CloseAuctionEvent} from '../../../class/close-auction-event';
const moment = require('moment');

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() listaBanner: ModeAuction[];
  @Input() counDownEnable: boolean;
  success = false;
  stateClosed = StateOfAuction;
  @Output() auctionClose = new EventEmitter<CloseAuctionEvent>();

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
    $('#txt').text('value');
  }
}*/
  isClosed(card) {
    const now = new Date(Date.now());
    const end = new Date(this.dateOfEnd(card));
    return now.getTime() > end.getTime();
  }

  lastOffer(auction) {
    return auction.bidder.length > 0 ? auction.bidder[auction.bidder.length - 1].price : auction.startPrice;
  }

  dateOfEnd(auction) {
    /*var time = this.auction.bidder.length > 0 ? this.auction.bidder[this.auction.bidder.length - 1].offerDate
                                                : null;*/
    let finalTime: Date;
    if (auction.bidder.length > 0 ) {
      const timeEnd = 3 * 60000;
      const time = new Date(auction.bidder[auction.bidder.length - 1].offerDate);
      finalTime = new Date(time.getTime() + timeEnd);
    } else {
      finalTime = auction.countDownTimeEnd;
    }
    return finalTime;
  }

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


  ngOnInit() {
  }

  /*disableBtn(i: number, card: ModeAuction) {
    // console.log('asta chiusa. Bid '+i);
    if (this.counDownEnable && card.stateOfAuction !== StateOfAuction.CLOSED) {
      document.getElementById('btnbid' + i).setAttribute('disabled', 'disabled');
      // console.log(i + ' ' + card.id)
      card.stateOfAuction = StateOfAuction.CLOSED;
      this.listaBanner.splice(i, 1);
      /*alert(card.title + ' ' + card.seller.username);
      this.closeAuction(card);
    }
  }*/

  disableBtn(i: number, card: ModeAuction) {
    // console.log('asta chiusa. Bid '+i);

    document.getElementById('btnbid' + card.id).setAttribute('disabled', 'disabled');
    if (this.counDownEnable && card.stateOfAuction !== StateOfAuction.CLOSED) {
      const c = new CloseAuctionEvent();
      c.auction = card;
      c.index = i;
      this.auctionClose.emit(c);
    }
  }


/*closeAuction(auction: ModeAuction) {
console.log('Pippo:' + auction.id);
this.closeAuctionService.getCloseAuction(auction.id, '/user/closeAuction/' + auction.id)
.subscribe((data: boolean) => {
  this.success = data;
  console.log(this.success);
},
(data: Error) => {
  // alert('Error: '.concat(data.message));
  console.log('Error while setting closed auction: '.concat(data.message));
});
}*/

  setDataOffer(c: ModeAuction) {
    localStorage.setItem('bid', JSON.stringify(c));
  }
}

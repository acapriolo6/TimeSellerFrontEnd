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

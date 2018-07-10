import { Component, OnInit } from '@angular/core';
import {ModeAuction, StateOfAuction} from '../../class/ModeAuction';
import {CloseauctionService} from '../../service/closeauction.service';
import {Bid} from '../../class/bid';
import {Router} from '@angular/router';
import {SignupApiService} from '../../service/signup-api.service';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-offert-page',
  templateUrl: './offert-page.component.html',
  styleUrls: ['./offert-page.component.css']
})
export class OffertPageComponent implements OnInit {
  auction: ModeAuction;
  bid: Bid = new Bid();
  errorMessage: String = null;
  sendRequest = false;
  stateClosed = StateOfAuction.CLOSED;
  newInfo: Timer;

  dateOfEnd() {
    /*var time = this.auction.bidder.length > 0 ? this.auction.bidder[this.auction.bidder.length - 1].offerDate
                                                : null;*/
    let finalTime: Date;
    if (this.auction.bidder.length > 0 ) {
      const timeEnd = 3 * 60000;
      const time = new Date(this.auction.bidder[this.auction.bidder.length - 1].offerDate);
      finalTime = new Date(time.getTime() + timeEnd);
    } else {
      finalTime = this.auction.countDownTimeEnd;
    }
    return finalTime;
  }

  lastOffer() {
    return this.auction.bidder.length > 0 ? this.auction.bidder[this.auction.bidder.length - 1].price : this.auction.startPrice;
  }

  constructor(private closeAuctionService: CloseauctionService, private router: Router, private sendDataApi: SignupApiService) {
  }

  ngOnInit() {
    if (localStorage.getItem('bid')) {
      this.auction = JSON.parse(localStorage.getItem('bid'));
    } else {
      this.router.navigate(['/index']);
    }
    if (localStorage.getItem('offert')) {
      this.bid = JSON.parse(localStorage.getItem('offert'));
    }
    localStorage.removeItem('bid');
    localStorage.removeItem('offert');
    /*console.log(this.auction.bidder.length);*/
    this.newInfo = setInterval(args => this.provaThread(), 1500);
  }

  provaThread() {
    clearInterval(this.newInfo);
    this.sendDataApi.getRequest('/bid/getNewBid/' + this.auction.id).subscribe( (data: Bid[]) => {
      if (data.length !== 0) {
        if (this.auction.bidder.length > 0 && this.auction.bidder[this.auction.bidder.length - 1].price < data[0].price) {
          this.auction.bidder.push(data[0]);
          alert('Nuova offerta');
        }
      }
      /*alert('ok');*/
      this.newInfo = setInterval(args => this.provaThread(), 1000);
    }, (error1: Error) => {
      console.log(error1.message);
      this.newInfo = setInterval(args => this.provaThread(), 10000);
    });
  }

  disableBtn(card: ModeAuction) {
    // console.log('asta chiusa. Bid '+i);
    if (card.stateOfAuction !== StateOfAuction.CLOSED) {
      document.getElementById('buttonBid').setAttribute('disabled', 'disabled');
      // console.log(i + ' ' + card.id)
      card.stateOfAuction = StateOfAuction.CLOSED;
      this.closeAuction(card);
    }
  }

  closeAuction(auction: ModeAuction) {
    console.log(auction.id);
    this.closeAuctionService.getCloseAuction(auction.id, '/user/closeAuction/' + auction.id)
      .subscribe((data: boolean) => {
          /* pippo */
        },
        (data: Error) => {
          // alert('Error: '.concat(data.message));
          console.log('Error while setting closed auction: '.concat(data.message));
        });
  }

  makeBid() {
    if (!localStorage.getItem('login')) {
      this.router.navigate(['/login']);
      localStorage.setItem('nextPage', this.router.routerState.snapshot.url);
      localStorage.setItem('bid', JSON.stringify(this.auction));
      localStorage.setItem('offert', JSON.stringify(this.bid));
    } else {
      if (this.bid.price > this.lastOffer()) {
        this.errorMessage = null;
        this.bid.buyer = JSON.parse(localStorage.getItem('login'));
        this.bid.offerDate = new Date(Date.now());
        this.sendRequest = true;
        this.sendDataApi.addElement(this.bid, '/user/insert' + '?auctionId=' + this.auction.id + '').subscribe((data: Boolean) => {
          /*alert('Inserimento avvenuto con successo! Start: '
          + this.auction.countDownTimeStart + 'End: ' + this.auction.countDownTimeEnd);*/
          /*this.prova();
          this.commit = false;
          this.correct = true;*/
          /*alert(data);*/
          this.sendRequest = false;
          if (data) {
            const time = new Date(Date.now());
            this.auction.bidder.push(this.bid);
            this.bid = new Bid();
            this.sendRequest = false;
          } else {
            this.errorMessage = 'Errore inserimento... Riprovare';
          }
        }, (error: Error) => {
          this.sendRequest = false;
          this.errorMessage = error.message;


        });
      } else {
        this.errorMessage = 'Offerta troppo bassa';
      }
    }
  }
}

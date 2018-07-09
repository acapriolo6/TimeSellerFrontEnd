import { Component, OnInit } from '@angular/core';
import {ModeAuction, StateOfAuction} from '../../class/ModeAuction';
import {CloseauctionService} from '../../service/closeauction.service';
import {Bid} from '../../class/bid';
import {Router} from '@angular/router';
import {SignupApiService} from '../../service/signup-api.service';

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

  dateOfEnd() {
    return this.auction.bidder.length > 0 ? this.auction.bidder[this.auction.bidder.length - 1].offerDateEnd : this.auction.countDownTimeEnd;
  }

  lastOffer() {
    return this.auction.bidder.length > 0 ? this.auction.bidder[this.auction.bidder.length - 1].price : this.auction.startPrice;
  }

  constructor(private closeAuctionService: CloseauctionService, private router: Router, private sendDataApi: SignupApiService) {
  }

  ngOnInit() {
    this.auction = JSON.parse(localStorage.getItem('bid'));
    /*localStorage.removeItem('bid');*/
    /*console.log(this.auction.bidder.length);*/
  }

  disableBtn(i: number, card: ModeAuction) {
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
    } else {
      console.log(this.bid.price);
      if (this.bid.price > this.lastOffer()) {
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
            const addMinutes = 3 * 60000;
            this.bid.offerDateEnd = new Date(time.getTime() + addMinutes);
            console.log('Orario attuale: ' + time + ' orario futuro: ' + this.bid.offerDateEnd);
            this.auction.bidder.push(this.bid);
            this.bid = new Bid();
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

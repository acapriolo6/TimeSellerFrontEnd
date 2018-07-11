import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {Banner} from '../../interface/banner';
import {Customer} from '../../class/Customer';
import {AppComponent} from '../../app.component';
import {ModeAuction, StateOfAuction} from '../../class/ModeAuction';
import {CloseAuctionEvent} from '../../class/close-auction-event';
import {CloseauctionService} from '../../service/closeauction.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  user: Customer;
  @Output()
  authorClick: EventEmitter<Customer> = new EventEmitter<Customer>();
  listaBannerStarted: ModeAuction[];
  listaBannerClosed: ModeAuction[];
  animationStarted = true;
  animationClosed = true;
  @Input() auctionLink: string;

  constructor(private apiService: ApiService, private closeAuctionService: CloseauctionService ) {
  }

  getBanner() {
    this.apiService.getBannerStarted().subscribe((data: ModeAuction[]) => {
        this.listaBannerStarted = data;
        this.animationStarted = false;
      },
      (error: any) => {
        console.log(error);
      });
    this.apiService.getBannerClosed().subscribe((data: ModeAuction[]) => {
        this.listaBannerClosed = data;
        this.animationClosed = false;
      },
      (error: any) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.getBanner();
    this.user = localStorage.getItem('login') != null ? JSON.parse(localStorage.getItem('login')) : null;
    this.auctionLink = this.user === null ? '/login' : '/createAuction';
  }

  loginEven(event, author) {
    this.authorClick.emit(author);
  }

  closeAuctionStarted(event: CloseAuctionEvent) {
    if (event.auction.stateOfAuction !== StateOfAuction.CLOSED) {
      // console.log(i + ' ' + card.id)
      event.auction.stateOfAuction = StateOfAuction.CLOSED;

      this.closeAuction(event.auction, event.index);
    }
  }

  closeAuction(auction: ModeAuction, index: number) {
    this.closeAuctionService.getCloseAuction(auction.id, '/user/closeAuction/' + auction.id)
    .subscribe((data: boolean) => {
        this.listaBannerStarted.splice(index, 1);
        this.listaBannerClosed.unshift(auction);
      },
      (data: Error) => {
        // alert('Error: '.concat(data.message));
        console.log('Error while setting closed auction: '.concat(data.message));
      });
  }
}

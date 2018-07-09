import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {Banner} from '../../interface/banner';
import {Customer} from '../../class/Customer';
import {AppComponent} from '../../app.component';
import {ModeAuction} from '../../class/ModeAuction';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  user: Customer;
  @Output()
  authorClick: EventEmitter<Customer> = new EventEmitter<Customer>();
  listaBanner: ModeAuction[];
  animation = true;
  @Input() auctionLink: string;

  constructor(private apiService: ApiService) { }

  getBanner() {
    this.apiService.getBanner().subscribe((data: ModeAuction[]) => {
        this.listaBanner = data;
        this.listaBanner.forEach(function (element) {
          console.log('bids: ' + element.bidder.length);
        });
        this.animation = false;
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

}

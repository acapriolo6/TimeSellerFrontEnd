import {UserDetails} from './user-details';
import {PENDING} from '@angular/forms/src/model';
import {Address} from './address';
import {TimeItem} from './time-item';

export class ModeAuction {

  id: number;
  dateOfSale: Date;
  price: number;
  bidder: UserDetails[];
  countDownTimeStart: Date;
  countDownTimeEnd: Date;
  stateOfAuction: StateOfAuction;
  stateOfSale: StateOfSale;
  startPrice: number;
  location: Address;
  seller: UserDetails;
  buyer: UserDetails;
  item: TimeItem;
  payment: number;
  feedbackSeller: number;
  feedbackBuyer: number;
  title: string;


  constructor() {
    this.location = new Address();
    this.seller = new UserDetails();
    this.buyer = new UserDetails();
    this.item = new TimeItem();
  }

}

export enum StateOfAuction {
  PENDING = 0,
  SUSPEND = 1,
  STARTED = 2,
  CLOSED = 3
}
export enum StateOfSale {
  SOLDIT = 0,
  ONSALE = 1
}

import {Address} from './address';
import {TimeItem} from './time-item';
import {UserDetails} from './user-details';

export class Sale {
  id: number;
  dateOfSale: Date;
  state: StateOfSale;
  location: Address;
  seller: UserDetails;
  buyer: UserDetails;
  item: TimeItem;
  payment: number;
  feedbackSeller: number;
  feedbackBuyer: number;

  constructor() {
    this.location = new Address();
    this.seller = new UserDetails();
    this.buyer = new UserDetails();
    this.item = new TimeItem();
  }
}

export enum StateOfSale {
  SOLDIT = 0,
  ONSALE = 1
}

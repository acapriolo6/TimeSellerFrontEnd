import {Address} from './Address';
import {TimeItem} from './TimeItem';
import {Customer} from './Customer';

export class Sale {
  id: number;
  dateOfSale: Date;
  state: StateOfSale;
  location: Address;
  seller: Customer;
  buyer: Customer;
  item: TimeItem;
  payment: number;
  feedbackSeller: number;
  feedbackBuyer: number;
  price: number;

  constructor() {
    this.location = new Address();
    this.seller = new Customer();
    this.buyer = new Customer();
    this.item = new TimeItem();
  }
}

export enum StateOfSale {
  SOLDIT = 0,
  ONSALE = 1
}

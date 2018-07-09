import {Customer} from './Customer';

export class Bid {
  buyer: Customer;
  offerDate: Date;
  price: number;

  constructor() {
    this.buyer = new Customer();
  }

}

import {Customer} from './Customer';

export class Bid {
  id: number;
  buyer: Customer;
  offerDate: Date;
  price: number;

  constructor() {
    this.buyer = new Customer();
  }

}

import {Customer} from './Customer';

export class Bid {
  buyer: Customer;
  offerDate: Date;
  price: number;
  offerDateEnd: Date;

  constructor() {
    this.buyer = new Customer();
  }

}

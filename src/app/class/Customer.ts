import {Address} from './Address';

export class Customer {
  dateOfBirth: Date;
  email: string;
  fiscalCode: string;
  iban: string;
  name: string;
  password: string;
  phone: string;
  surname: string;
  username: string;
  address: Address;
  gender: string;

  constructor() {
    this.address = new Address();
  }

}

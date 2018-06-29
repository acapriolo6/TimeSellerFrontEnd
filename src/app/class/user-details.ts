import {Address} from './address';

export class UserDetails {
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

  constructor() {
    this.address = new Address();
  }

  isSet(){
    return this.surname.length>0;
  }

}

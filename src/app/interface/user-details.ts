import {AddressDetails} from './address-details';


export interface UserDetails {
  username: String;
  email: String;
  password: String;
  name: String;
  surname: String;
  fiscalCode: String;
  dateOfBirth: Date;
  iban: String;
  phone: String;
  address: AddressDetails;
}

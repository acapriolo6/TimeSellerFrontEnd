import {UserDetails} from './user-details';
import {PENDING} from '@angular/forms/src/model';
import {Address} from './address';
import {TimeItem} from './time-item';
import {Sale} from './sale';

export class ModeAuction extends Sale {

  dateOfSale: Date;
  bidder: UserDetails[];
  countDownTimeStart: Date;
  countDownTimeEnd: Date;
  stateOfAuction: StateOfAuction;
  startPrice: number;
  title: string;


  constructor() {
    super();
  }
}

export enum StateOfAuction {
  PENDING = 0,
  SUSPEND = 1,
  STARTED = 2,
  CLOSED = 3
}


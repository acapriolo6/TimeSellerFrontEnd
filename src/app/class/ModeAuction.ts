import {Customer} from './Customer';
import {PENDING} from '@angular/forms/src/model';
import {Address} from './Address';
import {TimeItem} from './TimeItem';
import {Sale} from './Sale';

export class ModeAuction extends Sale {

  dateOfSale: Date;
  bidder: Customer[];
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


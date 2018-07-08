import {Customer} from './Customer';
import {PENDING} from '@angular/forms/src/model';
import {Address} from './Address';
import {TimeItem} from './TimeItem';
import {Sale} from './Sale';
import {DataService} from '../service/store.service';
import {Bid} from './bid';

export class ModeAuction extends Sale {

  dateOfSale: Date;
  bidder: Bid[];
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


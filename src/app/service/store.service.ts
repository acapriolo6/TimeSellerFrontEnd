import { Injectable } from '@angular/core';
import {Customer} from '../class/Customer';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  user: Customer;

  constructor() { }

  setValue (val) {
    this.user = val;
  }

  getValue () {
    return this.user;
  }
}

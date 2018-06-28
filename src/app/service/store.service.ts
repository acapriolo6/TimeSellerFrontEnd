import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  temp = {};

  constructor() { }

  setValue (val) {
    this.temp = val;
  }

  getValue () {
    return this.temp;
  }
}

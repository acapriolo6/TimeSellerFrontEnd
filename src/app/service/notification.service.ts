import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private data: Observable<any>;
  private observer: Observer<any>;

  constructor() {
    this.data = new Observable(observer => {
      this.observer = observer;
    });

    /*setTimeout(() => {
      console.log('creo');
      this.observer.next(67);
    }, 6079);*/

    /*setTimeout(() => {
      console.log('creo')
      this.observer.complete();
    }, 30000);*/
  }

  subscribe (next: (value: any) => void = () => {}, error: (value: any) => void = () => {}, complete: () => void = () => {}) {
    console.log('sottoscrivo', next, error, complete);
    return this.data.subscribe(next , error , complete);
  }

  send(value: any) {
    this.observer.next(value);
  }
}

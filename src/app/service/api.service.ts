import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Banner} from '../interface/banner';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serviceBaseUrl: String = environment.baseServiceUrl + '/banner';

  constructor( private httpClient: HttpClient) {

  }

  getBannerStarted() {
    return this.httpClient.get( this.serviceBaseUrl + '/getAll');
  }
  getBannerClosed() {
    return this.httpClient.get( this.serviceBaseUrl + '/getHomeClosed');
  }
  getBannerCallBack(callbackSucces: (data: Banner[]) => any, callBackError: (data: Banner[]) => any = () => {}) {
    return this.httpClient.get( this.serviceBaseUrl + '/getAll').subscribe(callbackSucces, callBackError);
  }
}

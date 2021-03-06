import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Banner} from '../interface/banner';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Customer} from '../class/Customer';
import {ModeAuction} from '../class/ModeAuction';
import {RequestOptions} from 'http';
import {RequestOptionsArgs} from '@angular/http';
import {Params} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SignupApiService {

  serviceBaseUrl: String = environment.baseServiceUrl + '/user';
  serviceSaveUserUrl: string = this.serviceBaseUrl + '/saveCustomer';
  serviceGetAuction: string = this.serviceBaseUrl + '/getClosedAuctions';

  constructor( private httpClient: HttpClient) {

  }

  addElement(element: any, url: string) {
    return this.httpClient.post(environment.baseServiceUrl + url, element, httpOptions);

    /*return this.httpClient.post<Customer>(this.serviceSaveUserUrl, user, httpOptions);*/
  }

  getAuction(id: number, callbackSucces: (data: ModeAuction[]) => any, callBackError: (data: Error) => any = () => {}) {
    return this.httpClient.get( this.serviceGetAuction + '/' + id).subscribe(callbackSucces, callBackError);
  }

  getAuctionProva(username: string) {
    return this.httpClient.get( this.serviceGetAuction + '/' + username);
  }

  login(element: any, url: string) {
    return this.httpClient.post(environment.baseServiceUrl + url, element, httpOptions);
  }

  postRequest(element: any, url: string) {
    return this.httpClient.post(environment.baseServiceUrl + url, element, httpOptions);
  }

  getRequest(url: string) {
    return this.httpClient.get(environment.baseServiceUrl + url);
  }
}

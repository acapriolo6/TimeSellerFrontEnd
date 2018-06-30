import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Banner} from '../interface/banner';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserDetails} from '../class/user-details';

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
  serviceSaveUserUrl: string = environment.baseServiceUrl + '/user' + '/saveCustomer';

  constructor( private httpClient: HttpClient) {

  }

  addElement(element: any, url: string) {
    console.log('jdfshkfjdhjs');
    return this.httpClient.post(environment.baseServiceUrl + url, element, httpOptions);

    /*return this.httpClient.post<UserDetails>(this.serviceSaveUserUrl, user, httpOptions);*/
  }

}

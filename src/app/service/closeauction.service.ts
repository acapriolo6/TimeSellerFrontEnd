import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CloseauctionService {

  constructor(private httpClient: HttpClient) { }

  getCloseAuction(element: number, url: string){
    return this.httpClient.post(environment.baseServiceUrl + url, element);
  }
}

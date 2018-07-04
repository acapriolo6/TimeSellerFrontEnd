import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../class/Customer";
import {ModeAuction} from "../class/ModeAuction";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class GetUserForAdminService {

  users: Customer[];
  serviceBaseUrl: string = environment.baseServiceUrl + '/user';
  serviceGetUsers: string = this.serviceBaseUrl + '/admin/getUsersList';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.serviceGetUsers);
  }
}

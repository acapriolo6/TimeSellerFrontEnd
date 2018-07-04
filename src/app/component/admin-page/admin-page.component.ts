import { Component, OnInit } from '@angular/core';
import {ModeAuction} from "../../class/ModeAuction";
import {Customer} from "../../class/Customer";
import {GetUserForAdminService} from "../../service/get-user-for-admin.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  public users: Customer[];
  constructor(private getUsersService: GetUserForAdminService) { }

  ngOnInit() {
    this.getUsersService.getUsers().subscribe(data => this.users = data);
  }

}

import { Component, OnInit } from '@angular/core';
import {ModeAuction} from '../../class/ModeAuction';
import {Customer} from '../../class/Customer';
import {GetUserForAdminService} from '../../service/get-user-for-admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  users: Customer[];
  animation = true;
  error: String = null;
  styleCard = String[5];
  constructor(private getUsersService: GetUserForAdminService) { }

  ngOnInit() {
    this.styleCard = [ 'bg-success', 'bg-danger', 'bg-warning', 'bg-info' ];
    this.animation = true;
    this.getUsersService.getUsers().subscribe(data => {
      this.users = data;
      this.animation = false;
    }, (error: Error) => {
      this.animation = false;
      this.error = error.message;
    });
  }

}

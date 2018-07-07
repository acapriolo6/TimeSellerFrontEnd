import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  username = '';
  password = '';
  age = 0;
  error = true;

  constructor(private  route: ActivatedRoute) {
    this.error = true;
    this.username = this.route.snapshot.params['username'];
    if (this.route.snapshot.params['username']) {
      this.username = this.route.snapshot.params['username'];
      this.error = false;
    }
    if (this.route.snapshot.params['password']) {
      this.password = this.route.snapshot.params['password'];
      this.error = false;
    }
    if (this.route.snapshot.params['age']) {
      this.age = this.route.snapshot.params['age'];
      this.error = false;
    }
  }

  ngOnInit() {
  }

}

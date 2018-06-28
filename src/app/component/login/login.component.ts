import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  error = true;

  constructor(private  route: ActivatedRoute) {
    this.error = true;
    /*this.username = this.route.snapshot.params['username'];
    if (this.route.snapshot.params['username']) {
      this.username = this.route.snapshot.params['username'];
      this.error = false;
    }
    if (this.route.snapshot.params['password']) {
      this.password = this.route.snapshot.params['password'];
      this.error = false;
    }*/

    if ( this.password === '' && this.username === '') {
      this.error = true;
    } else {
      this.error = true;
    }
    console.log('aooooooooo');
  }

  controlForm() {
    if ( this.password.length > 0 && this.username.length > 0) {
      this.error = false;
    } else {
      this.error = true;
    }
    /*console.log(this.username + ' ' + this.error + ' ' + this.password ); */
  }

  ngOnInit() {
  }

}

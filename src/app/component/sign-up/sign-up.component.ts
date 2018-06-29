import {Component, OnInit} from '@angular/core';
import {AddressDetails} from '../../interface/address-details';
import {SignupApiService} from '../../service/signup-api.service';
import {UserDetails} from '../../class/user-details';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  password2: String;
  user: UserDetails = new UserDetails();

  constructor(private signupApi: SignupApiService) {
  }

  saveUser() {
    this.signupApi.saveUser().subscribe(user => this.user);
  }

  ngOnInit() {
  }

}

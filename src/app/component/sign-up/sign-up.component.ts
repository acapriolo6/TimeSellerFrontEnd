import {Component, OnInit} from '@angular/core';
import {UserDetails} from '../../interface/user-details';
import {AddressDetails} from '../../interface/address-details';
import {SignupApiService} from '../../service/signup-api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  password2: String;
  user: UserDetails;
  address: AddressDetails;

  constructor(private signupApi: SignupApiService) {
    this.user.address = this.address;
  }

  saveUser() {
    this.signupApi.saveUser().subscribe(user => this.user);
  }
  ngOnInit() {
  }

}

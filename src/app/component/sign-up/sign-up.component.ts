import {Component, OnInit} from '@angular/core';
import {SignupApiService} from '../../service/signup-api.service';
import {Customer} from '../../class/Customer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Address} from '../../class/Address';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  password2: String;
  user: Customer = new Customer();

  registerForm: FormGroup;
  submitted = false;
  state = false;

  constructor( private signupApi: SignupApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      surname: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', Validators.required],
      fiscalCode: ['', Validators.required],
      iban: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      street: ['', Validators.required],
      password2: ['', Validators.required],
      houseNumber: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {


    this.submitted = true;
    console.log('Ecco: ' + this.submitted + ' - ' + this.registerForm.invalid + ' - ' );
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      this.changeState(true);
    }
  }

  saveUser() {
    this.signupApi.addElement(this.user, '/user/saveCustomer').subscribe((data: Customer) => {
      console.log(' prova del cazzo!' + this.user.surname );
    });
  }

  changeState(state: boolean) {
    this.state = state;
  }


}

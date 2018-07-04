import {Component, OnInit} from '@angular/core';
import {SignupApiService} from '../../service/signup-api.service';
import {Customer} from '../../class/Customer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Address} from '../../class/Address';
import {Router} from '@angular/router';
import {s} from '@angular/core/src/render3';
import {HttpHeaders} from '@angular/common/http';
import {error} from 'util';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user = new Customer();
  angularForm = new FormGroup ({
    name: new FormControl()
  });
  model: any = {};
  submitted = false;
  password2 = '';
  usernameUsed = false;
  emailUsed = false;
  loading = false;
  correct = false;

  constructor( private signupApi: SignupApiService, private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angularForm = this.formBuilder.group({
      name: ['', [ Validators.required]],
      surname: ['', [ Validators.required]],
      fiscalCode: ['', [ Validators.required, Validators.minLength(16),
        Validators.pattern('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$')]],
      dateOfBirth: ['', [ Validators.required]],
      street: ['', [ Validators.required]],
      houseNumber: ['', [ Validators.required]],
      zipCode: ['', [ Validators.required]],
      iban: ['', [ Validators.required,
        Validators.pattern('^IT\\d{2}[ ][a-zA-Z]\\d{3}[ ]\\d{4}[ ]\\d{4}[ ]\\d{4}[ ]\\d{4}[ ]\\d{3}|IT\\d{2}[a-zA-Z]\\d{22}$')]],
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{6,10}$') ]],
      password2: ['', [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{6,10}$') ]],
      gender: ['', [Validators.required,
        Validators.pattern('^M$|^F$') ]],
      username: ['', Validators.required],
    });
  }

  checkUsername() {
    this.signupApi.login(this.user.username, '/user/usernameExists' + '?username=' + this.user.username + '')
      .subscribe((data: boolean) => {
      /*this.router.navigate(['/user/auction']);*/
      this.usernameUsed = data;
        console.log('Username: ' + data);
    }, (er: Error) => {
      alert(er.message);
    });
  }

  checkEmail() {
    this.signupApi.login(this.user.email, '/user/emailExists' + '?email=' + this.user.email + '')
      .subscribe((data: boolean) => {
      /*this.router.navigate(['/user/auction']);*/
      this.emailUsed = data;
        console.log('Email Risposta: ' + data);
    }, (er: Error) => {
      alert(er.message);
    });
  }

  onSubmit() {
    if ((this.angularForm.pristine || this.angularForm.invalid) ||
      (this.password2 !== this.user.password) || (this.emailUsed) || (this.usernameUsed) ) {
      this.submitted = true;
    } else {
      this.submitted = false;
      this.loading = true;
      this.saveUser();
    }
  }

  ngOnInit() {
  }

  checkUser() {
    this.signupApi.login(this.user.username, '/user/checkUsername').subscribe((data: boolean) => {
      console.log('Username: ' + this.user.surname );
    });
  }

  prova() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  saveUser() {
    this.signupApi.addElement(this.user, '/user/saveCustomer').subscribe((data: Customer) => {
      console.log('Username: ' + this.user.surname );
      /*this.router.navigate(['/user/auction']);*/
      /*this.loading = false;*/
      this.correct = true;
      this.prova();
    }, (er: Error) => {
      alert(er.message);
    });
  }


}

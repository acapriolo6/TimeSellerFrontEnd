import {Component, OnInit} from '@angular/core';
import {SignupApiService} from '../../service/signup-api.service';
import {Customer} from '../../class/Customer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Address} from '../../class/Address';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  password2: String;
  user: Customer = new Customer();

  registerForm: FormGroup;
  iban: FormControl;
  submitted = false;
  state = false;


  constructor( private signupApi: SignupApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      surname: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', Validators.required],
      fiscalCode: ['', Validators.required],
      iban: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{2}$')
      ]),
      phone: ['', Validators.required],
      username: ['', Validators.required],
      street: ['', Validators.required],
      password2: ['', [Validators.required, Validators.minLength(6)], Validators.bind(this.user.password)],
      houseNumber: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('Ecco: ' + this.submitted + ' - ' + this.registerForm.invalid + ' - ' );
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      alert('NON Form valida');
      return;
    } else {
      /*this.changeState(true);*/
      alert('Form valida');
    }
  }

  saveUser() {
    this.signupApi.addElement(this.user, '/user/saveCustomer').subscribe((data: Customer) => {
      console.log('Username: ' + this.user.surname );
      this.router.navigate(['/user/auction']);
    });
  }

  changeState(state: boolean) {
    this.state = state;
  }


}

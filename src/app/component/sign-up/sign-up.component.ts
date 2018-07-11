import {Component, OnInit} from '@angular/core';
import {SignupApiService} from '../../service/signup-api.service';
import {Customer} from '../../class/Customer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {PrivacytermsComponent} from "../pageComponent/privacyterms/privacyterms.component";
/*import {DialogConfiguration} from "coo-dialog/services/models/DialogConfiguration.model";
import {DialogSettings} from "coo-dialog/services/models/DialogSettings.model";
import {DialogButtonPosition} from "coo-dialog/services/models/DialogButtonPosition.model";
import {Dialog} from "coo-dialog/services/services/Dialog.service";*/

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
  dateOfBirthValid = false;

  /*notificationOptionLeft: DialogConfiguration
    = new DialogConfiguration('Alert Content', new DialogSettings('Decline', 'Approve'), new DialogButtonPosition('decline-left', 'approve-left'));*/

  constructor( private signupApi: SignupApiService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog) {
    this.createForm();
  }

  createForm() {
    this.angularForm = this.formBuilder.group({
      name: ['', [ Validators.required]],
      surname: ['', [ Validators.required]],
      fiscalCode: ['', [ Validators.required, Validators.minLength(16),
        Validators.pattern('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$')]],
      // dateOfBirth: ['', [ Validators.required]],
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

  /*calculateFiscalCode(){
    var person = CodiceFiscale({
      name: 'Mario',
      lastname: 'Rossi',
      day: '25',
      month: '04',
      year: '1945',
      isMale: true,
      communeName: 'Milano'
    });
  }*/

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

  getYear(s: string){
    let mys = s.split(" ");
    let year = mys[3];
    console.log('YEAR = '+year);
    return year;
  }

  onSubmit() {
    /*console.log(this.user.dateOfBirth);
    console.log(this.angularForm.controls['dateOfBirth'].errors.required);*/
    let thisYear = this.getYear(new Date(Date.now()).toDateString());
    let d = new Date(this.user.dateOfBirth);
    let birthYear = this.getYear(d.toDateString());
    if (thisYear > birthYear && (parseInt(birthYear) >= (parseInt(thisYear)-90))){
      console.log(thisYear);
      console.log(parseInt(birthYear));
      this.dateOfBirthValid=true;
    } else {
      console.log(parseInt(birthYear));
      this.dateOfBirthValid=false;
      console.log('Non puoi essere nato nel '+birthYear);
    }
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

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.backdropClass = '';
    dialogConfig.height = '400px;';
    dialogConfig.width = '600px';
    /*dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };*/

    this.dialog.open(PrivacytermsComponent, dialogConfig);
  }
}

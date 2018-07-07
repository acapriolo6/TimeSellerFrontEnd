///<reference path="../../../../node_modules/@types/jquery/index.d.ts"/>
import {Component, OnInit, ViewChild} from '@angular/core';
import {SignupApiService} from '../../service/signup-api.service';
import {Customer} from '../../class/Customer';
import {ModeAuction, StateOfAuction} from '../../class/ModeAuction';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Address} from '../../class/Address';



@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {


  registerForm: FormGroup;
  submitted = false;
  auction = new ModeAuction();
  minutes: number;
  hours: number;
  state = false;
  position: Address;
  commit = false;
  correct = false;

  myDate: Date;

  routerP: Router;
  constructor(private sendDataApi: SignupApiService, private formBuilder: FormBuilder, private router: Router) {
    this.routerP = this.router;
    if (!localStorage.getItem('login')) {
      this.router.navigate(['/login']);
      localStorage.setItem('nextPage', this.router.routerState.snapshot.url);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      startPrice: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      hours: ['', [Validators.required, Validators.pattern('^[0-2][0-3]$|^[0-9]$')]],
      minutes: ['', [Validators.required, Validators.pattern('^[0-5][0-9]$|^[0-9]$')]]
    });
  }

  setCurrency(event: any) {
    const t = event.target.value.toString();
    if (t.substr(t.length - 1, 1) !== '€') {
      event.target.value = event.target.value + '€';
    }
  }

  deleteCurrency(event: any) {
    const t = event.target.value.toString();
    if (t.substr(t.length - 1, 1) === '€') {
      event.target.value = t.substr(0, t.length - 1);
    }
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {


    this.submitted = true;
    // stop here if form is invalid
    console.log( this.auction.startPrice);
    if (this.registerForm.invalid || this.auction.location == null) {
      return;
    } else {
      this.changeState(true);
      this.auction.countDownTimeStart = new Date(Date.now());
      this.auction.countDownTimeEnd = new Date(Date.now());
      /*this.auction.countDownTimeEnd.setMinutes( this.auction.countDownTimeEnd..getMinutes() + this.minutes );
      this.auction.countDownTimeEnd.setHours( this.auction.countDownTimeEnd.getHours() + this.hours );*/
      let addMinutesHours = 0;
      addMinutesHours = this.auction.item.hours * 60 * 60 * 1000;
      addMinutesHours += this.auction.item.minutes * 60000;
      this.auction.seller = JSON.parse(localStorage.getItem('login'));
      this.auction.stateOfAuction = StateOfAuction.STARTED;
      this.auction.countDownTimeEnd = new Date(this.auction.countDownTimeEnd.getTime() + addMinutesHours);
    }
  }
  changeState(state: boolean) {
    this.state = state;
  }

  /*saveAuction() {
    this.sendDataApi.addElement(this.auction, '/user/newAuction').subscribe( this.saveAuctionSuccess, this.saveAuctionError);
  }*/

  saveAuction() {
    this.commit = true;
    this.sendDataApi.addElement(this.auction, '/user/newAuction').subscribe(data => {
      /*alert('Inserimento avvenuto con successo! Start: ' + this.auction.countDownTimeStart + 'End: ' + this.auction.countDownTimeEnd);*/
      this.prova();
      this.commit = false;
      this.correct = true;
    }, error => {
      alert('Errore Inserimento ');
    }  );
  }

  setPosition(address: Address ) {
    this.auction.location = address;
  }

  prova() {
    setTimeout(() => {
      this.routerP.navigate(['/index']);
    }, 2000);
  }

  saveAuctionSuccess() {
    alert('Inserimento avvenuto con successo!');
    /*this.prova();*/

  }

  saveAuctionError() {
    this.router.navigate(['/index']);
    alert('Errore Inserimento ');
  }

  setStartPrice(startPrice: number) {
    this.auction.startPrice = startPrice;
    setTimeout(() => {
      $('#startPrice').val(startPrice + '€');
    }, 2);



  }
}

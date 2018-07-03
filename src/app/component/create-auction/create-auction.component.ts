import {Component, OnInit, ViewChild} from '@angular/core';
import {SignupApiService} from '../../service/signup-api.service';
import {Customer} from '../../class/Customer';
import {ModeAuction} from '../../class/ModeAuction';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';



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

  myDate: Date;

  routerP: Router;
  constructor(private sendDataApi: SignupApiService, private formBuilder: FormBuilder, private router: Router) {
    this.routerP = this.router;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      startPrice: ['', Validators.required],
      description: ['', [Validators.required]],
      hours: ['', [Validators.required, ]],
      minutes: ['', Validators.required]
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
      this.auction.countDownTimeStart = new Date(Date.now());
      this.auction.countDownTimeEnd = new Date(Date.now());
      /*this.auction.countDownTimeEnd.setMinutes( this.auction.countDownTimeEnd..getMinutes() + this.minutes );
      this.auction.countDownTimeEnd.setHours( this.auction.countDownTimeEnd.getHours() + this.hours );*/
      let addMinutesHours = 0;
      addMinutesHours = this.hours * 60 * 60 * 1000;
      addMinutesHours += this.minutes * 60000;
      this.auction.seller = JSON.parse(localStorage.getItem('login'));
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
    this.sendDataApi.addElement(this.auction, '/user/newAuction').subscribe(data => {
      alert('Inserimento avvenuto con successo! Start: ' + this.auction.countDownTimeStart + 'End: ' + this.auction.countDownTimeEnd);
      this.prova();
    }, error => {
      alert('Errore Inserimento ');
    }  );
  }


  prova() {
    setTimeout(() => {
      this.routerP.navigate(['/index']);
    }, 2000);
  }

  saveAuctionSuccess() {
    alert('Inserimento avvenuto con successo!');
    this.prova();

  }

  saveAuctionError() {
    this.router.navigate(['/index']);
    alert('Errore Inserimento ');
  }

  setStartPrice(startPrice: number) {
    this.auction.startPrice = startPrice;
  }
}

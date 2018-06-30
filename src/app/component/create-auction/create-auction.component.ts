import {Component, OnInit, ViewChild} from '@angular/core';
import {SignupApiService} from '../../service/signup-api.service';
import {UserDetails} from '../../class/user-details';
import {ModeAuction} from '../../class/mode-auction';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateAuctionService} from '../../service/create-auction.service';



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
  state = false;

  constructor(private sendDataApi: CreateAuctionService, private formBuilder: FormBuilder) {
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
    }
  }
  changeState(state: boolean) {
    this.state = state;
  }

  saveAuction() {
    this.sendDataApi.addElement(this.auction, '/user/newAuction').subscribe((data: ModeAuction) => {
      console.log(' prova del cazzo!' + this.auction.title);
    });
  }
}

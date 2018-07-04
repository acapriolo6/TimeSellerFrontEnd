import { Component, OnInit } from '@angular/core';
import {Banner} from '../../interface/banner';
import {Sale} from '../../class/Sale';
import {ModeAuction} from '../../class/ModeAuction';
import {ApiService} from '../../service/api.service';
import {SignupApiService} from '../../service/signup-api.service';
import {error} from 'util';
import {e} from '@angular/core/src/render3';
import {Customer} from '../../class/Customer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css']
})
export class SaleDetailsComponent implements OnInit {

  listaAste: ModeAuction[];
  c: Customer = JSON.parse(localStorage.getItem('login'));
  constructor(private api: SignupApiService, private router: Router) {
    if (!localStorage.getItem('login')) {
      this.router.navigate(['/login']);
      localStorage.setItem('nextPage', this.router.routerState.snapshot.url);
    }
  }

  getAuction() {
    this.api.getAuction(4, this.getAuctionCallSuccess, this.getAuctionCallError);
  }

  getAuctionCallSuccess(data: ModeAuction[]) {
    this.listaAste = data;
    alert(this.listaAste[0].title);
  }

  getAuctionCallError(data: Error) {
    alert(data.message);
  }

  getAuctionProva() {
    /*alert(this.c.username);*/
    this.api.getAuctionProva(this.c.username).subscribe((data: ModeAuction[]) => {
        this.listaAste = data;
      },
      (data: Error) => {
        alert(data.message);
      });
  }

  ngOnInit() {
    /*this.getAuction();*/
    this.getAuctionProva();
  }

}

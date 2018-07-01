import { Component, OnInit } from '@angular/core';
import {Banner} from '../../interface/banner';
import {Sale} from '../../class/Sale';
import {ModeAuction} from '../../class/ModeAuction';
import {ApiService} from '../../service/api.service';
import {SignupApiService} from '../../service/signup-api.service';
import {error} from 'util';
import {e} from '@angular/core/src/render3';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css']
})
export class SaleDetailsComponent implements OnInit {

  listaAste: ModeAuction[];
  id = 4;

  constructor(private api: SignupApiService) { }

  getAuction() {
    this.api.getAuction(this.id, this.getAuctionCallSuccess, this.getAuctionCallError);
  }

  getAuctionCallSuccess(data: ModeAuction[]) {
    this.listaAste = data;
    alert(this.listaAste[0].title);
  }

  getAuctionCallError(data: Error) {
    alert(data.message);
  }

  getAuctionProva() {
    this.api.getAuctionProva(this.id).subscribe((data: ModeAuction[]) => {
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

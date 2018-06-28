import { Component, OnInit } from '@angular/core';
import {Banner} from '../../../banner';
import {ApiService} from '../../../service/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  listaBanner: Banner[];

  constructor(private route: Router, private apiService: ApiService) { }

  getBanner() {
    this.apiService.getBanner().subscribe((data: Banner[]) => {
        this.listaBanner = data;
      },
      (error: any) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.getBanner();
  }

}

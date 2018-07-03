import {Component, Input, OnInit} from '@angular/core';
import {Banner} from '../../../interface/banner';
import {ApiService} from '../../../service/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() listaBanner: Banner[];

  constructor(private route: Router, private apiService: ApiService) { }


  ngOnInit() {
  }

  convert() {

  }

}

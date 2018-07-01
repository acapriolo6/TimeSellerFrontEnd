import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {Banner} from '../../interface/banner';
import {Customer} from '../../class/Customer';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  user = Customer;
  @Output()
  authorClick: EventEmitter<Customer> = new EventEmitter<Customer>();

  constructor() { }


  ngOnInit() {
  }

  loginEven(event, author) {
    this.authorClick.emit(author);
  }

}

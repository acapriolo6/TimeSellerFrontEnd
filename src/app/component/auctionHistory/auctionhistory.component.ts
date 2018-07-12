
import {SignupApiService} from '../../service/signup-api.service';
import {ModeAuction} from '../../class/ModeAuction';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auctionhistory',
  templateUrl: './auctionhistory.component.html',
  styleUrls: ['./auctionhistory.component.css']
})
export class AuctionhistoryComponent implements OnInit {

  closedAuctions: ModeAuction[];
  error: String = null;

  constructor(private postAPI: SignupApiService) { }

  ngOnInit() {
    this.postAPI.getRequest('/user/getClosedAuctions').subscribe( (serverData: ModeAuction[]) => {
      this.closedAuctions = serverData;
    }, (error: Error) => {
      this.error = error.message;
    });
  }

}

// users: Customer[];
// animation = true;
// error: String = null;
// styleCard = String[5];
// constructor(private getUsersService: GetUserForAdminService) { }
//
// ngOnInit() {
//   this.styleCard = [ 'bg-success', 'bg-danger', 'bg-warning', 'bg-info' ];
//   this.animation = true;
//   this.getUsersService.getUsers().subscribe(data => {
//     this.users = data;
//     this.animation = false;
//   }, (error: Error) => {
//     this.animation = false;
//     this.error = error.message;
//   });
// }

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../../class/Customer';
import {NotificationService} from '../../service/notification.service';
import {SignupApiService} from '../../service/signup-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user = new Customer();
  error = true;

  constructor(private  route: ActivatedRoute, private notification: NotificationService, private sendDataApi: SignupApiService, private router: Router) {
    this.error = true;
    /*this.username = this.route.snapshot.params['username'];
    if (this.route.snapshot.params['username']) {
      this.username = this.route.snapshot.params['username'];
      this.error = false;
    }
    if (this.route.snapshot.params['password']) {
      this.password = this.route.snapshot.params['password'];
      this.error = false;
    }*/

    if ( this.user.password === '' && this.user.username === '') {
      this.error = true;
    } else {
      this.error = true;
    }
    console.log('aooooooooo');
  }

  controlForm() {
    if ( this.user.password.length > 0 && this.user.username.length > 0) {
      this.error = false;
    } else {
      this.error = true;
    }
    /*console.log(this.username + ' ' + this.error + ' ' + this.password ); */
  }

  @Output()
  authorClick: EventEmitter<String> = new EventEmitter<String>();


  loginEven(event, author) {
    this.authorClick.emit(author);
  }

  login() {
    /*alert('Dati pre invio: ' + this.user.username + ' ' + this.user.password )*/
    this.sendDataApi.login(this.user, '/user/checkUser').subscribe(data => {
      alert('Login avvenuto con successo!');
      this.notification.send(this.user.username);
      this.router.navigate(['/user/auction']);
    }, error => {
      alert('Errore Login ');
    }  );
  }

  ngOnInit() {
  }

}

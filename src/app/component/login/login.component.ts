import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../../class/Customer';
import {NotificationService} from '../../service/notification.service';
import {SignupApiService} from '../../service/signup-api.service';
import {RispostaDTO} from '../../class/RispostaDTO';
import {url} from 'inspector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user = new Customer();
  /*rispostaDTO = new RispostaDTO();*/
  error = true;
  url = '';
  animation = true;

  constructor(private  route: ActivatedRoute, private notification: NotificationService,
              private sendDataApi: SignupApiService, private router: Router) {
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
    /*if ( this.rispostaDTO.password === '' && this.rispostaDTO.username === '') {
      this.error = true;
    } else {
      this.error = true;
    }*/
    console.log('aooooooooo');
    this.url = (localStorage.getItem('nextPage') !== null) ? localStorage.getItem('nextPage')  : '/createAuction';
    localStorage.removeItem('nextPage');
  }

  controlForm() {
    if (this.user.password != null && this.user.username != null && this.user.password.length > 0 && this.user.username.length > 0) {
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
    this.sendDataApi.login(this.user, '/user/login').subscribe(data => {
    // this.sendDataApi.login(this.rispostaDTO, '/user/login').subscribe(data => {
    //   alert('Login avvenuto con successo!' + JSON.stringify(data));
      this.notification.send(this.user);
      localStorage.setItem('login', JSON.stringify(data));
      // this.notification.send(this.rispostaDTO);
      this.router.navigate([this.url]);
    }, error => {
      alert('Errore Login ');
    }  );
  }

  ngOnInit() {
  }

}

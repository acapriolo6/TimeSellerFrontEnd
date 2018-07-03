import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Customer} from './class/Customer';
import {NavigationEnd, NavigationError, NavigationStart, Router, Event} from '@angular/router';
import {error} from 'util';
import {NotificationService} from './service/notification.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  mostra = false;

  datiUtente = {name: '', surname: '', age: ''} ;

  mostraUtente = false;

  profile = 'Profile';
  user: Customer;
  cookie: String;

  controlForm() {
    console.log('prova');
    this.mostraUtente = (this.datiUtente.name !== '' && this.datiUtente.surname !== '' && this.datiUtente.age !== '');
    return this.mostraUtente;
  }


  showAuthorFromParent = function(author) {
    alert(author);
  };

  constructor (private router: Router, private notification: NotificationService, private cookieService: CookieService) {
    this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        /*alert('Cazzo!');*/
      }
      if (event instanceof NavigationEnd) {
        /*alert('Cazzo! Fine');*/
      }
      if (event instanceof NavigationError) {
        /*alert('Cazzo! Error');*/
      }
    });
    const l = localStorage.getItem('login');
    /*alert(l);*/
    if (l !== null) {
      this.user = JSON.parse(localStorage.getItem('login'));
      this.profile = this.user.username;
    }

  }

  provaRouter() {
    if (this.user == null) {
      return 'login';
    } else {
      return 'createAuction';
    }
  }

  signUpFunction() {
    alert('Utente disconnesso!');
    localStorage.clear();
    this.user = null;
    this.profile = 'Profile';
    this.router.navigate(['/index']);
  }

  ngOnInit() {
    const subscription = this.notification.subscribe(
      value => {
        this.user = value;
        this.profile = this.user.username;
        localStorage.setItem('login', JSON.stringify(value));
        /*this.cookieService.set('login', JSON.stringify(this.user) );
        if ( this.cookieService.check('login') ) {
          this.user = JSON.parse(this.cookieService.get('login'));
        }*/
        },
      () => console.log(error),
      () => console.log('complete')
    );

  }

}

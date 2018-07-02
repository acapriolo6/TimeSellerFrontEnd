import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Customer} from './class/Customer';
import {NavigationEnd, NavigationError, NavigationStart, Router, Event} from '@angular/router';
import {error} from 'util';
import {NotificationService} from './service/notification.service';

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

  user: Customer;

  controlForm() {
    console.log('prova');
    this.mostraUtente = (this.datiUtente.name !== '' && this.datiUtente.surname !== '' && this.datiUtente.age !== '');
    return this.mostraUtente;
  }


  showAuthorFromParent = function(author) {
    alert(author);
  };

  constructor (private router: Router, private notification: NotificationService) {
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
    this.router.navigate(['/index']);
  }

  ngOnInit() {
    const subscription = this.notification.subscribe(
      value => {this.user = value; alert(value); },
      () => console.log(error),
      () => console.log('complete')
    );
  }

}

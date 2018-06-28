import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mostra = false;

  datiUtente = {name: '', surname: '', age: ''} ;

  mostraUtente = false;

  controlForm() {
    console.log('prova');
    this.mostraUtente = (this.datiUtente.name !== '' && this.datiUtente.surname !== '' && this.datiUtente.age !== '');
    return this.mostraUtente;
  }
}

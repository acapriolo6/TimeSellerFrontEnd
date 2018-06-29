export class UserDetails {
  private _dateOfBirth: Date;
  private _email: string;
  private _fiscalCode: string;
  private _iban: string;
  private _name: string;
  private _password: string;
  private _phone: string;
  private _surname: string;
  private _username: string;


  constructor() {
  }


  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get fiscalCode(): string {
    return this._fiscalCode;
  }

  set fiscalCode(value: string) {
    this._fiscalCode = value;
  }

  get iban(): string {
    return this._iban;
  }

  set iban(value: string) {
    this._iban = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}

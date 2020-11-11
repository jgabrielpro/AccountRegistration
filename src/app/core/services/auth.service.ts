import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  private _userId = "abc";

  private _userIsAutheniticated = false;

  get userAuthenticated() {
    return this._userIsAutheniticated;
  }

  get userId() {
    return this._userId;
  }

  onLogin() {
    this._userIsAutheniticated = true;
  }

  onLogout() {
    this._userIsAutheniticated = false;
  }
}

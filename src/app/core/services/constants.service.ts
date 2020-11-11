import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppConstants {
  url = "http://localhost:3000/";

  CONSTANTS = {
    users: this.url + "users",
  };
  constructor() {}
}

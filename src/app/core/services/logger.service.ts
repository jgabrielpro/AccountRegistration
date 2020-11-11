import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoggerService {
  constructor() {}

  warn(message: string) {
    if (!environment.production) {
      console.warn("hello from customloggerservice." + message);
    }
  }

  error(message: string) {
    if (!environment.production) {
      console.error("hello from customloggerservice." + message);
    }
  }
  info(message: string) {
    if (!environment.production) {
      console.info("hello from customloggerservice" + message);
    }
  }
}

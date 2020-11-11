import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map, take } from "rxjs/operators";
import { LoggerService } from "../services/logger.service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class BaseService {
  constructor(
    private httpClient: HttpClient,
    private loggerService: LoggerService
  ) {}


  postData(url: string, data: any, headers?: any): Observable<any> {
    return this.httpClient.post<any>(url, data, httpOptions).pipe(
      tap((d: any) =>
        this.loggerService.info("baseService postData get called.")
      ),
      catchError((error) => this.handleError(error))
    );
  }

  getData(url: string, headers: any): Observable<any> {
    let data: any;
    return this.httpClient.get(url).pipe(
      tap((response: any) => {
        (data = response),
          this.loggerService.info("baseService get data returned.");
      }),
      catchError((error) => this.handleError(error))
    );
  }

  deleteData(url: string, headers: any): Observable<any> {
    return this.httpClient.delete<any>(url, httpOptions).pipe(
      tap((_) => this.loggerService.info("baseService deleted the data")),
      catchError((error) => this.handleError(error))
    );
  }

  putData(url: string, headers: any, apimKey: any = null): Observable<any> {
    let data: any;
    return this.httpClient.put(url, {}, httpOptions).pipe(
      tap((response: any) => {
        (data = response),
          this.loggerService.info("baseService get data returned.");
      }),
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}

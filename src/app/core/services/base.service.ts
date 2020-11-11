import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { LoggerService } from "./logger.service";
declare var userContext: any;

export class BaseService {
  userContext;
  ApiUrlBase;

  constructor(
    private httpClient: HttpClient,
    private loggerService: LoggerService
  )
  {
    this.userContext = userContext;
    this.ApiUrlBase = userContext.ApiUrlBase;
  }

  postData(url: string, data: any, headers: any): Observable<any> {
    this.addUserContextHeaders(headers);
    const httpOptions = { headers };
    return this.httpClient.post<any>(this.URL(url), data, httpOptions).pipe(
      tap((response: any) => {
        this.loggerService.info("baseService postData get called."),
          this.ServerErrorHandler(url, response);
      }),
      catchError(
        this.handleError<any>("base service post", "error", this.URL(url))
      )
    );
  }

  getData(url: string, headers: any): Observable<any> {
    this.addUserContextHeaders(headers);
    const httpOptions = { headers };
    return this.httpClient.get(this.URL(url), httpOptions).pipe(
      tap((response: any) => {
        this.loggerService.info("baseService get data returned."),
          this.ServerErrorHandler(url, response);
      }),
      catchError(
        this.handleError<any>("base service get", "error", this.URL(url))
      )
    );
  }

  deleteData(url: string, headers: any): Observable<any> {
    this.addUserContextHeaders(headers);
    const httpOptions = { headers };
    return this.httpClient.delete<any>(this.URL(url), httpOptions).pipe(
      tap((_) => this.loggerService.info("baseService deleted the data")),
      catchError(
        this.handleError<any>("base service delete", "error", this.URL(url))
      )
    );
  }

  handleError<T>(operation = "operation", result: T, url: string) {
    return (error: any): Observable<T> => {
      // this.imNotificationService.serverErrorNotification("error", "DM_IM_NOTIFICATION_SERVER_ERROR_MESSAGE", "OK", "OK", this.afterServerError, true, url);
      this.loggerService.error(error);
      return of(result);
    };
  }

  ServerErrorHandler(url, response) {
    if (response && !response.isSuccess) {
      let errorMessage = response.errorMessage || response.ErrorMessage || "";
      // this.imNotificationService.serverErrorNotificationWithErrorMsg("error", "DM_IM_NOTIFICATION_SERVER_ERROR_MESSAGE", "OK", "OK", this.afterServerError, true, url, errorMessage);
    }
  }

  afterServerError() {}
  addUserContextHeaders(headers) {
    Object.assign(headers, {
      "Ocp-Apim-Subscription-Key": userContext.OcpApimSubscriptionKey,
      RegionID: "8",
      // "Content-Type": "application/json",
      UserExecutionContext: userContext.UserContext,
    });
  }

  postExternalData(url: string, data: any, headers: any): Observable<any> {
    // this.addUserContextHeaders(headers);
    // const httpOptions = { headers };
    return this.httpClient.post<any>(url, data, headers);
  }

  URL(url): string {
    return this.ApiUrlBase + url;
  }
}

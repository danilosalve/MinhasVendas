import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PoComboOption } from '@po-ui/ng-components';

export abstract class BaseResourceService <T>{
  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiPath).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}${id}`;
    return this.http.get<T>(url).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  abstract getComboOptions(resources: T[]): PoComboOption[];
}

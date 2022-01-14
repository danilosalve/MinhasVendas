import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

  getComboOptions(resources: T[]): PoSelectOption[] {
    return []
  };

  create(resource: T): Observable<any> {
    return this.http
      .post(this.apiPath, resource);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url);
  }
}

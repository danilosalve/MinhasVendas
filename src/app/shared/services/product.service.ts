import { Product } from './../interfaces/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly apiPath = 'api/products/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiPath).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  getById(id: number): Observable<Product> {
    const url = `${this.apiPath}${id}`;
    return this.http.get<Product>(url).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}

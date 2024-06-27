import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'clientes');
  }
}

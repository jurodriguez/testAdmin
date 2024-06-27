import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface EntityWithId {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class BaseService<T extends EntityWithId> {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('endpoint') private endpoint: string
  ) {
    // Verifica si el endpoint ya contiene 'http' para asignarlo correctamente
    if (this.endpoint.startsWith('http')) {
      this.apiUrl = this.endpoint;
    } else {
      this.apiUrl = `${environment.API_URL}${this.endpoint}`;
    }
  }

  getAll(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get<T[]>(url, { observe: 'response' }).pipe(
      map((response) => ({
        data: response.body,
        totalElements: Number(response.headers.get('X-Total-Count')),
      })),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  create(object: any): Observable<T> {
    return this.getAll().pipe(
      switchMap((response) => {
        const objects = response.data;

        if (!Array.isArray(objects)) {
          throw new Error('Response is not an array');
        }

        let maxId = objects.reduce((max, obj) => Math.max(max, +obj.id), 0);
        maxId += 1;
        object.id = maxId.toString();

        return this.http.post<T>(this.apiUrl, object).pipe(
          catchError((error) => {
            // Optionally handle error here
            return throwError(
              () => new Error(error.message || 'Unknown error')
            );
          })
        );
      }),
      catchError((error) => {
        // Handle error from getAll or switchMap
        return throwError(() => new Error(error.message || 'Unknown error'));
      })
    );
  }

  update(id: number, object: T): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<T>(url, object).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

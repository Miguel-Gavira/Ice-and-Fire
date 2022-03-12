import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private http: HttpClient) {}

  getToken(user: string, pass: string): Observable<any> {
    if (user === 'admin' && pass === '1234') {
      return this.http
        .get<any>('assets/mocks/jwt.json')
        .pipe(map((res: any) => res.token));
    } else {
      return of(new HttpErrorResponse({ error: 'invalid credentials', status: 401 }));
    }
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }
}

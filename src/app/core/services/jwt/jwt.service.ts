import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  getToken(user: string, pass: string): Observable<any> {
    const url = user === 'admin' && pass === '1234' ? 'assets/mocks/jwt.json' : '';
      return this.http
        .get<any>(url)
        .pipe(map((res: any) => res.token));
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  validToken() {
    const token = sessionStorage.getItem('token');
    return token && !this.jwtHelperService.isTokenExpired(token);
  }
}

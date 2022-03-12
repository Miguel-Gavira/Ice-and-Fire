import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private charactersUrl = 'https://www.anapioficeandfire.com/api/characters';

  constructor(private http: HttpClient) {}

  getCharacters(
    page: string,
    pageSize: string,
    gender: string,
    isAlive: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll({
      page,
      pageSize,
      gender,
      isAlive,
    });
    return this.http
      .get(this.charactersUrl, { params })
      .pipe(
        tap((res) =>
          sessionStorage.setItem(
            this.getSessionStorageKey(page, pageSize, gender, isAlive),
            JSON.stringify(res)
          )
        )
      );
  }

  getSessionStorageKey(
    page: string,
    pageSize: string,
    gender: string,
    isAlive: string
  ): string {
    return JSON.stringify({ page, pageSize, gender, isAlive });
  }
}

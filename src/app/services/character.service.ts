import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<Character[]> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.results));
  }
}

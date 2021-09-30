import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportistaService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvatiSportisteService(){
    return this.http.get(`${this.uri}/sportista/dohvatiSveSportiste`);
  }

}

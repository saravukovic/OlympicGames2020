import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from './models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  prijavaService(korIme, lozinka) {
    let data = {
      korIme: korIme,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/korisnik/prijava`, data);
  }

  registracijaService(korIme, lozinka, ime, prezime, nacionalnost, mail, tip) {
    let data = {
      korIme: korIme,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      nacionalnost: nacionalnost,
      mail: mail,
      tip: tip
    }
    return this.http.post(`${this.uri}/korisnik/registracija`, data);
  }

  dohvatanjeKorisnikaService(){
    return this.http.get(`${this.uri}/korisnik/dohvatiSveKorisnike`);
  }

  dohvatanjeDelegataService(){
    return this.http.get(`${this.uri}/korisnik/dohvatiSveDelegate`);
  }

  dohvatanjeZemaljaService(){
    return this.http.get(`${this.uri}/zemlja/dohvatiSveZemlje`);
  }

  dohvatanjeSportovaService(){
    return this.http.get(`${this.uri}/sport/dohvatiSveSportove`);
  }

  azurirajLozinku(korIme, lozinka) {
    let data = {
      korIme: korIme,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/korisnik/azurirajLozinku`, data);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZahtevZaReg } from './models/zahtevZaReg';

@Injectable({
  providedIn: 'root'
})
export class OrganizatorService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dodajSportService(sport, disciplina, vrsta, min, max) {
    let data = {
      sport: sport,
      disciplina: disciplina,
      vrsta: vrsta,
      min: min,
      max: max
    }
    return this.http.post(`${this.uri}/sport/dodajSport`, data);
  }

  dodajTakmicenjeService(sport, disciplina, pol, format, datumPocetka, datumKraja, lokacija, vrsta, takmicari, delegat) {
    let data = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      format:format,
      datumPocetka:datumPocetka,
      datumKraja: datumKraja,
      lokacije:lokacija,
      vrsta:vrsta,
      takmicari:takmicari,
      zavrseno:false,
      delegati:delegat,
    }
    return this.http.post(`${this.uri}/takmicenje/dodajTakmicenje`, data);
  }

  dohvatiRekordeService(){
    return this.http.get(`${this.uri}/takmicenje/dohvatiSveRekorde`);
  }

  postaviZaNosiocaService(id){
    let data = {
      idSportiste:id
    }
    return this.http.post(`${this.uri}/sportista/postaviZaNosioca`,data);
  }

  dohvatiZahteveZaReg(){
    return this.http.get(`${this.uri}/korisnik/dohvatiZahteveZaReg`);
  }

  dohvatiSvaTakmicenja(){
    return this.http.get(`${this.uri}/takmicenje/dohvatiSvaTakmicenja`);
  }

  odobriRegistraciju(zahtev:ZahtevZaReg){
    let data = {
      korIme:zahtev.korIme,
      lozinka:zahtev.lozinka,
      ime:zahtev.ime,
      prezime:zahtev.prezime,
      nacionalnost:zahtev.nacionalnost,
      mail:zahtev.mail,
      tip:zahtev.tip
    }
    return this.http.post(`${this.uri}/korisnik/odobriRegistraciju`,data);
  }

  ukloniZahtevZaRegistraciju(id){
    let data = {
      id:id
    }
    return this.http.post(`${this.uri}/korisnik/ukloniZahtevZaRegistraciju`,data);
  }

}

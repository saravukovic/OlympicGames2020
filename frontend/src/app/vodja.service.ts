import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VodjaService {

  uri = 'http://localhost:4000'
  static idSportiste = 26;

  constructor(private http: HttpClient) { }

  dodajSportistuService(idVodje, sport, disciplina, ime, prezime, pol, zemlja, brojMedalja, vrsta, clanoviEkipe, nosilac) {
    let data = {
      idSportiste:VodjaService.idSportiste++,
      idVodje:idVodje,
      sport:sport,
      discipline:disciplina,
      ime:ime,
      prezime:prezime,
      pol:pol,
      zemlja:zemlja,
      brojMedalja:brojMedalja,
      vrsta:vrsta,
      clanoviEkipe:clanoviEkipe,
      nosilac: nosilac
    }
    return this.http.post(`${this.uri}/sportista/dodajSportistu`, data);
  }

  dodajSportistuUEkipuService(id, imeIPrezime){
    let data = {
      idSportiste:id,
      imeIPrezime:imeIPrezime
    }
    return this.http.post(`${this.uri}/sportista/dodajSportistuUEkipu`, data);
  }

  dohvatiEkipeService(id){
    let data = {
      idVodje:id
    }
    return this.http.post(`${this.uri}/sportista/dohvatiEkipe`, data);
  }

  dohvatiTakmicenjeService(sport, disciplina, pol){
    let data = {
      sport:sport,
      disciplina:disciplina,
      pol:pol
    }
    return this.http.post(`${this.uri}/takmicenje/dohvatiTakmicenjeZaDisciplinu`, data);
  }

  dohvatiSveSportoveService(){
    return this.http.get(`${this.uri}/sport/dohvatiSveSportove`);
  }

  dohvatiKorisnikaService(korIme){
    let data = {
      korIme:korIme
    }
    return this.http.post(`${this.uri}/korisnik/dohvatiKorisnika`, data);
  }

  dohvatiSportisteService(){
    return this.http.get(`${this.uri}/sportista/dohvatiSveSportiste`);
  }

  dodajDisciplinuSportistiService(idSportiste, disciplina){
    let data = {
      idSportiste:idSportiste,
      disciplina:disciplina
    }
    return this.http.post(`${this.uri}/sportista/dodajDisciplinuSportisti`, data);
  }

  dohvatiMojeSportisteService(idVodje){
    let data = {
      idVodje:idVodje
    }
    return this.http.post(`${this.uri}/sportista/dohvatiMojeSportiste`,data);
  }

}

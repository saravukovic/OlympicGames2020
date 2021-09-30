import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DelegatService {
  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dodajURasporedService(takmicenje: number, nivo: string, grupa: number, kolo, vremePocetka: string, lokacija: string, sportisti: number[], imenaSportista:string[]) {
    let data = {
      takmicenje: takmicenje,
      nivo: nivo,
      grupa: grupa,
      kolo:kolo,
      vremePocetka: new Date(vremePocetka),
      lokacija: lokacija,
      sportisti: sportisti,
      imenaSportista: imenaSportista
    }
    return this.http.post(`${this.uri}/takmicenje/dodajURaspored`, data);
  }

  dohvatiMojaTakmicenjaService(korIme){
    let data = {
      korIme:korIme
    }
    return this.http.post(`${this.uri}/takmicenje/dohvatiMojaTakmicenja`, data);
  }

  dohvatiSveSportisteService(){
    return this.http.get(`${this.uri}/sportista/dohvatiSveSportiste`);
  }

  dohvatiSveRasporedeService(){
    return this.http.get(`${this.uri}/takmicenje/dohvatiSveRasporede`);
  }

  dohvatiSveRezultateService(){
    return this.http.get(`${this.uri}/takmicenje/dohvatiSveRezultate`);
  }

  dohvatiMojeRezultateService(id){
    let data = {
      id:id
    }
    return this.http.post(`${this.uri}/takmicenje/dohvatiRezultateTakmicenja`, data);
  }

  dohvatiMojRasporedService(id){
    let data = {
      id:id
    }
    return this.http.post(`${this.uri}/takmicenje/dohvatiRasporedTakmicenja`, data);
  }

  dodajRezultatService(idSportiste, idTakmicenja, rezultat, rang, nivo, kolo){
    let data = {
      idSportiste:idSportiste,
      idTakmicenja:idTakmicenja,
      rezultat:rezultat,
      rang:rang,
      nivo:nivo,
      kolo:kolo
    }
    return this.http.post(`${this.uri}/takmicenje/dodajRezultat`, data);
  }

  dohvatiRezultateZaNivoService(id, nivo){
    let data = {
      id:id,
      nivo:nivo
    }
    return this.http.post(`${this.uri}/takmicenje/dohvatiRezultateZaNivo`, data);
  }

  dodajGrupuService(niz, grupa, nivo, id){
    let data = {
      niz:niz,
      grupa:grupa,
      nivo:nivo,
      idTakmicenja:id
    }
    return this.http.post(`${this.uri}/takmicenje/dodajGrupu`, data);
  }

  dohvatiGrupeService(){
    return this.http.get(`${this.uri}/takmicenje/dodahvatiSveGrupe`);
  }

  dodajMedaljuService(idSportiste, sport, sportskaDisciplina, mesto){
    let data = {
      idSportiste:idSportiste,
      sport:sport,
      sportskaDisciplina:sportskaDisciplina,
      mesto:mesto
    }
    return this.http.post(`${this.uri}/takmicenje/dodajMedalju`, data);
  }

  dodajMedaljuSportistiService(idSportiste){
    let data = {
      idSportiste:idSportiste
    }
    return this.http.post(`${this.uri}/sportista/dodajMedalju`, data);
  }

  dodajMedaljuZemljiService(naziv, mesto){
    let data = {
      naziv:naziv,
      mesto:mesto
    }
    return this.http.post(`${this.uri}/zemlja/dodajMedalju`, data);
  }

  zavrsiTakmicenjeService(id){
    let data = {
      id:id
    }
    return this.http.post(`${this.uri}/takmicenje/zavrsiTakmicenje`, data);
  }

}

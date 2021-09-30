import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DelegatService } from '../delegat.service';
import { Grupa } from '../models/grupa';
import { Raspored } from '../models/raspored';
import { Rezultat } from '../models/rezultat';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';


@Component({
  selector: 'app-rezultati',
  templateUrl: './rezultati.component.html',
  styleUrls: ['./rezultati.component.css']
})

export class RezultatiComponent implements OnInit {

  constructor(public delegatService: DelegatService, private router:Router) { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem('ulogovan');
    this.delegatService.dohvatiMojaTakmicenjaService(this.ulogovan).subscribe((res: Takmicenje[]) => {
      this.takmicenja = res;
      this.takmicenja.forEach(element => {
        if (!this.sportovi.includes(element.sport)) this.sportovi.push(element.sport);
      });
    })
    this.delegatService.dohvatiGrupeService().subscribe((res: Grupa[]) => {
      this.grupe = res
    })
  }


  ulogovan: string = '';
  takmicenja: Takmicenje[] = [];
  mojiRezultati: Rezultat[] = [];
  mojRaspored: Raspored[] = [];
  sportovi: string[] = [];
  discipline: string[] = [];
  mecevi: Raspored[] = [];
  rezultat: number[][] = [];
  grupe: Grupa[] = [];

  sport: string;
  disciplina: string = '';
  pol: string;
  takmicenje: Takmicenje;
  ekipno: boolean = false;

  poslednjeKolo: number = 0;
  poslednjiNivo: string = '';
  utakmicaUKolu: number = 0;

  onChange() {
    this.discipline = [];
    this.takmicenja.forEach(element => {
      if (element.sport === this.sport && element.disciplina != '') this.discipline.push(element.disciplina);
    })
  }
  poruka = '';
  prikaziTakmicenje() {
    for (let element of this.takmicenja) {
      if (element.sport === this.sport && element.disciplina === this.disciplina && element.pol === this.pol) {
        this.takmicenje = element;
        break;
      }
    }
    if (this.takmicenje.zavrseno) {
      this.zavrsi = false;
      this.poruka = "Takmicenje je zavrseno!";
      return;
    }
    this.delegatService.dohvatiMojeRezultateService(this.takmicenje.id).subscribe((rez: Rezultat[]) => {
      this.mojiRezultati = rez;
    })
    this.delegatService.dohvatiMojRasporedService(this.takmicenje.id).subscribe((rez: Raspored[]) => {
      this.mojRaspored = rez;
    })
    if (this.takmicenje.vrsta === 'ekipni') this.ekipnoTakmicenje();
    else if (this.sport === 'Tenis') this.tenis();
    else this.individTakmicenje();
  }
  maxNivo: number = 0;
  ekipnoTakmicenje() {
    this.ekipno = true;
    this.maxNivo = 1;
    this.poslednjeKolo = 1;
    this.poslednjiNivo = 'grupna faza';
    if (this.mojiRezultati.length)
      this.mojiRezultati.forEach(element => {
        if (element.nivo > this.maxNivo) this.maxNivo = element.nivo;
        if (element.kolo > this.poslednjeKolo) this.poslednjeKolo = element.kolo;
      });

    this.nivo = 1;
    this.azurirajKrug();
  }

  rezultat1: number[] = [];
  rezultat2: number[] = [];
  nivo: number;

  azurirajKrug() {
    this.mecevi = [];
    if (this.maxNivo == 1 && this.poslednjeKolo == 5) { this.poslednjiNivo = 'cetvrtfinale'; this.nivo = 2 }
    else if (this.maxNivo == 2) { this.poslednjiNivo = 'polufinale'; this.nivo = 3 }
    else if (this.maxNivo == 3) { this.poslednjiNivo = 'trece mesto'; this.nivo = 4 }
    else if (this.maxNivo == 4) { this.poslednjiNivo = 'finale'; this.nivo = 5 }
    else {
      this.poslednjiNivo = 'finale';
      this.zavrsi = true;
      return;
    }
    if (this.poslednjiNivo != 'grupna faza') this.poslednjeKolo = 0;

    let cnt = 0;
    if (this.mojRaspored.length)
      for (let i = 0; i < this.mojRaspored.length; i++) {
        if (this.mojRaspored[i].nivo === this.poslednjiNivo && this.mojRaspored[i].kolo == this.poslednjeKolo) {
          if (this.mojRaspored[i].sportisti.length == 0) cnt++;
          this.mecevi.push(this.mojRaspored[i])
        }
      }

    if (cnt > 0) this.azurirajSportiste();

  }

  message: string = '';
  zavrsi: boolean = false;
  cnt = 0;
  unesiRezultatEkpino(m: Raspored) {
    if (this.sport === 'odbojka') {
      if (this.rezultat1[this.mecevi.indexOf(m)] > 3 || this.rezultat2[this.mecevi.indexOf(m)] > 3) {
        this.message = "Najveca vrednost rezultata je 3! Pokusajte ponovo!"
        return;
      }
    }
    let rang0, rang1;
    if (this.rezultat1[this.mecevi.indexOf(m)] > this.rezultat2[this.mecevi.indexOf(m)]) {
      rang0 = 2;
      rang1 = 1;
    } else {
      rang0 = 1;
      rang1 = 2;
    }
    this.delegatService.dodajRezultatService(m.sportisti[0], this.takmicenje.id, this.rezultat1[this.mecevi.indexOf(m)].toString(), rang0, this.nivo, this.poslednjeKolo).subscribe(res => {
      console.log(res['poruka']);
    });
    this.delegatService.dodajRezultatService(m.sportisti[1], this.takmicenje.id, this.rezultat2[this.mecevi.indexOf(m)].toString(), rang1, this.nivo, this.poslednjeKolo).subscribe(res => {
      console.log(res['poruka']);
    });;
    if (this.poslednjiNivo === 'grupna faza' && this.poslednjeKolo <= 5) {
      this.utakmicaUKolu++;
      if (this.utakmicaUKolu >= 6) {
        this.poslednjeKolo++;
        this.utakmicaUKolu = 0;
        this.rezultat1 = [];
        this.rezultat2 = [];
      }
    }
    else {
      if (this.poslednjiNivo === 'grupna faza') {
        this.maxNivo++;
        this.rezultat1 = [];
        this.rezultat2 = [];
        this.cnt = 0;
      }
      else if (this.poslednjiNivo === 'cetvrtfinale') {
        this.cnt++;
        if (this.cnt == 4) {
          this.maxNivo++;
          this.rezultat1 = [];
          this.rezultat2 = [];
          this.cnt = 0;
        }
      }
      else if (this.poslednjiNivo === 'polufinale') {
        this.cnt++;
        if (this.cnt == 2) {
          this.maxNivo++;
          this.rezultat1 = [];
          this.rezultat2 = [];
          this.cnt = 0;
        }
      }
      else if (this.poslednjiNivo === 'trece mesto') {
        this.maxNivo++;
        this.rezultat1 = [];
        this.rezultat2 = [];
      }

    }
    if (this.poslednjiNivo !== 'finale') this.azurirajKrug();
    else this.zavrsi = true;
  }

  tenis() {
    this.maxNivo = 1;
    this.poslednjiNivo = 'osmina finala';
    if (this.mojiRezultati.length)
      this.mojiRezultati.forEach(element => {
        if (element.nivo > this.maxNivo) this.maxNivo = element.nivo;
      });

    this.nivo = 1;
    this.azurirajTenisKrug();
  }

  azurirajTenisKrug() {
    this.mecevi = [];
    if (this.maxNivo == 1 && !this.mojiRezultati.length) { this.poslednjiNivo = 'osmina finala'; this.nivo = 1 }
    else if (this.maxNivo == 1 && this.mojiRezultati.length) { this.poslednjiNivo = 'cetvrtfinale'; this.nivo = 2 }
    else if (this.maxNivo == 2) { this.poslednjiNivo = 'polufinale'; this.nivo = 3 }//???????????????????
    else if (this.maxNivo == 3) { this.poslednjiNivo = 'trece mesto'; this.nivo = 4 }
    else if (this.maxNivo == 4) { this.poslednjiNivo = 'finale'; this.nivo = 5 }
    else {
      this.poslednjiNivo = 'finale';
      this.zavrsi = true;
      return;
    }
    let cnt = 0;
    if (this.mojRaspored.length)
      for (let i = 0; i < this.mojRaspored.length; i++) {
        if (this.mojRaspored[i].nivo === this.poslednjiNivo) {
          if (this.mojRaspored[i].sportisti.length == 0) cnt++;
          this.mecevi.push(this.mojRaspored[i])
        }
      }
    if (cnt > 0) this.azurirajSportiste();
  }

  unesiRezultatTenis(m: Raspored) {
    if (this.rezultat1[this.mecevi.indexOf(m)] > 2 || this.rezultat2[this.mecevi.indexOf(m)] > 2) {
      this.message = "Najveca vrednost rezultata je 2! Pokusajte ponovo!"
      return;
    }
    let rang0, rang1;
    if (this.rezultat1[this.mecevi.indexOf(m)] > this.rezultat2[this.mecevi.indexOf(m)]) {
      rang0 = 2;
      rang1 = 1;
    } else {
      rang0 = 1;
      rang1 = 2;
    }

    if (this.disciplina === 'Dubl') {
      this.delegatService.dodajRezultatService(m.sportisti[0], this.takmicenje.id, this.rezultat1[this.mecevi.indexOf(m)].toString(), rang0, this.nivo, 0).subscribe(res => {
        console.log(res['poruka']);
      });
      this.delegatService.dodajRezultatService(m.sportisti[1], this.takmicenje.id, this.rezultat1[this.mecevi.indexOf(m)].toString(), rang0, this.nivo, 0).subscribe(res => {
        console.log(res['poruka']);
      });

      this.delegatService.dodajRezultatService(m.sportisti[2], this.takmicenje.id, this.rezultat2[this.mecevi.indexOf(m)].toString(), rang1, this.nivo, 0).subscribe(res => {
        console.log(res['poruka']);
      });
      this.delegatService.dodajRezultatService(m.sportisti[3], this.takmicenje.id, this.rezultat2[this.mecevi.indexOf(m)].toString(), rang1, this.nivo, 0).subscribe(res => {
        console.log(res['poruka']);
      });
    } else {
      this.delegatService.dodajRezultatService(m.sportisti[0], this.takmicenje.id, this.rezultat1[this.mecevi.indexOf(m)].toString(), rang0, this.nivo, 0).subscribe(res => {
        console.log(res['poruka']);
      });
      this.delegatService.dodajRezultatService(m.sportisti[1], this.takmicenje.id, this.rezultat2[this.mecevi.indexOf(m)].toString(), rang1, this.nivo, 0).subscribe(res => {
        console.log(res['poruka']);
      });
    }

    if (this.poslednjiNivo === 'osmina finala') {
      this.cnt++;
      if (this.cnt == 8) {
        this.maxNivo++;
        this.rezultat1 = [];
        this.rezultat2 = [];
        this.cnt = 0;
        this.azurirajTenisKrug();
      }
    }
    else if (this.poslednjiNivo === 'cetvrtfinale') {
      this.cnt++;
      if (this.cnt == 4) {
        this.maxNivo++;
        this.rezultat1 = [];
        this.rezultat2 = [];
        this.cnt = 0;
        this.azurirajTenisKrug();
      }
    }
    else if (this.poslednjiNivo === 'polufinale') {
      this.cnt++;
      if (this.cnt == 2) {
        this.maxNivo++;
        this.rezultat1 = [];
        this.rezultat2 = [];
        this.cnt = 0;
        this.azurirajTenisKrug();
      }
    }
    else if (this.poslednjiNivo === 'trece mesto') {
      this.maxNivo++;
      this.rezultat1 = [];
      this.rezultat2 = [];
      this.azurirajTenisKrug();
    }
    if (this.poslednjiNivo === 'finale') {
      this.zavrsi = true;
      this.azurirajTenisKrug();
    }
  }

  opet: boolean = false;
  opetTakmicari = [];
  opetId: number[] = [];
  opetPoruka: string = '';
  id1: number;
  id2: number;
  id3: number;
  koji: number;

  azurirajMedalje() {
    if (this.takmicenje.vrsta === 'ekipni' || this.takmicenje.sport === 'Tenis') {
      this.delegatService.dohvatiRezultateZaNivoService(this.takmicenje.id, 5).subscribe((res: Rezultat[]) => {
        let prvi, drugi, prvi1, drugi1;
        if (this.disciplina != 'Dubl') {
          if (res[0].rang > res[1].rang) {
            prvi = res[0].idSportiste;
            drugi = res[1].idSportiste;
          } else {
            prvi = res[1].idSportiste;
            drugi = res[0].idSportiste;
          }

          this.delegatService.dodajMedaljuSportistiService(prvi).subscribe();
          this.delegatService.dodajMedaljuSportistiService(drugi).subscribe();
          this.delegatService.dodajMedaljuService(prvi, this.takmicenje.sport, this.takmicenje.disciplina, 'zlato').subscribe();
          this.delegatService.dodajMedaljuService(drugi, this.takmicenje.sport, this.takmicenje.disciplina, 'srebro').subscribe();
          this.delegatService.dohvatiSveSportisteService().subscribe((res: Sportista[]) => {
            res.forEach(element => {
              if (element.idSportiste == prvi) this.delegatService.dodajMedaljuZemljiService(element.zemlja, 1).subscribe();
              if (element.idSportiste == drugi) this.delegatService.dodajMedaljuZemljiService(element.zemlja, 2).subscribe();
            });
          })

        } else {
          let m = res[0].rang
          res.forEach(e => {
            if (e.rang > m) m = e.rang;
          })
          res.forEach(e => {
            if (e.rang == m) {
              prvi1.push(e.idSportiste);
            } else drugi1.push(e.idSportiste);
          })

          this.delegatService.dodajMedaljuSportistiService(prvi1[0]).subscribe();
          this.delegatService.dodajMedaljuSportistiService(prvi1[1]).subscribe();
          this.delegatService.dodajMedaljuSportistiService(drugi1[0]).subscribe();
          this.delegatService.dodajMedaljuSportistiService(drugi1[1]).subscribe();
          this.delegatService.dodajMedaljuService(prvi1[0], this.takmicenje.sport, this.takmicenje.disciplina, 'zlato').subscribe();
          this.delegatService.dodajMedaljuService(prvi1[1], this.takmicenje.sport, this.takmicenje.disciplina, 'zlato').subscribe();
          this.delegatService.dodajMedaljuService(drugi1[0], this.takmicenje.sport, this.takmicenje.disciplina, 'srebro').subscribe();
          this.delegatService.dodajMedaljuService(drugi1[1], this.takmicenje.sport, this.takmicenje.disciplina, 'srebro').subscribe();
          this.delegatService.dohvatiSveSportisteService().subscribe((res: Sportista[]) => {
            res.forEach(element => {
              if (element.idSportiste == prvi1[0]) this.delegatService.dodajMedaljuZemljiService(element.zemlja, 1).subscribe();
              if (element.idSportiste == drugi1[0]) this.delegatService.dodajMedaljuZemljiService(element.zemlja, 2).subscribe();
            });
          })
        }
      })

      this.delegatService.dohvatiRezultateZaNivoService(this.takmicenje.id, 4).subscribe((res: Rezultat[]) => {
        let treci, treci1;
        if (this.disciplina !== 'Dubl') {
          if (res[0].rang > res[1].rang) {
            treci = res[0].idSportiste;
          } else {
            treci = res[1].idSportiste;
          }
          this.delegatService.dodajMedaljuSportistiService(treci).subscribe();
          this.delegatService.dodajMedaljuService(treci, this.takmicenje.sport, this.takmicenje.disciplina, 'bronza').subscribe();
          this.delegatService.dohvatiSveSportisteService().subscribe((res: Sportista[]) => {
            res.forEach(element => {
              if (element.idSportiste == treci) this.delegatService.dodajMedaljuZemljiService(element.zemlja, 3).subscribe();
            });
          })
        } else {
          let m = res[0].rang
          res.forEach(e => {
            if (e.rang > m) m = e.rang;
          })
          res.forEach(e => {
            if (e.rang == m) {
              treci1.push(e.idSportiste);
            }
          })
          this.delegatService.dodajMedaljuSportistiService(treci1[0]).subscribe();
          this.delegatService.dodajMedaljuSportistiService(treci1[2]).subscribe();
          this.delegatService.dodajMedaljuService(treci1[0], this.takmicenje.sport, this.takmicenje.disciplina, 'bronza').subscribe();
          this.delegatService.dodajMedaljuService(treci1[1], this.takmicenje.sport, this.takmicenje.disciplina, 'bronza').subscribe();
          this.delegatService.dohvatiSveSportisteService().subscribe((res: Sportista[]) => {
            res.forEach(element => {
              if (element.idSportiste == treci1[0]) this.delegatService.dodajMedaljuZemljiService(element.zemlja, 3).subscribe();
            });
          })

        }
      })
    } else {
      this.opetId = [];
      this.opetTakmicari = []
      if (this.format === 'atletika 100m') {
        let rezMiliSek: number[] = [];
        let sortRezMiliSek: number[] = [];
        let s: string[] = [];
        this.delegatService.dohvatiMojeRezultateService(this.takmicenje.id).subscribe((res: Rezultat[]) => {
          for (let i = 0; i < res.length; i++) {
            const r = res[i];
            s = r.rezultat.split(',');
            rezMiliSek[i] = parseInt(s[1]);
            rezMiliSek[i] += (parseInt(s[0]) * 100);
          }
          sortRezMiliSek = [...rezMiliSek];
          sortRezMiliSek.sort((a, b) => {
            return a - b;
          })
          this.id1 = res[rezMiliSek.indexOf(sortRezMiliSek[0])].idSportiste;
          this.id2 = res[rezMiliSek.indexOf(sortRezMiliSek[1])].idSportiste;
          this.id3 = res[rezMiliSek.indexOf(sortRezMiliSek[2])].idSportiste;
          if (sortRezMiliSek[0] == sortRezMiliSek[1]) {
            let n = rezMiliSek.indexOf(sortRezMiliSek[0]);
            this.id1 = res[n].idSportiste;
            this.id2 = res[rezMiliSek.indexOf(sortRezMiliSek[1], n + 1)].idSportiste;
            this.opetId.push(this.id1);
            this.opetId.push(this.id2);
            this.koji = 12;
            this.opet = true;
            for (let i = 0; i < this.mojRaspored[0].sportisti.length; i++) {
              const r = this.mojRaspored[0].sportisti[i];
              if (r == this.id1)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
              if (r == this.id2)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
            }
            this.opetPoruka = 'Ovi takmicari imaju iste rezultate. Unesite rezultat novog kruga';
            return;
          } else if (sortRezMiliSek[2] == sortRezMiliSek[1]) {
            let n = rezMiliSek.indexOf(sortRezMiliSek[1]);
            this.id2 = res[n].idSportiste;
            this.id3 = res[rezMiliSek.indexOf(sortRezMiliSek[2], n + 1)].idSportiste;
            this.opetId.push(this.id2);
            this.opetId.push(this.id3);
            this.koji = 23
            this.opet = true;
            for (let i = 0; i < this.mojRaspored[0].sportisti.length; i++) {
              const r = this.mojRaspored[0].sportisti[i];
              if (r == this.id3)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
              if (r == this.id2)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
            }
            this.opetPoruka = 'Ovi takmicari imaju iste rezultate. Unesite rezultat novog kruga';
            return;
          } else {
            this.dodajMedalje();
          }
        })
      } else if (this.format === 'atletika 800m') {
        let rezMiliSek: number[] = [];
        let rezSek: number[] = []
        let sortRezMiliSek: number[] = [];
        let s: string[] = [];
        let s1: string[] = [];
        this.delegatService.dohvatiMojeRezultateService(this.takmicenje.id).subscribe((res: Rezultat[]) => {
          for (let i = 0; i < res.length; i++) {
            const r = res[i];
            s = r.rezultat.split(':');
            s1 = s[1].split(',');
            rezSek[i] = parseInt(s1[0]);
            rezSek[i] += (parseInt(s[0]) * 60);
            rezMiliSek[i] = parseInt(s1[1]);
            rezMiliSek[i] += (rezSek[i] * 100);
          }
          sortRezMiliSek = [...rezMiliSek];
          sortRezMiliSek.sort((a, b) => {
            return a - b;
          })
          this.id1 = res[rezMiliSek.indexOf(sortRezMiliSek[0])].idSportiste;
          this.id2 = res[rezMiliSek.indexOf(sortRezMiliSek[1])].idSportiste;
          this.id3 = res[rezMiliSek.indexOf(sortRezMiliSek[2])].idSportiste;
          if (sortRezMiliSek[0] == sortRezMiliSek[1]) {
            let n = rezMiliSek.indexOf(sortRezMiliSek[0]);
            this.id1 = res[n].idSportiste;
            this.id2 = res[rezMiliSek.indexOf(sortRezMiliSek[1], n + 1)].idSportiste;
            this.opetId.push(this.id1);
            this.opetId.push(this.id2);
            this.koji = 12;
            this.opet = true;
            for (let i = 0; i < this.mojRaspored[0].sportisti.length; i++) {
              const r = this.mojRaspored[0].sportisti[i];
              if (r == this.id1)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
              if (r == this.id2)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
            }
            this.opetPoruka = 'Ovi takmicari imaju iste rezultate. Unesite rezultat novog kruga';
            return;
          } else if (sortRezMiliSek[2] == sortRezMiliSek[1]) {
            let n = rezMiliSek.indexOf(sortRezMiliSek[1]);
            this.id2 = res[n].idSportiste;
            this.id3 = res[rezMiliSek.indexOf(sortRezMiliSek[2], n + 1)].idSportiste;
            this.opetId.push(this.id2);
            this.opetId.push(this.id3);
            this.koji = 23;
            this.opet = true;
            for (let i = 0; i < this.mojRaspored[0].sportisti.length; i++) {
              const r = this.mojRaspored[0].sportisti[i];
              if (r == this.id3)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
              if (r == this.id2)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
            }
            this.opetPoruka = 'Ovi takmicari imaju iste rezultate. Unesite rezultat novog kruga';
            return;
          } else {
            this.dodajMedalje();
          }
        })
      } else if (this.format === 'skok' || this.format === 'bacanje') {
        let rezCMetri: number[] = [];
        let sortRezMetri: number[] = [];
        let s: string[] = [];
        this.delegatService.dohvatiMojeRezultateService(this.takmicenje.id).subscribe((res: Rezultat[]) => {
          for (let i = 0; i < res.length; i++) {
            const r = res[i];
            s = r.rezultat.split(':');
            rezCMetri[i] = parseInt(s[1]);
            rezCMetri[i] += (parseInt(s[0]) * 100);
          }
          sortRezMetri = [...rezCMetri];
          sortRezMetri.sort((a, b) => {
            return b - a;
          })
          this.id1 = res[rezCMetri.indexOf(sortRezMetri[0])].idSportiste;
          this.id2 = res[rezCMetri.indexOf(sortRezMetri[1])].idSportiste;
          this.id3 = res[rezCMetri.indexOf(sortRezMetri[2])].idSportiste;
          if (sortRezMetri[0] == sortRezMetri[1]) {
            let n = rezCMetri.indexOf(sortRezMetri[0]);
            this.id1 = res[n].idSportiste;
            this.id2 = res[rezCMetri.indexOf(sortRezMetri[1], n + 1)].idSportiste;
            this.opetId.push(this.id1);
            this.opetId.push(this.id2);
            this.koji = 12;
            this.opet = true;
            for (let i = 0; i < this.mojRaspored[0].sportisti.length; i++) {
              const r = this.mojRaspored[0].sportisti[i];
              if (r == this.id1)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
              if (r == this.id2)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
            }
            this.opetPoruka = 'Ovi takmicari imaju iste rezultate. Unesite rezultat novog kruga';
            return;
          } else if (sortRezMetri[2] == sortRezMetri[1]) {
            let n = rezCMetri.indexOf(sortRezMetri[1]);
            this.id2 = res[n].idSportiste;
            this.id3 = res[rezCMetri.indexOf(sortRezMetri[2], n + 1)].idSportiste;
            this.opetId.push(this.id2);
            this.opetId.push(this.id3);
            this.koji = 23;
            this.opet = true;
            for (let i = 0; i < this.mojRaspored[0].sportisti.length; i++) {
              const r = this.mojRaspored[0].sportisti[i];
              if (r == this.id3)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
              if (r == this.id2)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
            }
            this.opetPoruka = 'Ovi takmicari imaju iste rezultate. Unesite rezultat novog kruga';
            return;
          }
          this.dodajMedalje();
        })

      } else if (this.format === 'maraton') {
        let rezSekSek: number[] = [];
        let sortRezSek: number[] = [];
        let s: string[] = [];
        this.delegatService.dohvatiMojeRezultateService(this.takmicenje.id).subscribe((res: Rezultat[]) => {
          for (let i = 0; i < res.length; i++) {
            const r = res[i];
            s = r.rezultat.split(':');
            rezSekSek[i] = parseInt(s[2]);
            rezSekSek[i] += (parseInt(s[1]) * 60);
            rezSekSek[i] += (parseInt(s[0]) * 60);
          }
          sortRezSek = [...rezSekSek];
          sortRezSek.sort((a, b) => {
            return a - b;
          })
          this.id1 = res[rezSekSek.indexOf(sortRezSek[0])].idSportiste;
          this.id2 = res[rezSekSek.indexOf(sortRezSek[1])].idSportiste;
          this.id3 = res[rezSekSek.indexOf(sortRezSek[2])].idSportiste;
          if (sortRezSek[0] == sortRezSek[1]) {
            let n = rezSekSek.indexOf(sortRezSek[0]);
            this.id1 = res[n].idSportiste;
            this.id2 = res[rezSekSek.indexOf(sortRezSek[1], n + 1)].idSportiste;
            this.opetId.push(this.id1);
            this.opetId.push(this.id2);
            this.koji = 12;
            this.opet = true;
            for (let i = 0; i < this.mojRaspored[0].sportisti.length; i++) {
              const r = this.mojRaspored[0].sportisti[i];
              if (r == this.id1)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
              if (r == this.id2)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
            }
            this.opetPoruka = 'Ovi takmicari imaju iste rezultate. Unesite rezultat novog kruga';
            return;
          } else if (sortRezSek[2] == sortRezSek[1]) {
            let n = rezSekSek.indexOf(sortRezSek[1]);
            this.id2 = res[n].idSportiste;
            this.id3 = res[rezSekSek.indexOf(sortRezSek[2], n + 1)].idSportiste;
            this.opetId.push(this.id2);
            this.opetId.push(this.id3);
            this.koji = 23;
            this.opet = true;
            for (let i = 0; i < this.mojRaspored[0].sportisti.length; i++) {
              const r = this.mojRaspored[0].sportisti[i];
              if (r == this.id3)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
              if (r == this.id2)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
            }
            this.opetPoruka = 'Ovi takmicari imaju iste rezultate. Unesite rezultat novog kruga';
            return;
          } else {
            this.dodajMedalje();
          }
        })
      } else if (this.format === 'trostav') {
        let rez: number[] = [];
        let sortRez: number[] = [];
        this.delegatService.dohvatiMojeRezultateService(this.takmicenje.id).subscribe((res: Rezultat[]) => {
          for (let i = 0; i < res.length; i++) {
            const r = res[i];
            rez[i] = parseInt(r.rezultat);
          }
          sortRez = [...rez];
          sortRez.sort((a, b) => {
            return b - a;
          })
          this.id1 = res[rez.indexOf(sortRez[0])].idSportiste;
          this.id2 = res[rez.indexOf(sortRez[1])].idSportiste;
          this.id3 = res[rez.indexOf(sortRez[2])].idSportiste;
          if (sortRez[0] == sortRez[1]) {
            let n = rez.indexOf(sortRez[0]);
            this.id1 = res[n].idSportiste;
            this.id2 = res[rez.indexOf(sortRez[1], n + 1)].idSportiste;
            this.opetId.push(this.id1);
            this.opetId.push(this.id2);
            this.koji = 12;
            this.opet = true;
            for (let i = 0; i < this.mojRaspored[0].sportisti.length; i++) {
              const r = this.mojRaspored[0].sportisti[i];
              if (r == this.id1)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
              if (r == this.id2)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
            }
            this.opetPoruka = 'Ovi takmicari imaju iste rezultate. Unesite rezultat novog kruga';
            return;
          } else if (sortRez[2] == sortRez[1]) {
            let n = rez.indexOf(sortRez[1]);
            this.id2 = res[n].idSportiste;
            this.id3 = res[rez.indexOf(sortRez[2], n + 1)].idSportiste;
            this.opetId.push(this.id2);
            this.opetId.push(this.id3);
            this.koji = 23;
            this.opet = true;
            for (let i = 0; i < this.mojRaspored[0].sportisti.length; i++) {
              const r = this.mojRaspored[0].sportisti[i];
              if (r == this.id3)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
              if (r == this.id2)
                this.opetTakmicari.push(this.mojRaspored[0].imenaSportista[i]);
            }
            this.opetPoruka = 'Ovi takmicari imaju iste rezultate. Unesite rezultat novog kruga';
            return;
          } else {
            this.dodajMedalje();
          }
        })
      }
    }
    this.zavrsi = false;
    this.poruka = "Takmicenje je zavrseno!";
    this.delegatService.zavrsiTakmicenjeService(this.takmicenje.id).subscribe();
  }
  dodajMedalje() {
    this.delegatService.dodajMedaljuSportistiService(this.id1).subscribe();
    this.delegatService.dodajMedaljuSportistiService(this.id2).subscribe();
    this.delegatService.dodajMedaljuSportistiService(this.id3).subscribe();
    this.delegatService.dodajMedaljuService(this.id1, this.takmicenje.sport, this.takmicenje.disciplina, 'zlato').subscribe();
    this.delegatService.dodajMedaljuService(this.id2, this.takmicenje.sport, this.takmicenje.disciplina, 'srebro').subscribe();
    this.delegatService.dodajMedaljuService(this.id3, this.takmicenje.sport, this.takmicenje.disciplina, 'bronza').subscribe();
    this.delegatService.dohvatiSveSportisteService().subscribe((res: Sportista[]) => {
      res.forEach(element => {
        if (element.idSportiste == this.id1) this.delegatService.dodajMedaljuZemljiService(element.zemlja, 1).subscribe();
        if (element.idSportiste == this.id2) this.delegatService.dodajMedaljuZemljiService(element.zemlja, 2).subscribe();
        if (element.idSportiste == this.id3) this.delegatService.dodajMedaljuZemljiService(element.zemlja, 3).subscribe();
      });
    })
  }
  opetRezultat1: string;
  opetRezultat2: string;
  opetKrug() {
    if (this.format === 'atletika 100m') {
      let rezMiliSek1: number;
      let rezMiliSek2: number;
      let s: string[] = [];
      s = this.opetRezultat1.split(',');
      rezMiliSek1 = parseInt(s[1]);
      rezMiliSek1 += (parseInt(s[0]) * 100);
      s = this.opetRezultat2.split(',');
      rezMiliSek2 = parseInt(s[1]);
      rezMiliSek2 += (parseInt(s[0]) * 100);
      if (rezMiliSek1 < rezMiliSek2) {
        if (this.koji == 12) {
          this.id1 = this.opetId[0]
          this.id2 = this.opetId[1]
        } else {
          this.id2 = this.opetId[0]
          this.id3 = this.opetId[1]
        }
      } else {
        if (this.koji == 12) {
          this.id1 = this.opetId[1]
          this.id2 = this.opetId[0]
        } else {
          this.id2 = this.opetId[1]
          this.id3 = this.opetId[0]
        }
      }
    } else if (this.format === 'atletika 800m') {
      let rezMiliSek1: number;
      let rezMiliSek2: number;
      let s: string[] = [];
      let s1: string[] = [];
      let rezSek: number;
      s = this.opetRezultat1.split(':');
      s1 = s[1].split(',');
      rezSek = parseInt(s1[0]);
      rezSek += (parseInt(s[0]) * 60);
      rezMiliSek1 = parseInt(s1[1]);
      rezMiliSek1 += (rezSek * 100);

      s = this.opetRezultat2.split(':');
      s1 = s[1].split(',');
      rezSek = parseInt(s1[0]);
      rezSek += (parseInt(s[0]) * 60);
      rezMiliSek2 = parseInt(s1[1]);
      rezMiliSek2 += (rezSek * 100);

      if (rezMiliSek1 < rezMiliSek2) {
        if (this.koji == 12) {
          this.id1 = this.opetId[0]
          this.id2 = this.opetId[1]
        } else {
          this.id2 = this.opetId[0]
          this.id3 = this.opetId[1]
        }
      } else {
        if (this.koji == 12) {
          this.id1 = this.opetId[1]
          this.id2 = this.opetId[0]
        } else {
          this.id2 = this.opetId[1]
          this.id3 = this.opetId[0]
        }
      }
    } else if (this.format === 'skok' || this.format === 'bacanje') {
      let rezMiliSek1: number;
      let rezMiliSek2: number;
      let s: string[] = [];
      s = this.opetRezultat1.split(':');
      rezMiliSek1 = parseInt(s[1]);
      rezMiliSek1 += (parseInt(s[0]) * 100);
      s = this.opetRezultat2.split(':');
      rezMiliSek2 = parseInt(s[1]);
      rezMiliSek2 += (parseInt(s[0]) * 100);
      if (rezMiliSek1 > rezMiliSek2) {
        if (this.koji == 12) {
          this.id1 = this.opetId[0]
          this.id2 = this.opetId[1]
        } else {
          this.id2 = this.opetId[0]
          this.id3 = this.opetId[1]
        }
      } else {
        if (this.koji == 12) {
          this.id1 = this.opetId[1]
          this.id2 = this.opetId[0]
        } else {
          this.id2 = this.opetId[1]
          this.id3 = this.opetId[0]
        }
      }
    } else if (this.format === 'maraton') {
      let rezMiliSek1: number;
      let rezMiliSek2: number;
      let s: string[] = [];
      s = this.opetRezultat1.split(':');
      rezMiliSek1 = parseInt(s[2]);
      rezMiliSek1 += (parseInt(s[1]) * 60);
      rezMiliSek1 += (parseInt(s[0]) * 60);
      s = this.opetRezultat2.split(':');
      rezMiliSek2 = parseInt(s[2]);
      rezMiliSek2 += (parseInt(s[1]) * 60);
      rezMiliSek2 += (parseInt(s[0]) * 60);
      if (rezMiliSek1 < rezMiliSek2) {
        if (this.koji == 12) {
          this.id1 = this.opetId[0]
          this.id2 = this.opetId[1]
        } else {
          this.id2 = this.opetId[0]
          this.id3 = this.opetId[1]
        }
      } else {
        if (this.koji == 12) {
          this.id1 = this.opetId[1]
          this.id2 = this.opetId[0]
        } else {
          this.id2 = this.opetId[1]
          this.id3 = this.opetId[0]
        }
      }
    } else if (this.format === 'trostav') {
      let rezMiliSek1: number;
      let rezMiliSek2: number;
      rezMiliSek1 = parseInt(this.opetRezultat1);
      rezMiliSek2 = parseInt(this.opetRezultat1);
      if (rezMiliSek1 > rezMiliSek2) {
        if (this.koji == 12) {
          this.id1 = this.opetId[0]
          this.id2 = this.opetId[1]
        } else {
          this.id2 = this.opetId[0]
          this.id3 = this.opetId[1]
        }
      } else {
        if (this.koji == 12) {
          this.id1 = this.opetId[1]
          this.id2 = this.opetId[0]
        } else {
          this.id2 = this.opetId[1]
          this.id3 = this.opetId[0]
        }
      }
    }
    this.opet = false;
    this.dodajMedalje();
  }

  azurirajSportiste() {
    let ekipe: Sportista[] = []
    let parovi: Array<Array<Sportista>> = []
    let paroviDubl: Array<Array<Array<Sportista>>> = []
    this.delegatService.dohvatiSveSportisteService().subscribe((res: Sportista[]) => {
      res.forEach(element1 => {
        this.takmicenje.takmicari.forEach(element2 => {
          if (element1.idSportiste == element2) ekipe.push(element1);
        });
      })
    });

    let nivo = 1;
    let len = 0;
    if (this.poslednjiNivo === 'cetvrtfinale') {
      nivo = 1;
      len = 4;
    } else if (this.poslednjiNivo === 'polufinale') {
      nivo = 2;
      len = 2;
    } else if (this.poslednjiNivo === 'trece mesto') {
      nivo = 3;
      len = 1
    } else {
      nivo = 3;
      len = 1;
    }
    let grupa1: Sportista[] = []
    let grupa2: Sportista[] = []
    if (nivo == 1 && this.sport !== 'Tenis') {

      this.delegatService.dohvatiGrupeService().subscribe((res: Grupa[]) => {
        res.forEach(element => {
          if (element.nivo == 1 && element.grupa == 1) grupa1 = JSON.parse(element.niz)
          if (element.nivo == 1 && element.grupa == 2) grupa2 = JSON.parse(element.niz)
        });
      })
      console.log(grupa1[0].ime);
      console.log(grupa2[0].ime);

      grupa1.forEach(e => {
        e.bodovi = 0;
        e.rang = 0;
      })
      grupa2.forEach(e => {
        e.bodovi = 0;
        e.rang = 0;
      })
      this.delegatService.dohvatiRezultateZaNivoService(this.takmicenje.id, nivo).subscribe((res: Rezultat[]) => {

        grupa1.forEach(ekipa => {
          res.forEach(rez => {
            if (ekipa.idSportiste == rez.idSportiste) {
              ekipa.rang += rez.rang;
              ekipa.bodovi += parseInt(rez.rezultat);
            }
          });
        });
        grupa2.forEach(ekipa => {
          res.forEach(rez => {
            if (ekipa.idSportiste == rez.idSportiste) {
              ekipa.rang += rez.rang;
              ekipa.bodovi += parseInt(rez.rezultat);
            }
          });
        });
        grupa1.sort((a: Sportista, b: Sportista) => {
          if (a.rang > b.rang) {
            return 1;
          }

          if (a.rang < b.rang) {
            return -1;
          }
          if (a.rang == b.rang) {
            if (a.bodovi > b.bodovi) {
              return 1;
            }

            if (a.bodovi < b.bodovi) {
              return -1;
            }
            return 0;
          }
        })
        grupa2.sort((a: Sportista, b: Sportista) => {
          if (a.rang > b.rang) {
            return 1;
          }

          if (a.rang < b.rang) {
            return -1;
          }
          if (a.rang == b.rang) {
            if (a.bodovi > b.bodovi) {
              return 1;
            }

            if (a.bodovi < b.bodovi) {
              return -1;
            }
            return 0;
          }
        })
        while (grupa1.length > len) {
          grupa1.pop();
          grupa2.pop();
        }
        let par: Array<Sportista> = [];
        parovi = [];
        par.push(grupa1[0]);
        par.push(grupa2[3]);
        this.mecevi[0].sportisti.push(par[0].idSportiste);
        this.mecevi[0].sportisti.push(par[1].idSportiste);
        this.mecevi[0].imenaSportista.push(par[0].ime);
        this.mecevi[0].imenaSportista.push(par[1].ime);
        parovi.push(par);
        par = [];
        par.push(grupa1[2]);
        par.push(grupa2[1]);
        this.mecevi[1].sportisti.push(par[0].idSportiste);
        this.mecevi[1].sportisti.push(par[1].idSportiste);
        this.mecevi[1].imenaSportista.push(par[0].ime);
        this.mecevi[1].imenaSportista.push(par[1].ime);
        parovi.push(par);
        par = [];
        par.push(grupa1[3]);
        par.push(grupa2[0]);
        this.mecevi[2].sportisti.push(par[0].idSportiste);
        this.mecevi[2].sportisti.push(par[1].idSportiste);
        this.mecevi[2].imenaSportista.push(par[0].ime);
        this.mecevi[2].imenaSportista.push(par[1].ime);
        parovi.push(par);
        par = [];
        par.push(grupa1[1]);
        par.push(grupa2[2]);
        this.mecevi[3].sportisti.push(par[0].idSportiste);
        this.mecevi[3].sportisti.push(par[1].idSportiste);
        this.mecevi[3].imenaSportista.push(par[0].ime);
        this.mecevi[3].imenaSportista.push(par[1].ime);
        parovi.push(par);
        this.delegatService.dodajGrupuService(JSON.stringify(parovi), 0, this.nivo, this.takmicenje.id).subscribe(res => console.log(res['poruka']))

      })

    } else {
      if (this.disciplina !== 'Dubl') {
        this.delegatService.dohvatiGrupeService().subscribe((res: Grupa[]) => {
          res.forEach(e => {
            if (e.nivo == nivo && e.idTakmicenja == this.takmicenje.id) {
              JSON.parse(e.niz).forEach(element => {
                parovi.push(element);
              });
            }
          });

          parovi.forEach(e => {
            e[0].bodovi = 0;
            e[0].rang = 0;

            e[1].bodovi = 0;
            e[1].rang = 0;
          })
          this.delegatService.dohvatiRezultateZaNivoService(this.takmicenje.id, nivo).subscribe((res: Rezultat[]) => {
            parovi.forEach(par => {
              res.forEach(rez => {
                if (par[0].idSportiste == rez.idSportiste) {
                  par[0].rang += rez.rang;
                  par[0].bodovi += parseInt(rez.rezultat);
                }
                if (par[1].idSportiste == rez.idSportiste) {
                  par[1].rang += rez.rang;
                  par[1].bodovi += parseInt(rez.rezultat);
                }
              });
            });

            let pomocniParovi: Array<Array<Sportista>> = [];
            let par: Array<Sportista> = [];
            if (this.poslednjiNivo !== 'trece mesto') {
              for (let i = 0; i < parovi.length; i++) {
                if (parovi[i][0].rang > parovi[i][1].rang) par.push(parovi[i][0]);
                else if (parovi[i][0].rang < parovi[i][1].rang) par.push(parovi[i][1]);
                else {
                  if (parovi[i][0].bodovi > parovi[i][1].bodovi) par.push(parovi[i][0]);
                  else par.push(parovi[i][1])
                }

                if (par.length == 2) {
                  this.mecevi[Math.floor(i / 2)].sportisti.push(par[0].idSportiste);
                  this.mecevi[Math.floor(i / 2)].sportisti.push(par[1].idSportiste);
                  this.mecevi[Math.floor(i / 2)].imenaSportista.push(par[0].ime);
                  this.mecevi[Math.floor(i / 2)].imenaSportista.push(par[1].ime);
                  pomocniParovi.push(par);
                  par = [];
                }
              }
            } else {
              for (let i = 0; i < parovi.length; i++) {
                if (parovi[i][0].rang < parovi[i][1].rang) par.push(parovi[i][0]);
                else if (parovi[i][0].rang > parovi[i][1].rang) par.push(parovi[i][1]);
                else {
                  if (parovi[i][0].bodovi < parovi[i][1].bodovi) par.push(parovi[i][0]);
                  else par.push(parovi[i][1])
                }
                if (par.length == 2) {
                  this.mecevi[Math.floor(i / 2)].sportisti.push(par[0].idSportiste);
                  this.mecevi[Math.floor(i / 2)].sportisti.push(par[1].idSportiste);
                  this.mecevi[Math.floor(i / 2)].imenaSportista.push(par[0].ime);
                  this.mecevi[Math.floor(i / 2)].imenaSportista.push(par[1].ime);
                  pomocniParovi.push(par);
                  par = [];
                }
              }
            }
            parovi = pomocniParovi;
            this.delegatService.dodajGrupuService(JSON.stringify(parovi), 0, this.nivo, this.takmicenje.id).subscribe(res => console.log(res['poruka']))
          })
        })
      } else {
        this.delegatService.dohvatiGrupeService().subscribe((res: Grupa[]) => {
          res.forEach(e => {
            if (e.nivo == nivo && e.idTakmicenja == this.takmicenje.id) {
              JSON.parse(e.niz).forEach(element => {
                paroviDubl.push(element);
              });
            }
          });

          paroviDubl.forEach(e => {
            e[0][0].bodovi = 0;
            e[0][0].rang = 0;

            e[1][0].bodovi = 0;
            e[1][1].rang = 0;
          })
          this.delegatService.dohvatiRezultateZaNivoService(this.takmicenje.id, nivo).subscribe((res: Rezultat[]) => {
            paroviDubl.forEach(par => {
              res.forEach(rez => {
                if (par[0][0].idSportiste == rez.idSportiste) {
                  par[0][0].rang += rez.rang;
                  par[0][0].bodovi += parseInt(rez.rezultat);
                }
                if (par[1][0].idSportiste == rez.idSportiste) {
                  par[1][0].rang += rez.rang;
                  par[1][0].bodovi += parseInt(rez.rezultat);
                }
              });
            });
          });

          let pomocniParovi: Array<Array<Sportista[]>> = [];
          let parDubl: Array<Array<Sportista>> = [];
          if (this.poslednjiNivo !== 'trece mesto') {
            for (let i = 0; i < paroviDubl.length; i++) {
              if (paroviDubl[i][0][0].rang > paroviDubl[i][1][0].rang) parDubl.push(paroviDubl[i][0]);
              else if (paroviDubl[i][0][0].rang < paroviDubl[i][1][0].rang) parDubl.push(paroviDubl[i][1]);
              else {
                if (paroviDubl[i][0][0].bodovi > paroviDubl[i][1][0].bodovi) parDubl.push(paroviDubl[i][0]);
                else parDubl.push(paroviDubl[i][1])
              }

              if (parDubl.length == 2) {
                this.mecevi[Math.floor(i / 2)].sportisti.push(parDubl[0][0].idSportiste);
                this.mecevi[Math.floor(i / 2)].sportisti.push(parDubl[0][1].idSportiste);
                this.mecevi[Math.floor(i / 2)].sportisti.push(parDubl[1][0].idSportiste);
                this.mecevi[Math.floor(i / 2)].sportisti.push(parDubl[1][1].idSportiste);
                this.mecevi[Math.floor(i / 2)].imenaSportista.push(parDubl[0][0].ime);
                this.mecevi[Math.floor(i / 2)].imenaSportista.push(parDubl[0][1].ime);
                this.mecevi[Math.floor(i / 2)].imenaSportista.push(parDubl[1][0].ime);
                this.mecevi[Math.floor(i / 2)].imenaSportista.push(parDubl[1][1].ime);
                pomocniParovi.push(parDubl);
                parDubl = [];
              }
            }
          } else {
            for (let i = 0; i < paroviDubl.length; i++) {
              if (paroviDubl[i][0][0].rang < paroviDubl[i][1][0].rang) parDubl.push(paroviDubl[i][0]);
              else if (paroviDubl[i][0][0].rang > paroviDubl[i][1][0].rang) parDubl.push(paroviDubl[i][1]);
              else {
                if (paroviDubl[i][0][0].bodovi < paroviDubl[i][1][0].bodovi) parDubl.push(paroviDubl[i][0]);
                else parDubl.push(paroviDubl[i][1])
              }

              if (parDubl.length == 2) {
                this.mecevi[Math.floor(i / 2)].sportisti.push(parDubl[0][0].idSportiste);
                this.mecevi[Math.floor(i / 2)].sportisti.push(parDubl[0][1].idSportiste);
                this.mecevi[Math.floor(i / 2)].sportisti.push(parDubl[1][0].idSportiste);
                this.mecevi[Math.floor(i / 2)].sportisti.push(parDubl[1][1].idSportiste);
                this.mecevi[Math.floor(i / 2)].imenaSportista.push(parDubl[0][0].ime);
                this.mecevi[Math.floor(i / 2)].imenaSportista.push(parDubl[0][1].ime);
                this.mecevi[Math.floor(i / 2)].imenaSportista.push(parDubl[1][0].ime);
                this.mecevi[Math.floor(i / 2)].imenaSportista.push(parDubl[1][1].ime);
                pomocniParovi.push(parDubl);
                parDubl = [];
              }
            }
          }
          paroviDubl = pomocniParovi;
          this.delegatService.dodajGrupuService(JSON.stringify(paroviDubl), 0, this.nivo, this.takmicenje.id).subscribe(res => console.log(res['poruka']))
        })
      }
    }
  }

  format: string = '';
  brojKrugova: number = 0;
  krug: number = 0;
  maxKrug: number = 0;
  porukaFormat: string = '';
  individ = false;

  individTakmicenje() {
    this.individ = true;
    this.format = '';
    this.brojKrugova = 0;

    if (this.disciplina === '100 m trcanje' || this.disciplina === '200 m trcanje' || this.disciplina === '400 m trcanje' || this.disciplina === '100m leptir' || this.disciplina === '200m slobodno') {
      this.format = 'atletika 100m';
      this.porukaFormat = 'SS,TT'
    }
    else if (this.disciplina === '800 m trcanje' || this.disciplina === '5000 m trcanje' || this.disciplina === '10000 m trcanje') {
      this.format = 'atletika 800m';
      this.porukaFormat = 'MM:SS,TT'
    }
    else if (this.disciplina === 'skok u vis' || this.disciplina === 'skok u dalj' || this.disciplina === 'troskok' || this.disciplina === 'skok s motkom') {
      this.format = 'skok';
      this.brojKrugova = 3
      this.porukaFormat = 'M:CM'
    }
    else if (this.disciplina === 'bacanje kugle' || this.disciplina === 'bacanje diska' || this.disciplina === 'bacanje kladiva' || this.disciplina === 'bacanje koplja') {
      this.format = 'bacanje';
      this.brojKrugova = 3;
      this.porukaFormat = 'MM:CM'
    }
    else if (this.disciplina === 'maraton' || this.disciplina === '20km brzo hodanje' || this.disciplina === '50km brzo hodanje' || this.disciplina === 'drumska trka 225km') {
      this.format = 'maraton'
      this.porukaFormat = 'CC:MM:SS'
    }
    else if (this.disciplina === '50m trostav' || this.disciplina === '10m vazdusna puska' || this.disciplina === '25m malokalibarski pistolj' || this.disciplina === '10m vazdusni pistolj') {
      this.format = 'trostav'
      this.brojKrugova = 6;
    }

    if (this.brojKrugova == 0) {
      this.krug = 0
      if (this.mojiRezultati.length) {
        this.zavrsi = true;
        this.individ = false;
        this.poruka = 'Za ovo takmicenje su vec uneti svi rezultati!';
        return;
      }
      this.krug++;
    } else {
      console.log('ovde');
      for (let i = 0; i < this.takmicenje.takmicari.length; i++) {
        this.rezultatiKrugova[i] = [];
      }
      this.krug = 0
      if (this.mojiRezultati.length)
        this.mojiRezultati.forEach(element => {
          if (element.nivo > this.krug) this.krug = element.nivo;
        });
      if (this.krug == this.brojKrugova) {
        this.zavrsi = true;
        return;
      }
      this.krug++;
    }

  }

  cntRez = 0;
  rezultatIndivid: string[] = [];
  rezultatiKrugova: string[][] = [];
  rezultatMaks: string[] = [];

  unesiRezultatIndivid(i) {
    let tak = this.mojRaspored[0];
    this.cntRez++;
    if (this.brojKrugova) {
      if (this.krug <= this.brojKrugova && this.cntRez <= this.takmicenje.takmicari.length)
        this.rezultatiKrugova[i].push(this.rezultatIndivid[i]);
      if (this.krug < this.brojKrugova || (this.krug == this.brojKrugova && this.cntRez < this.takmicenje.takmicari.length)) {
        if (this.cntRez == this.takmicenje.takmicari.length) {
          this.krug++;
          this.rezultatIndivid = [];
          this.cntRez = 0;
        }
      } else {
        for (let i = 0; i < this.rezultatiKrugova.length; i++) {
          const e = this.rezultatiKrugova[i];
          if (this.format === 'skok' || this.format === 'bacanje') {
            let rezCMetri: number[] = [];
            let s: string[] = [];
            let maksRes: string;
            let maks: number = 0;
            for (let j = 0; j < e.length; j++) {
              const rez = e[j];
              s = rez.split(':');
              rezCMetri[j] = parseInt(s[1]);
              rezCMetri[j] += (parseInt(s[0]) * 100);
              if (rezCMetri[j] > maks) {
                maks = rezCMetri[j];
                maksRes = rez;
              }
            }
            this.delegatService.dodajRezultatService(tak.sportisti[i], this.takmicenje.id, maksRes, 0, 5, this.krug).subscribe(res => {
              console.log(res['poruka']);
            });
          }
          if (this.format === 'trostav') {
            let rezCMetri: number[] = [];
            let maksRes: string;
            let maks: number = 0;
            for (let j = 0; j < e.length; j++) {
              const rez = e[j];
              rezCMetri[j] = parseInt(rez);
              if (rezCMetri[j] > maks) {
                maks = rezCMetri[j];
                maksRes = rez;
              }
            }
            this.delegatService.dodajRezultatService(tak.sportisti[i], this.takmicenje.id, maksRes, 0, 5, this.krug).subscribe(res => {
              console.log(res['poruka']);
            });
          }
        }
        this.rezultatIndivid = [];
        this.cntRez = 0;
        this.zavrsi = true;
        this.individ = false;
      }
    } else {
      this.delegatService.dodajRezultatService(tak.sportisti[i], this.takmicenje.id, this.rezultatIndivid[i], 0, 5, this.krug).subscribe(res => {
        console.log(res['poruka']);
      });
      this.rezultatIndivid[i] = '';
      if (this.cntRez == this.takmicenje.takmicari.length) {
        this.rezultatIndivid = [];
        this.cntRez = 0;
        this.zavrsi = true;
        this.individ = false;
      }
    }
    this.rezultatIndivid[i] = '';
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  odjaviSe() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  promenaLozinke() {
    localStorage.clear();
    this.router.navigate(['/promenaLozinke']);
  }

}


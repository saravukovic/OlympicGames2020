import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Rekord } from '../models/rekord';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { ZahtevZaReg } from '../models/zahtevZaReg';
import { OrganizatorService } from '../organizator.service';
import { SportistaService } from '../sportista.service';
import { VodjaService } from '../vodja.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private organizatorService: OrganizatorService, private korisnikService: KorisnikService, private sportistaService: SportistaService, private router: Router, private vodjaService: VodjaService) { }

  ngOnInit(): void {
    this.sportovi = [];
    this.lokacije = [];
    this.korisnikService.dohvatanjeSportovaService().subscribe((res: Sport[]) => {
      res.forEach(element => {
        if (!this.sportovi.includes(element.sport)) this.sportovi.push(element.sport);
      });
    })

    this.sportistaService.dohvatiSportisteService().subscribe((res: Sportista[]) => {
      res.forEach(element => {
        if (element.vrsta === "sportista") this.sviTakmicari1.push(element);
        else this.sveEkipe1.push(element);
      });
      this.sviTakmicari = [...this.sviTakmicari1];
      this.sveEkipe = [...this.sveEkipe1];
    })

    this.organizatorService.dohvatiSvaTakmicenja().subscribe((res: Takmicenje[]) => {
      this.svaTakmicenja = res
    })

    this.korisnikService.dohvatanjeDelegataService().subscribe((res: Korisnik[]) => {
      this.delegati = res;
      this.delegati.forEach(d => {
        d.nadgleda = 0;
      })
    })

    this.svaTakmicenja.forEach(t => {
      for (let i = 0; i < this.delegati.length;) {
        let s = this.delegati[i];
        if (t.delegati.includes(s.korIme)) {
          s.nadgleda++;
          if (s.nadgleda == 3) { this.delegati.splice(i, 1); continue; }
        }
        i++;
      }
    })

    this.organizatorService.dohvatiRekordeService().subscribe((res: Rekord[]) => {
      this.rekordi = res;
    })

    this.organizatorService.dohvatiZahteveZaReg().subscribe((res: ZahtevZaReg[]) => {
      this.zahteviZaReg = res
    })
  }

  svaTakmicenja: Takmicenje[] = []

  sviTakmicari1: Sportista[] = [];
  sveEkipe1: Sportista[] = [];

  sportovi: string[] = [];
  discipline: string[] = [];
  sportIDiscipline: Sport[] = [];
  sviTakmicari: Sportista[] = [];
  sveEkipe: Sportista[] = [];
  delegati: Korisnik[] = [];
  zahteviZaReg: ZahtevZaReg[] = [];

  porukaZahtev: string = ''

  onChange() {
    this.discipline = [];
    this.korisnikService.dohvatanjeSportovaService().subscribe((res: Sport[]) => {
      res.forEach(element => {
        if (element.sport === this.sportT && element.disciplina != '') this.discipline.push(element.disciplina);
      });
    })
  }

  sport: string;
  disciplina: string;
  vrsta: string;
  min: number;
  max: number;

  sviSportovi: Sport[] = [];
  porukaDuplikat: string = '';

  dodajSport() {
    this.porukaDuplikat = '';
    let flag1 = false;
    this.vodjaService.dohvatiSveSportoveService().subscribe((res: Sport[]) => {
      for (let i = 0; i < res.length; i++) {
        const e = res[i];
        if (e.sport == this.sport && e.disciplina == this.disciplina) {
          flag1 = true;
          this.porukaDuplikat = 'Sport i disciplina su vec uneti'
          break
        }
      }
      if (!flag1) {
        if (this.vrsta === 'individualni') this.min = this.max = 1;
        this.organizatorService.dodajSportService(this.sport, this.disciplina, this.vrsta, this.min, this.max).subscribe((res) => {
          if (res['poruka'] == 'sport dodat') alert('dodat');
        })
      }
      this.sport = '';
      this.disciplina = '';
      this.vrsta = '';
    })
  }

  dodajLokaciju() {
    this.lokacije.push(this.lokacija);
    this.lokacija = '';
  }

  sportT: string = '';
  disciplinaT: string = '';
  pol: string = '';
  format: string = '';
  datumPocetka: Date;
  datumKraja: Date;
  lokacije: Array<string>;
  lokacija: string = '';
  vrstaT: string = '';
  delegatiT: Array<string>;
  takmicari: number[] = [];

  prikaziTakmicare = false;

  rekordi: Rekord[] = [];

  porukaBrojNosioca = '';


  updateSportiste() {
    this.nosiociTakmicenja = [];
    this.sviTakmicari = [...this.sviTakmicari1];
    this.sveEkipe = [...this.sveEkipe1];
    if (this.vrstaT === 'individualni') {
      for (let i = 0; i < this.sviTakmicari.length;) {
        let s = this.sviTakmicari[i];
        if (this.sportT != "") {
          if (this.sportT != s.sport) { this.sviTakmicari.splice(i, 1); continue; }
        }
        let cnt = 0;
        if (this.disciplinaT != "") {
          s.discipline.forEach(sp => {
            if (sp === this.disciplinaT) cnt++;
          })
          if (cnt == 0) { this.sviTakmicari.splice(i, 1); continue }
        }
        if (this.pol != "") {
          if (this.pol != s.pol) { this.sviTakmicari.splice(i, 1); continue; }
        }
        i++;
      }
    }
    else {
      for (let i = 0; i < this.sveEkipe.length;) {
        let s = this.sveEkipe[i];
        if (this.sportT != "") {
          if (this.sportT != s.sport) {
            this.sveEkipe.splice(i, 1); continue;
          }
        }
        let cnt = 0;
        if (this.disciplinaT != "") {
          console.log(this.disciplinaT);
          s.discipline.forEach(sp => {
            if (sp === this.disciplinaT) cnt++;
          })
          if (cnt == 0) { this.sveEkipe.splice(i, 1); continue }
        }
        if (this.pol != "") {
          if (this.pol != s.pol) { this.sveEkipe.splice(i, 1); continue; }
        }
        i++;
      }
    }
  }

  nosiociTakmicenja: number[] = [];
  unesiNosioce = false;

  dodajTakmicenje() {
    this.porukaDuplikat = '';
    let flag1 = false;
    this.organizatorService.dohvatiSvaTakmicenja().subscribe((res: Takmicenje[]) => {
      for (let i = 0; i < res.length; i++) {
        const e = res[i];
        if (e.sport == this.sportT && e.disciplina == this.disciplinaT && e.pol == this.pol) {
          flag1 = true;
          this.porukaDuplikat = 'Takmicenje je vec uneto'
          break
        }
      }
      if (!flag1) {
        this.organizatorService.dodajTakmicenjeService(this.sportT, this.disciplinaT, this.pol, this.format, this.datumPocetka, this.datumKraja, this.lokacije, this.vrstaT, this.takmicari, this.delegatiT).subscribe(res => {
          if (res['poruka'] == 'takmicenje dodato') alert('dodato takmicenje');
        })
        this.nosiociTakmicenja.forEach(e => {
          this.organizatorService.postaviZaNosiocaService(e).subscribe();
        })
      }
      this.takmicari = [];
      this.prikaziTakmicare = false;
      this.sportT = '';
      this.disciplinaT = '';
      this.pol = '';
      this.format = '';
      this.datumPocetka = null;
      this.datumKraja = null;
      this.lokacije = [];
      this.lokacija = '';
      this.vrstaT = '';
      this.nosiociTakmicenja = [];

    })
  }

  odobriZahtev(z: ZahtevZaReg) {
    if (z.tip == 'vodja')
      this.korisnikService.dohvatanjeKorisnikaService().subscribe((res: Korisnik[]) => {
        let flag = false;
        for (let i = 0; i < res.length; i++) {
          const e = res[i];
          if (e.tip == 'vodja' && e.nacionalnost == z.nacionalnost) {
            flag = true;
            this.porukaZahtev = 'Zahtev je odbijen jer za zemlju vec postoji vodja'
            break
          }
        }
        if (!flag) {
          this.organizatorService.odobriRegistraciju(z).subscribe(res => console.log(res['poruka']));
        }
      })
    else {
      this.organizatorService.odobriRegistraciju(z).subscribe(res => console.log(res['poruka']));
    }
    this.odbijZahtev(z);
  }

  odbijZahtev(z: ZahtevZaReg) {
    this.organizatorService.ukloniZahtevZaRegistraciju(z.id).subscribe(res => console.log(res['poruka']));
    this.zahteviZaReg.splice(this.zahteviZaReg.indexOf(z), 1);
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

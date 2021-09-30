import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { VodjaService } from '../vodja.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private vodjaService: VodjaService, private router:Router) { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem('ulogovan');
    this.vodjaService.dohvatiSveSportoveService().subscribe((res: Sport[]) => {
      res.forEach(element => {
        if (!this.sportovi.includes(element.sport)) this.sportovi.push(element.sport);
      });
      this.sportoviIDiscipline = res;
    })
    this.vodjaService.dohvatiKorisnikaService(this.ulogovan).subscribe((res: Korisnik) => {
      this.vodja = res;
    })
    this.vodjaService.dohvatiSveSportoveService().subscribe((res: Sport[]) => {
      this.sviSportovi = res;
    })
    this.vodjaService.dohvatiMojeSportisteService(this.ulogovan).subscribe((res: Sportista[]) => {
      this.mojiSportisti = res;
    })
  }

  ime: string;
  prezime: string;
  pol: string;
  sport: string;
  disciplina: string = '';
  sportovi: string[] = [];
  discipline: string[] = [];
  takmicenje: Takmicenje;
  ulogovan: string;
  poruka: string = '';
  sportoviIDiscipline: Sport[] = [];
  izabraniSport: Sport;
  ekipa: Sportista;
  ekipni: boolean = false;
  vodja: Korisnik;
  mojiSportisti: Sportista[] = [];

  onChange() {
    this.discipline = [];
    this.vodjaService.dohvatiSveSportoveService().subscribe((res: Sport[]) => {
      res.forEach(element => {
        if (element.sport === this.sport && element.disciplina != '') this.discipline.push(element.disciplina);
      });
    })
  }


  unesi() {
    let t = false;
    this.poruka = '';
    this.vodjaService.dohvatiTakmicenjeService(this.sport, this.disciplina, this.pol).subscribe((res: Takmicenje) => {
      if (res) {
        this.poruka = 'Takmicenje za ovaj sport, disciplinu i pol je vec formirano, s toga ne mozete vise unositi takmicare.';
        t = true;
        return;
      }
      else {
        this.vodjaService.dohvatiSportisteService().subscribe((res: Sportista[]) => {
          let flag1 = false
          for (let i = 0; i < res.length; i++) {
            const e = res[i];
            if (e.vrsta == 'ekipa') {
              let imeIPrezime = this.ime;
              imeIPrezime += ' ';
              imeIPrezime += this.prezime
              if (e.clanoviEkipe.includes(imeIPrezime) && e.zemlja == this.vodja.nacionalnost && e.sport != this.sport) {
                this.poruka = 'Takmicar se moze takmiciti u samo jednom sportu, ali u vise disciplina!';
                flag1 = true;
              }
            } else {
              if (e.ime == this.ime && e.prezime == this.prezime && e.zemlja == this.vodja.nacionalnost && this.sport != e.sport) {
                this.poruka = 'Takmicar se moze takmiciti u samo jednom sportu, ali u vise disciplina!';
                flag1 = true;
              }
            }
          }
          if (!flag1) {
            this.ekipni = false;
            for (let i = 0; i < this.sportoviIDiscipline.length; i++) {
              const e = this.sportoviIDiscipline[i];
              if (e.sport == this.sport) {
                if (e.vrsta == 'ekipni') {
                  this.ekipni = true;
                  this.izabraniSport = e;
                  break;
                }
                else if (this.disciplina == e.disciplina) {
                  this.izabraniSport = e;
                  break;
                }
              }
            }
            if (this.ekipni) {
              let flag2 = false;
              this.ekipa = null;
              this.vodjaService.dohvatiEkipeService(this.ulogovan).subscribe((res: Sportista[]) => {
                for (let i = 0; i < res.length; i++) {
                  const element = res[i];
                  if (element.sport === this.sport && element.pol === this.pol) {
                    this.ekipa = element;
                    break
                  }
                }
                if (this.ekipa) {
                  let imeIprezime = this.ime;
                  imeIprezime += ' ';
                  imeIprezime += this.prezime
                  if (this.ekipa.clanoviEkipe.length == this.izabraniSport.max) {
                    this.poruka = 'Za ovaj sport i disciplinu je unet maksimalan broj clanova ekipe.'
                    flag2 = true;
                  } else if (this.ekipa.clanoviEkipe.includes(imeIprezime)) {
                    this.poruka = 'Takmicar je vec dodat!'
                    flag2 = true;
                  }
                  if (!flag2) {
                    this.vodjaService.dodajSportistuUEkipuService(this.ekipa.idSportiste, imeIprezime).subscribe(res => console.log(res['poruka']));
                  }
                } else {
                  let imeIprezimeNiz: string[] = [];
                  let imeIprezime = this.ime;
                  imeIprezime += ' ';
                  imeIprezime += this.prezime
                  imeIprezimeNiz.push(imeIprezime);
                  this.vodjaService.dodajSportistuService(this.ulogovan, this.sport, this.disciplina, this.vodja.nacionalnost, '', this.pol, this.vodja.nacionalnost, 0, 'ekipa', imeIprezimeNiz, false).subscribe(res => console.log(res['poruka']))
                }
              })
            } else {
              let dodat = false;
              this.vodjaService.dohvatiSportisteService().subscribe((res: Sportista[]) => {
                for (let i = 0; i < res.length; i++) {
                  const e = res[i];
                  if (e.vrsta != 'ekipa') {
                    if (e.ime == this.ime && e.prezime == this.prezime && e.zemlja == this.vodja.nacionalnost && this.sport == e.sport && e.discipline.includes(this.disciplina)) {
                      this.poruka = 'Takmicar je vec dodat!';
                      dodat = true;
                    } else if (e.ime == this.ime && e.prezime == this.prezime && e.zemlja == this.vodja.nacionalnost && this.sport == e.sport) {
                      this.vodjaService.dodajDisciplinuSportistiService(e.idSportiste, this.disciplina).subscribe(res => console.log(res['poruka']))
                      dodat = true;
                    }
                  }
                }
                if (!dodat) {
                  let d: string[] = [];
                  d.push(this.disciplina);
                  this.vodjaService.dodajSportistuService(this.vodja.korIme, this.sport, d, this.ime, this.prezime, this.pol, this.vodja.nacionalnost, 0, 'sportista', [], false).subscribe(res => console.log(res['poruka']));
                }
              })
            }
          }
        })
      }
    })
  }

  sviSportovi: Sport[] = [];
  uracunatiSportisti: Sportista[] = [];
  sportoviPrikaz: string[] = [];
  disciplinePrikaz: string[] = [];
  sportistiZaPrikaz: Sportista[] = [];
  brojSportista: number[] = [];

  sportZaPrikaz: string = '';
  disciplinaZaPrikaz: string = '';

  pS:boolean = false;
  pD:boolean = false;
  pSS:boolean = false;

  prikaziSportove() {
    this.sportZaPrikaz = ''
    this.disciplinaZaPrikaz = ''
    this.pS = true;
    this.pD = false;
    this.pSS = false;
    this.sportoviPrikaz = [];
    this.brojSportista = [];
    this.uracunatiSportisti = [];
    this.mojiSportisti.forEach(s => {
      if (!this.sportoviPrikaz.includes(s.sport)) {
        this.sportoviPrikaz.push(s.sport);
        this.brojSportista[this.sportoviPrikaz.indexOf(s.sport)] = 0;
      }
      if (!this.uracunatiSportisti.includes(s)) {
        this.uracunatiSportisti.push(s);
        this.brojSportista[this.sportoviPrikaz.indexOf(s.sport)]++;
      }
    })
  }

  prikaziDiscipline(s:string) {
    this.sportZaPrikaz = s;
    this.pS = false;
    this.pSS = false;
    this.pD = true;
    this.disciplinePrikaz = [];
    this.sviSportovi.forEach(element => {
      if (element.sport === this.sportZaPrikaz && element.disciplina != '') this.disciplinePrikaz.push(element.disciplina)
    });
  }
  
  prikaziSportiste(d:string){
    this.disciplinaZaPrikaz = d;
    this.pD = false;
    this.pSS = true;
    this.sportistiZaPrikaz = []
    this.mojiSportisti.forEach(s=>{
      if(s.sport==this.sportZaPrikaz && s.discipline.includes(this.disciplinaZaPrikaz)){
        this.sportistiZaPrikaz.push(s);
      }
    })
  }

  odjaviSe(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  promenaLozinke(){
    localStorage.clear();
    this.router.navigate(['/promenaLozinke']);
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

}

/*Такође, вођа националне делегације може видети укупан број чланова свог тима (спортиста)
на Олимпијади и преглед такмичара (спортиста) по спортовима - уз сваки назив спорта, за
који постоји неки пријављени спортиста, треба да пише број такмичара у том спорту
(рецимо регистровањем 3 тениска играча за Србију, вођа српске делегације треба да види у
листи спортова: ТЕНИС [3] ). Код прегледа треба реализовати и навигацију (енгл.
breadcrumbs) у два нивоа: назив_спорта > назив_спортске_дисциплине. Одабиром одређене
категорије спорта, добија се списак спортских дисциплина тог спорта, а одласком на
одређену спортску дисциплину, добија се листа свих спортиста, који учествују у тој
дисциплини (сортирано по презимену и имену спортисте). Водити рачуна да спортисте који
учествују у више дисциплина само једном бројите у укупном броју такмичара те земље. */
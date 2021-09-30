import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DelegatService } from '../delegat.service';
import { Grupa } from '../models/grupa';
import { Raspored } from '../models/raspored';
import { Rezultat } from '../models/rezultat';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private delegatService: DelegatService, private router: Router) { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem('ulogovan');
    this.delegatService.dohvatiMojaTakmicenjaService(this.ulogovan).subscribe((res: Takmicenje[]) => {
      this.takmicenja = res;
      this.takmicenja.forEach(element => {
        if (!this.sportovi.includes(element.sport)) this.sportovi.push(element.sport);
      });
    })
    this.delegatService.dohvatiSveSportisteService().subscribe((res: Sportista[]) => {
      this.sviSportisti = res
    })
    this.delegatService.dohvatiSveRezultateService().subscribe((res: Rezultat[]) => {
      this.sviRezultati = res
    })
    this.delegatService.dohvatiGrupeService().subscribe((res: Grupa[]) => {
      this.sveGrupe = res;
    })

  }

  sviRezultati: Rezultat[] = [];
  mojiRezultati: Rezultat[] = [];
  takmicenja: Takmicenje[] = [];
  sviSportisti: Sportista[] = []
  sveGrupe: Grupa[] = []

  ulogovan: string;

  ekipe: Sportista[];

  nivo: string;
  grupa: number;
  kolo: number;

  datumIVremePocetka: string;
  lokacija: string;

  grupa1: Sportista[] = [];
  grupa2: Sportista[] = [];
  parovi1: Array<Array<Sportista>> = [];
  parovi2: Array<Array<Sportista>> = [];

  parovi: Array<Array<Sportista>> = [];

  takmicenje: Takmicenje;
  prviNivo: string;
  zavrsenNivo: string = '';
  prikazi: boolean = false;
  individ: boolean = false;
  sport: string = '';
  disciplina: string = '';
  pol: string = '';
  porukaZavrsenoTakmicenje = '';

  zavrsenaGrupna: boolean = false;
  zavrsenoCetvrtfinale: boolean = false;
  zavrsenoPolufinale: boolean = false;
  unesiIOstale: boolean = false;

  unetoURaspored: string[] = [];

  cf: number[] = [1, 2, 3, 4]
  pf: number[] = [1, 2]


  sportovi: string[] = [];
  discipline: string[] = [];

  paroviSingl: Array<Array<Sportista>> = [];
  paroviDubl: Array<Array<Array<Sportista>>> = [];

  porukaRaspored = '';

  onChange() {
    this.discipline = [];
    this.takmicenja.forEach(element => {
      if (element.sport === this.sport && element.disciplina != '') this.discipline.push(element.disciplina);
    })
  }

  rasporediEkipePoGrupama() {
    this.ekipe = []
    this.mojiRezultati = [];
    for (let element of this.takmicenja) {
      if (element.sport === this.sport && element.disciplina === this.disciplina && element.pol === this.pol) {
        this.takmicenje = element;
        break;
      }
    }
    if (this.takmicenje.zavrseno) {
      this.prikazi = false;
      this.porukaZavrsenoTakmicenje = 'Takmicenje je zavrseno!';
      return;
    }
    if (this.sviRezultati.length)
      this.sviRezultati.forEach(e => {
        if (e.idTakmicenja == this.takmicenje.id) this.mojiRezultati.push(e)
      })

    this.sviSportisti.forEach(element1 => {
      this.takmicenje.takmicari.forEach(element2 => {
        if (element1.idSportiste == element2) this.ekipe.push(element1);
      });
    });
    if (this.takmicenje.vrsta === 'ekipni') {
      this.parovi1 = [];
      this.parovi2 = [];
      this.parovi = [];

      if (this.mojiRezultati.length != 0) {
        let maxNivo = 1;
        let poslednjeKolo = 1;
        if (this.mojiRezultati.length)
          this.mojiRezultati.forEach(element => {
            if (element.nivo > maxNivo) maxNivo = element.nivo;
            if (element.kolo > poslednjeKolo) poslednjeKolo = element.kolo;
          });
        if (maxNivo == 1) this.zavrsenNivo = 'grupna faza';
        else if (maxNivo == 2) this.zavrsenNivo = 'cetvrtfinale';
        else if (maxNivo == 3) this.zavrsenNivo = 'polufinale';
        else if (maxNivo == 4) this.zavrsenNivo = 'trece mesto';
        else if (maxNivo == 5) this.zavrsenNivo = 'finale';
        if (maxNivo != 1) poslednjeKolo = 0;
      }

      if (this.zavrsenNivo === '' && this.ekipe.length == 12) {
        this.prviNivo = 'grupna faza';
      } else if (this.zavrsenNivo === 'grupna faza' || (this.zavrsenNivo === '' && this.ekipe.length == 8)) {
        this.prviNivo = 'cetvrtfinale'
      } else if (this.zavrsenNivo === 'cetvrtfinale' || (this.zavrsenNivo === '' && this.ekipe.length == 4)) {
        this.prviNivo = 'polufinale';
      } else if (this.zavrsenNivo === 'polufinale' || (this.zavrsenNivo === '' && this.ekipe.length == 3)) {
        this.prviNivo = 'trece mesto';
      } else this.prviNivo = 'finale';
      if (this.zavrsenNivo === 'finale') {
        this.prikazi = false;
        this.porukaZavrsenoTakmicenje = "Za takmicenje je vec unet raspored za sve nivoe";
        return;
      }

      if (this.prviNivo !== 'grupna faza') this.updateEkipe();
      else {
        let curr = this.ekipe.length;
        let random;

        while (curr != 0) {
          random = Math.floor(Math.random() * curr);
          curr--;
          [this.ekipe[curr], this.ekipe[random]] = [this.ekipe[random], this.ekipe[curr]];
        }
        this.grupa1 = [];
        this.grupa2 = [];

        for (let index = 0; index < this.ekipe.length; index++) {
          const element = this.ekipe[index];
          if (index < this.ekipe.length / 2) this.grupa1.push(element);
          else this.grupa2.push(element);
        }

        this.delegatService.dodajGrupuService(JSON.stringify(this.grupa1), 1, 1, this.takmicenje.id).subscribe(res => console.log(res['poruka']));
        this.delegatService.dodajGrupuService(JSON.stringify(this.grupa2), 2, 1, this.takmicenje.id).subscribe(res => console.log(res['poruka']));

        let par: Array<Sportista>;
        for (let index = 0; index < this.grupa1.length - 1; index++) {
          for (let index2 = index + 1; index2 < this.grupa1.length; index2++) {
            par = [];
            par.push(this.grupa1[index]);
            par.push(this.grupa1[index2]);
            this.parovi1.push(par);

            par = [];
            par.push(this.grupa2[index]);
            par.push(this.grupa2[index2]);
            this.parovi2.push(par);
          }
        }
        let curr1 = this.parovi1.length;
        let random1;

        while (curr1 != 0) {
          random1 = Math.floor(Math.random() * curr1);
          curr1--;
          [this.parovi1[curr1], this.parovi1[random1]] = [this.parovi1[random1], this.parovi1[curr1]];
          [this.parovi2[curr1], this.parovi2[random1]] = [this.parovi2[random1], this.parovi2[curr1]];
        }
      }
      this.prikazi = true;
    } else if (this.sport === "Tenis" && this.disciplina === 'Singl') {
      let par1: Sportista[] = []
      let par2: Sportista[] = []
      this.parovi = [];

      let nosioci: Sportista[] = []
      let i = 1;
      let maxNivo = 1;

      if (this.mojiRezultati.length != 0) {
        this.mojiRezultati.forEach(element => {
          if (element.nivo > maxNivo) maxNivo = element.nivo;
        });
      }
      let len = this.ekipe.length;
      if (maxNivo == 1 && this.mojiRezultati.length == 0) {
        if (len == 8) maxNivo = 2;
        if (len == 4) maxNivo = 3;
        this.ekipe.forEach(e => {
          if (e.nosilac) nosioci.push(e);
        });
        if (len == 16) {
          par1[0] = nosioci[0];
          par2[0] = nosioci[2];
        } else {
          par1[0] = nosioci[0];
          par2[0] = nosioci[1];
        }
        this.ekipe.forEach(e => {
          if (!e.nosilac && par1.length < 7) {
            par1.push(e);
          }
        });
        this.ekipe.forEach(e => {
          if (!e.nosilac && !par1.includes(e) && par2.length < 8) {
            par2.push(e);
          }
        });
        if (len == 16) {
          par1[7] = nosioci[1];
          par2[7] = nosioci[3];
        }

        let par: Sportista[] = []
        for (let i = 0; i < par1.length - 1; i += 2) {
          par = [];
          par.push(par1[i]);
          par.push(par1[i + 1]);
          this.parovi.push(par);
        }
        for (let i = 0; i < par2.length - 1; i += 2) {
          par = [];
          par.push(par2[i]);
          par.push(par2[i + 1]);
          this.parovi.push(par);
        }
        switch (maxNivo) {
          case 1:
            this.prviNivo = 'osmina finala'
            break;
          case 2:
            this.prviNivo = 'cetvrtfinale'
            break;
          case 3:
            this.prviNivo = 'polufinale'
            break;
          default:
            break;
        }
        this.delegatService.dodajGrupuService(JSON.stringify(this.parovi), 0, maxNivo, this.takmicenje.id).subscribe(res => alert(res['poruka']));
      } else if (maxNivo == 5) {
        this.delegatService.zavrsiTakmicenjeService(this.takmicenje.id);
        this.prikazi = false;
        this.porukaZavrsenoTakmicenje = "Za takmicenje je vec unet raspored za sve nivoe";
        return;
      } else if (this.mojiRezultati.length != 0) {
        let n = maxNivo;
        if (maxNivo == 4) n = 3;
        this.sveGrupe.forEach(e => {
          if (e.nivo == n && e.idTakmicenja == this.takmicenje.id) {
            JSON.parse(e.niz).forEach(element => {
              this.parovi.push(element);
            });
          }
        })
        this.parovi.forEach(e => {
          e[0].bodovi = 0;
          e[0].rang = 0;

          e[1].bodovi = 0;
          e[1].rang = 0;
        })

        this.delegatService.dohvatiRezultateZaNivoService(this.takmicenje.id, n).subscribe((res: Rezultat[]) => {
          this.parovi.forEach(par => {
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
          if (maxNivo != 3) {
            for (let i = 0; i < this.parovi.length; i++) {
              if (this.parovi[i][0].rang > this.parovi[i][1].rang) par.push(this.parovi[i][0]);
              else if (this.parovi[i][0].rang < this.parovi[i][1].rang) par.push(this.parovi[i][1]);
              else {
                if (this.parovi[i][0].bodovi > this.parovi[i][1].bodovi) par.push(this.parovi[i][0]);
                else par.push(this.parovi[i][1])
              }
              if (par.length == 2) {
                pomocniParovi.push(par);
                par = [];
              }
            }
          } else {
            for (let i = 0; i < this.parovi.length; i++) {
              if (this.parovi[i][0].rang < this.parovi[i][1].rang) par.push(this.parovi[i][0]);
              else if (this.parovi[i][0].rang > this.parovi[i][1].rang) par.push(this.parovi[i][1]);
              else {
                if (this.parovi[i][0].bodovi < this.parovi[i][1].bodovi) par.push(this.parovi[i][0]);
                else par.push(this.parovi[i][1])
              }
              if (par.length == 2) {
                pomocniParovi.push(par);
                par = [];
              }
            }
          }
          this.parovi = pomocniParovi;
          switch (this.parovi.length) {
            case 8:
              this.prviNivo = 'osmina finala'
              break;
            case 4:
              this.prviNivo = 'cetvrtfinale'
              break;
            case 2:
              this.prviNivo = 'polufinale'
              break;
            case 1:
              if (maxNivo == 3) this.prviNivo = 'trece mesto'
              else (this.prviNivo = 'finale');
              break;
            default:
              break;
          }
          this.delegatService.dodajGrupuService(JSON.stringify(this.parovi), 0, maxNivo + 1, this.takmicenje.id).subscribe(res => console.log(res['poruka']))
        })
      }
      this.prikazi = true;
    } else if (this.sport === "Tenis" && this.disciplina === 'Dubl') {
      let par1Dubl: Sportista[][] = []
      let par2Dubl: Sportista[][] = []
      this.paroviDubl = [];

      let nosioci: Sportista[] = []
      let i = 1;
      let maxNivo = 1;

      if (this.mojiRezultati.length != 0) {
        this.mojiRezultati.forEach(element => {
          if (element.nivo > maxNivo) maxNivo = element.nivo;
        });
      }
      let len = this.ekipe.length;
      if (maxNivo == 1 && this.mojiRezultati.length == 0) {
        if (len == 16) maxNivo = 2;
        if (len == 8) maxNivo = 3;
        this.ekipe.forEach(e => {
          if (e.nosilac) nosioci.push(e);
        });
        if (len == 32) {
          par1Dubl[0][0] = nosioci[0];
          par1Dubl[0][0].dodat = true
          par2Dubl[0][0] = nosioci[2];
          par2Dubl[0][0].dodat = true
        } else {
          par1Dubl[0][0] = nosioci[0];
          par2Dubl[0][0] = nosioci[1];
          par1Dubl[0][0].dodat = true
          par2Dubl[0][0].dodat = true
        }
        this.ekipe.forEach(e => {
          for (let i = 0; i < 7; i++) { //dodati za nulu!!!!!!!!!!!!!!!!!!!!!!!!!!
            if (i == 0) {
              for (let j = 0; j < this.ekipe.length; j++) {
                if (!this.ekipe[j].nosilac && par1Dubl[i][0].zemlja === this.ekipe[j].zemlja && par1Dubl[i][0] != this.ekipe[j] && !this.ekipe[j].dodat) {
                  par1Dubl[i].push(e);
                  par1Dubl[i][1].dodat = true;
                  break;
                }
              }
            }
            if (i != 0 && !e.nosilac && !e.dodat) {
              par1Dubl[i].push(e);
              par1Dubl[i][0].dodat = true;
              for (let j = 0; j < this.ekipe.length; j++) {
                if (!this.ekipe[j].nosilac && par1Dubl[i][0].zemlja === this.ekipe[j].zemlja && par1Dubl[i][0] != this.ekipe[j] && !this.ekipe[j].dodat) {
                  par1Dubl[i].push(e);
                  par1Dubl[i][1].dodat = true;
                  break;
                }
              }
            }
          }
        });
        this.ekipe.forEach(e => {
          for (let i = 0; i < 7; i++) { //dodati za nulu!!!!!!!!!!!!!!!!!!!!!!!!!!
            if (i == 0) {
              for (let j = 0; j < this.ekipe.length; j++) {
                if (!this.ekipe[j].nosilac && par2Dubl[i][0].zemlja === this.ekipe[j].zemlja && par2Dubl[i][0] != this.ekipe[j] && !this.ekipe[j].dodat) {
                  par2Dubl[i].push(e);
                  par2Dubl[i][1].dodat = true;
                  break;
                }
              }
            }
            if (i != 0 && !e.nosilac && !e.dodat) {
              par2Dubl[i].push(e);
              par2Dubl[i][0].dodat = true;
              for (let j = 0; j < this.ekipe.length; j++) {
                if (!this.ekipe[j].nosilac && par2Dubl[i][0].zemlja === this.ekipe[j].zemlja && par2Dubl[i][0] != this.ekipe[j] && !this.ekipe[j].dodat) {
                  par2Dubl[i].push(e);
                  par2Dubl[i][1].dodat = true;
                  break;
                }
              }
            }
          }
        });
        if (len == 32) {
          par1Dubl[7][0] = nosioci[1];
          par2Dubl[7][0] = nosioci[3];
          par1Dubl[7][0].dodat = true
          par2Dubl[7][0].dodat = true
        }

        let par: Sportista[][] = []
        for (let i = 0; i < par1Dubl.length - 1; i += 2) {
          par = [];
          par.push(par1Dubl[i]);
          par.push(par1Dubl[i + 1]);
          this.paroviDubl.push(par);
        }
        for (let i = 0; i < par2Dubl.length - 1; i += 2) {
          par = [];
          par.push(par2Dubl[i]);
          par.push(par2Dubl[i + 1]);
          this.paroviDubl.push(par);
        }
        switch (maxNivo) {
          case 1:
            this.prviNivo = 'osmina finala'
            break;
          case 2:
            this.prviNivo = 'cetvrtfinale'
            break;
          case 3:
            this.prviNivo = 'polufinale'
            break;
          default:
            break;
        }
        this.delegatService.dodajGrupuService(JSON.stringify(this.paroviDubl), 0, maxNivo, this.takmicenje.id).subscribe(res => alert(res['poruka']));
      } else if (maxNivo == 5) {
        this.delegatService.zavrsiTakmicenjeService(this.takmicenje.id);
        this.prikazi = false;
        this.porukaZavrsenoTakmicenje = "Za takmicenje je vec unet raspored za sve nivoe";
        return;
      } else if (this.mojiRezultati.length != 0) {
        let n = maxNivo;
        if (maxNivo == 4) n = 3;
        this.sveGrupe.forEach(e => {
          if (e.nivo == n && e.idTakmicenja == this.takmicenje.id) {
            JSON.parse(e.niz).forEach(element => {
              this.paroviDubl.push(element);
            });
          }
        })
        this.paroviDubl.forEach(e => {
          e[0][0].bodovi = 0;
          e[0][0].rang = 0;

          e[1][0].bodovi = 0;
          e[1][1].rang = 0;
        })

        this.delegatService.dohvatiRezultateZaNivoService(this.takmicenje.id, n).subscribe((res: Rezultat[]) => {
          this.paroviDubl.forEach(par => {
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
          let pomocniParovi: Array<Array<Sportista[]>> = [];
          let parDubl: Array<Array<Sportista>> = [];
          if (maxNivo != 3) {
            for (let i = 0; i < this.paroviDubl.length; i++) {
              if (this.paroviDubl[i][0][0].rang > this.paroviDubl[i][1][0].rang) parDubl.push(this.paroviDubl[i][0]);
              else if (this.paroviDubl[i][0][0].rang < this.paroviDubl[i][1][0].rang) parDubl.push(this.paroviDubl[i][1]);
              else {
                if (this.paroviDubl[i][0][0].bodovi > this.paroviDubl[i][1][0].bodovi) parDubl.push(this.paroviDubl[i][0]);
                else parDubl.push(this.paroviDubl[i][1])
              }
              if (parDubl.length == 2) {
                pomocniParovi.push(parDubl);
                parDubl = [];
              }
            }
          } else {
            for (let i = 0; i < this.paroviDubl.length; i++) {
              if (this.paroviDubl[i][0][0].rang < this.paroviDubl[i][1][0].rang) parDubl.push(this.paroviDubl[i][0]);
              else if (this.paroviDubl[i][0][0].rang > this.paroviDubl[i][1][0].rang) parDubl.push(this.paroviDubl[i][1]);
              else {
                if (this.paroviDubl[i][0][0].bodovi < this.paroviDubl[i][1][0].bodovi) parDubl.push(this.paroviDubl[i][0]);
                else parDubl.push(this.paroviDubl[i][1])
              }
              if (parDubl.length == 2) {
                pomocniParovi.push(parDubl);
                parDubl = [];
              }
            }
          }
          this.paroviDubl = pomocniParovi;
          switch (this.paroviDubl.length) {
            case 8:
              this.prviNivo = 'osmina finala'
              break;
            case 4:
              this.prviNivo = 'cetvrtfinale'
              break;
            case 2:
              this.prviNivo = 'polufinale'
              break;
            case 1:
              if (maxNivo == 3) this.prviNivo = 'trece mesto'
              else (this.prviNivo = 'finale');
              break;
            default:
              break;
          }
          this.delegatService.dodajGrupuService(JSON.stringify(this.paroviDubl), 0, maxNivo + 1, this.takmicenje.id).subscribe(res => console.log(res['poruka']))
        })
      }
      this.prikazi = true;
    } else {
      this.individ = true;
    }
  }

  updateEkipe() {
    let nivo = 1;
    let len = 0;
    if (this.prviNivo === 'cetvrtfinale') {
      nivo = 1;
      len = 4;
    } else if (this.prviNivo === 'polufinale') {
      nivo = 2;
      len = 2;
    } else if (this.prviNivo === 'trece mesto') {
      nivo = 3;
      len = 1
    } else {
      nivo = 3;
      len = 1;
    }
    if (nivo == 1) {

      this.delegatService.dohvatiGrupeService().subscribe((res: Grupa[]) => {
        res.forEach(element => {
          if (element.nivo == 1 && element.grupa == 1 && element.idTakmicenja == this.takmicenje.id) this.grupa1 = JSON.parse(element.niz);
          if (element.nivo == 1 && element.grupa == 2 && element.idTakmicenja == this.takmicenje.id) this.grupa2 = JSON.parse(element.niz);
        });
      })
      console.log(this.grupa1[0].ime);
      console.log(this.grupa2[0].ime);

      this.grupa1.forEach(e => {
        e.bodovi = 0;
        e.rang = 0;
      })
      this.grupa2.forEach(e => {
        e.bodovi = 0;
        e.rang = 0;
      })
    } else {
      this.sveGrupe.forEach(e => {
        if (e.nivo == nivo && this.takmicenje.id == e.idTakmicenja) {
          JSON.parse(e.niz).forEach(element => {
            this.parovi.push(element);
          });
        }
      })

      this.parovi.forEach(e => {
        e[0].bodovi = 0;
        e[0].rang = 0;

        e[1].bodovi = 0;
        e[1].rang = 0;
      })
    }
    this.delegatService.dohvatiRezultateZaNivoService(this.takmicenje.id, nivo).subscribe((res: Rezultat[]) => {
      if (nivo != 1) {
        this.parovi.forEach(par => {
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
      } else {
        this.grupa1.forEach(ekipa => {
          res.forEach(rez => {
            if (ekipa.idSportiste == rez.idSportiste) {
              ekipa.rang += rez.rang;
              ekipa.bodovi += parseInt(rez.rezultat);
            }
          });
        });
        this.grupa2.forEach(ekipa => {
          res.forEach(rez => {
            if (ekipa.idSportiste == rez.idSportiste) {
              ekipa.rang += rez.rang;
              ekipa.bodovi += parseInt(rez.rezultat);
            }
          });
        });
      }

      if (nivo == 1) {
        this.grupa1.sort((a: Sportista, b: Sportista) => {
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
        this.grupa2.sort((a: Sportista, b: Sportista) => {
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
        while (this.grupa1.length > len) {
          this.grupa1.pop();
          this.grupa2.pop();
        }
        let par: Array<Sportista> = [];
        this.parovi = [];
        par.push(this.grupa1[0]);
        par.push(this.grupa2[3]);
        this.parovi.push(par);
        par = [];
        par.push(this.grupa1[2]);
        par.push(this.grupa2[1]);
        this.parovi.push(par);
        par = [];
        par.push(this.grupa1[3]);
        par.push(this.grupa2[0]);
        this.parovi.push(par);
        par = [];
        par.push(this.grupa1[1]);
        par.push(this.grupa2[2]);
        this.parovi.push(par);

        this.delegatService.dodajGrupuService(JSON.stringify(this.parovi), 0, nivo + 1, this.takmicenje.id).subscribe(res => console.log(res['poruka']))
      } else {
        let pomocniParovi: Array<Array<Sportista>> = [];
        let par: Array<Sportista> = [];
        if (this.prviNivo !== 'trece mesto') {
          for (let i = 0; i < this.parovi.length; i++) {
            if (this.parovi[i][0].rang > this.parovi[i][1].rang) par.push(this.parovi[i][0]);
            else if (this.parovi[i][0].rang < this.parovi[i][1].rang) par.push(this.parovi[i][1]);
            else {
              if (this.parovi[i][0].bodovi > this.parovi[i][1].bodovi) par.push(this.parovi[i][0]);
              else par.push(this.parovi[i][1])
            }

            if (par.length == 2) {
              pomocniParovi.push(par);
              par = [];
            }
          }
        } else {
          for (let i = 0; i < this.parovi.length; i++) {
            if (this.parovi[i][0].rang < this.parovi[i][1].rang) par.push(this.parovi[i][0]);
            else if (this.parovi[i][0].rang > this.parovi[i][1].rang) par.push(this.parovi[i][1]);
            else {
              if (this.parovi[i][0].bodovi < this.parovi[i][1].bodovi) par.push(this.parovi[i][0]);
              else par.push(this.parovi[i][1])
            }
            if (par.length == 2) {
              pomocniParovi.push(par);
              par = [];
            }
          }
        }
        this.parovi = pomocniParovi;
        this.delegatService.dodajGrupuService(JSON.stringify(this.parovi), 0, nivo + 1, this.takmicenje.id).subscribe(res => console.log(res['poruka']))
      }
    })
  }

  message: string = '';
  messageNivo: string = '';

  dodajURasporedEkipno(ekipa1: Sportista, ekipa2: Sportista, kolo: number, grupa: number) {
    if (this.unesiIOstale) {
      if (this.prviNivo === 'grupna faza' && (grupa == 1 || grupa == 2)) {
        this.nivo = 'grupna faza';
      }
      else if (grupa == 3) {
        this.nivo = "cetvrtfinale"
      } else if (grupa == 4) {
        this.nivo = "polufinale"
      } else if (grupa == 5) {
        this.nivo = "trece mesto"
      } else {
        this.nivo = 'finale';
      }
    } else this.nivo = this.prviNivo;
    if (this.sport === 'Tenis' && this.nivo === 'grupna faza') this.nivo = 'osmina finala';
    let s = [];
    let imena = [];
    if (ekipa1 != null && ekipa2 != null) {
      s.push(ekipa1.idSportiste, ekipa2.idSportiste);
      if (this.sport === 'Tenis') {
        let ime = ekipa1.ime;
        ime += ' ';
        ime += ekipa1.prezime;
        imena.push(ime);
        ime = ekipa2.ime;
        ime += ' ';
        ime += ekipa2.prezime;
        imena.push(ime);
      }
      else {
        imena.push(ekipa1.ime);
        imena.push(ekipa2.ime);
      }
    }
    let poklapaSe = false;
    this.delegatService.dohvatiSveRasporedeService().subscribe((res: Raspored[]) => {
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        if (element.lokacija === this.lokacija && element.vremePocetka.toString() == this.datumIVremePocetka) {
          poklapaSe = true;
          break;
        }
      }
    })
    if (poklapaSe) {
      this.datumIVremePocetka = '';
      this.message = "Vec postoji mec na unetoj lokaciji za uneto vreme";
    }
    else {
      if (ekipa1 == null && ekipa2 == null) this.lokacija = '';
      this.delegatService.dodajURasporedService(this.takmicenje.id, this.nivo, grupa, Math.floor(kolo), this.datumIVremePocetka, this.lokacija, s, imena).subscribe(res => {
        console.log(res['poruka'])
      });
    }
    this.datumIVremePocetka = '';
    this.lokacija = '';
  }

  dodajURasporedDubl(ekipa1: Sportista[], ekipa2: Sportista[], kolo: number, grupa: number) {
    if (this.unesiIOstale) {
      if (this.prviNivo === 'grupna faza' && (grupa == 1 || grupa == 2)) {
        this.nivo = 'grupna faza';
      }
      else if (grupa == 3) {
        this.nivo = "cetvrtfinale"
      } else if (grupa == 4) {
        this.nivo = "polufinale"
      } else if (grupa == 5) {
        this.nivo = "trece mesto"
      } else {
        this.nivo = 'finale';
      }
    } else this.nivo = this.prviNivo;
    if (this.sport === 'Tenis' && this.nivo === 'grupna faza') this.nivo = 'osmina finala';
    let s = [];
    let imena = [];
    if (ekipa1 != null && ekipa2 != null) {
      s.push(ekipa1[0].idSportiste, ekipa1[1].idSportiste)
      s.push(ekipa2[0].idSportiste, ekipa2[1].idSportiste,);
      let ime = ekipa1[0].ime;
      ime += ' ';
      ime += ekipa1[0].prezime;
      imena.push(ime);
      ime = ekipa1[1].ime;
      ime += ' ';
      ime += ekipa1[1].prezime;
      imena.push(ime);
      ime = ekipa2[0].ime;
      ime += ' ';
      ime += ekipa2[0].prezime;
      imena.push(ime);
      ime = ekipa2[1].ime;
      ime += ' ';
      ime += ekipa2[1].prezime;
      imena.push(ime);
    }
    let poklapaSe = false;
    this.delegatService.dohvatiSveRasporedeService().subscribe((res: Raspored[]) => {
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        if (element.lokacija === this.lokacija && element.vremePocetka.toString() == this.datumIVremePocetka) {
          poklapaSe = true;
          break;
        }
      }
    })
    if (poklapaSe) {
      this.datumIVremePocetka = '';
      this.message = "Vec postoji mec na unetoj lokaciji za uneto vreme";
    }
    else {
      if (ekipa1 == null && ekipa2 == null) this.lokacija = '';
      this.delegatService.dodajURasporedService(this.takmicenje.id, this.nivo, grupa, Math.floor(kolo), this.datumIVremePocetka, this.lokacija, s, imena).subscribe(res => {
        console.log(res['poruka'])
      });
    }
    this.datumIVremePocetka = '';
    this.lokacija = '';
  }

  dodajURasporedIndivid() {
    let poklapaSe = false;
    this.delegatService.dohvatiSveRasporedeService().subscribe((res: Raspored[]) => {
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        if (element.lokacija === this.lokacija && element.vremePocetka.toString() == this.datumIVremePocetka) {
          poklapaSe = true;
          break;
        }
      }
    })
    if (poklapaSe) {
      this.datumIVremePocetka = '';
      this.message = "Vec postoji mec na unetoj lokaciji za uneto vreme";
    }
    else {
      let imena = [];
      this.ekipe.forEach(element => {
        let ime = element.ime;
        ime += ' ';
        ime += element.prezime;
        imena.push(ime);
      });
      this.delegatService.dodajURasporedService(this.takmicenje.id, "finale", 0, 0, this.datumIVremePocetka, this.lokacija, this.takmicenje.takmicari, imena).subscribe(res => {
        console.log(res['poruka']);
      })
      this.individ = false;
    }
    this.datumIVremePocetka = '';
    this.lokacija = '';
  }

  odjaviSe(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  promenaLozinke(){
    localStorage.clear();
    this.router.navigate(['/promenaLozinke']);
  }

}
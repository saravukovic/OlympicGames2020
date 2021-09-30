import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Zemlja } from '../models/zemlja';
import { Sportista } from '../models/sportista';
import { SportistaService } from '../sportista.service';
import { Sport } from '../models/sport';


@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit, AfterViewInit {

  constructor(private korisnikService: KorisnikService, private router: Router,
    private sportistaService: SportistaService) { }

  ngOnInit(): void {
    this.korisnikService.dohvatanjeZemaljaService().subscribe((res: Zemlja[]) => {
      this.zemlje = res;

      this.sortiraneZemlje = this.zemlje.sort((a:Zemlja,b:Zemlja)=>{return b.ukupno-a.ukupno})

      this.dataSource = new MatTableDataSource(this.zemlje);
      this.dataSource.paginator = this.paginator;


      this.dataSource2 = new MatTableDataSource(this.sortiraneZemlje);
      this.dataSource2.paginator = this.paginator2;

      
      this.dataSource3 = new MatTableDataSource(this.sportisti);
      this.dataSource3.paginator = this.paginator3;
    })
    this.sportovi = [];
    this.korisnikService.dohvatanjeSportovaService().subscribe((res: Sport[]) => {
      res.forEach(element => {
        if (!this.sportovi.includes(element.sport)) this.sportovi.push(element.sport);
      });
    })
    this.sportistaService.dohvatiSportisteService().subscribe((res: Sportista[]) => {
      this.sportisti = res;

      this.dataSource3 = new MatTableDataSource(this.sportisti);
      this.dataSource3.paginator = this.paginator3;
    })
  }

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('paginator2', { static: true }) paginator2: MatPaginator;
  @ViewChild('paginator3', { static: true }) paginator3: MatPaginator;

  ngAfterViewInit() {
  }

  dataSource: MatTableDataSource<Zemlja>;
  displayedColumns: string[] = ['zastava', 'naziv', 'brojSportista'];


  dataSource2: MatTableDataSource<Zemlja>;
  displayedColumns2: string[] = ['rang', 'naziv', 'zlatne', 'srebrne', 'bronzane', 'ukupno'];


  dataSource3: MatTableDataSource<Sportista>;
  displayedColumns3: string[] = ['imeIPrezime', 'zemlja', 'sport', 'disciplina', 'pol', 'brojMedalja'];

  zemlje: Zemlja[] = [];
  korIme: string;
  lozinka: string;
  poruka = '';

  imeIPrezime: string = "";
  imeIPrezimeS: string[] = [];
  ime: string = "";
  prezime: string = "";
  zemlja: string = "";
  sport: string = "";
  disciplina: string = "";
  pol: string = "";
  osvajac: boolean = false;
  sportisti: Sportista[] = [];
  sportistiZaPrikaz: Sportista[] = [];
  sportovi: string[];
  discipline: string[] = [];
  pretraga: boolean = false;

  onChange() {
    this.discipline = [];
    this.korisnikService.dohvatanjeSportovaService().subscribe((res: Sport[]) => {
      res.forEach(element => {
        if (element.sport === this.sport && element.disciplina != '') this.discipline.push(element.disciplina);
      });
    })
  }

  prijava() {
    this.poruka = '';
    this.korisnikService.prijavaService(this.korIme, this.lozinka).subscribe((res: Korisnik) => {
      if (res) {
        localStorage.setItem('ulogovan', this.korIme);
        if (res.tip == 'delegat') this.router.navigate(['/delegat']);
        else if (res.tip == 'vodja') this.router.navigate(['/vodja']);
        else if (res.tip == 'organizator') this.router.navigate(['/organizator']);
      } else this.poruka = 'Neispravno uneti podaci! Pokusajte ponovo!';
    })
  }

  sortiraneZemlje:Zemlja[] = [];

  dohvatiZemlje() {
    this.korisnikService.dohvatanjeZemaljaService().subscribe((res: Zemlja[]) => {
      this.zemlje = res;
      console.log(this.zemlje.length)
    })
  }

  pretraziSportiste() {
    this.pretraga = true;
    if (this.imeIPrezime != "") {
      this.imeIPrezimeS = this.imeIPrezime.split(" ",);
      this.ime = this.imeIPrezimeS[0];
      if (this.imeIPrezime.length == 2) this.prezime = this.imeIPrezimeS[1];
    }
    else {
      this.ime = "";
      this.prezime = "";
    }
    this.sportistaService.dohvatiSportisteService().subscribe((res: Sportista[]) => {
      this.sportisti = res;
      for (let i = 0; i < this.sportisti.length;) {
        let s = this.sportisti[i];
        if (this.ime != "") {
          if (this.ime != s.ime) { this.sportisti.splice(i, 1); continue; }
        }
        if (this.prezime != "") {
          if (this.prezime != s.prezime) { this.sportisti.splice(i, 1); continue }
        }

        if (this.zemlja != "") {
          if (this.zemlja != s.zemlja) { this.sportisti.splice(i, 1); continue }
        }

        if (this.sport != "") {
          if (this.sport != s.sport) { this.sportisti.splice(i, 1); continue }
        }

        let cnt = 0;
        if (this.disciplina != "") {
          s.discipline.forEach(sp => {
            if (sp === this.disciplina) cnt++;
          })
          if (cnt == 0) { this.sportisti.splice(i, 1); continue }
        }

        if (this.pol != "") {
          if (this.pol != s.pol) { this.sportisti.splice(i, 1); continue }
        }

        if (this.osvajac == true) {
          if (s.brojMedalja == 0) { this.sportisti.splice(i, 1); continue }
        }
        i++;
      }
      this.dataSource3 = new MatTableDataSource(this.sportisti);
      this.dataSource3.paginator = this.paginator3;
      this.sportistiZaPrikaz = this.sportisti;
      this.zemlja = ''
      this.sport = ''
      this.disciplina = ''
      this.pol = ''
    });
  }

  promeniLozinku: boolean = false;

}


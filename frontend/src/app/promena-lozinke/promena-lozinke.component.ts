import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private router: Router, private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnikService.dohvatanjeKorisnikaService().subscribe((res: Korisnik[]) => {
      this.korisnici = res;
    })
  }

  korIme: string = '';
  lozinka: string = '';
  novaLozinka: string = '';
  poruka: string = '';
  korisnici: Korisnik[] = [];
  staraLozinka: string = '';
  regexPassword = /^(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*]){2,})(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=.{8,12})/;

  promenaLozinke() {
    let cnt = 0;
    for (let i = 0; i < this.korisnici.length; i++) {
      const k = this.korisnici[i];
      if (k.korIme == this.korIme) {
        cnt++;
        this.staraLozinka = k.lozinka;
        break;
      }
    }
    if (cnt) {
      if (this.staraLozinka == this.novaLozinka) this.poruka = 'Nova lozinka je ista kao i stara!';
      else if (this.staraLozinka != this.lozinka) this.poruka = 'Niste tacno uneli staru lozinku!'
      else {
        if (!this.regexPassword.test(this.novaLozinka) || (/(.)\1\1\1/).test(this.novaLozinka) || !(/[A-Za-z]/).test(this.novaLozinka)) {
          this.poruka = 'Lozinka mora da ima najmanje 8, a najvise 12 karaktera! Mora pocinjati ili velikim ili malim slovom! Mora imati barem jedno veliko slovo, barem tri malo slovo, barem dva numerika i barem dva specijalna karaktera! Maksimalan broj uzastopnih karaktera je tri!'
        } else {
          this.korisnikService.azurirajLozinku(this.korIme, this.novaLozinka).subscribe(res=>console.log(res['poruka']))
          this.router.navigate(['/']);
        }
      }
    } else {
      this.poruka = 'Korisnicko ime ne postoji!';
    }
  }


}

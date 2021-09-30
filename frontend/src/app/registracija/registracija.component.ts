import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnikService.dohvatanjeKorisnikaService().subscribe((res: Korisnik[]) => {
      this.korisnici = res;
    })
  }

  ime: string = "";
  prezime: string = "";
  korIme: string = "";
  lozinka: string = "";
  potvrdaLozinka: string = "";
  mail: string = "";
  nacionalnost: string = "";
  tip: string = "";
  korisnici: Korisnik[];
  cnt: number = 0;
  
  regexPassword = /^(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*]){2,})(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=.{8,12})/;
  regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;

  registracija() {
    this.cnt=0;
    this.korisnikService.dohvatanjeKorisnikaService().subscribe((res: Korisnik[]) => {
      this.korisnici = res;
    })
    
    for (let kI of this.korisnici) {
      if (this.korIme === kI.korIme) {
        this.cnt++;
        alert('Korisnicko ime vec postoji!');
        break;
      }
    }
    for (let kI of this.korisnici) {
      if (this.mail === kI.mail) {
        this.cnt++;
        alert('Email ime vec postoji!');
        break;
      }
    }
    if (!(this.ime[0] >= 'A' && this.ime[0] <= 'Z')){
      this.cnt++;
      alert('Ime mora pocinjati velikim slovom!');
    }
    if (!(this.prezime[0] >= 'A' && this.prezime[0] <= 'Z')){
      alert('Prezime mora pocinjati velikim slovom!');
      this.cnt++;
    }
    if (this.lozinka != this.potvrdaLozinka) {
      this.cnt++;
      alert('Lozinke se ne poklapaju!');
    }
    if (!this.regexPassword.test(this.lozinka) || (/(.)\1\1\1/).test(this.lozinka) || !(/[A-Za-z]/).test(this.lozinka)) {
      this.cnt++;
      alert('Loinka mora da ima najmanje 8, a najvise 12 karaktera! Mora pocinjati ili velikim ili malim slovom! Mora imati barem jedno veliko slovo, barem tri malo slovo, barem dva numerika i barem dva specijalna karaktera! Maksimalan broj uzastopnih karaktera je tri!');
    }
    if(!this.regexEmail.test(this.mail)){
      this.cnt++;
      alert('E-mail nije u odgovarajucem formatu!');
    }
    if(this.cnt==0) {
      this.korisnikService.registracijaService(this.korIme,this.lozinka,this.ime,this.prezime,this.nacionalnost,this.mail, this.tip).subscribe((res) => {
        if (res['poruka'] == 'korisnik dodat') console.log('dodat');
      })
      alert('Zahtev za registraciju je poslat!');
    }
  }

}

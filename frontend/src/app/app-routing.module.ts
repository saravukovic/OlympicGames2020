import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatComponent } from './delegat/delegat.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RezultatiComponent } from './rezultati/rezultati.component';
import { VodjaComponent } from './vodja/vodja.component';

const routes: Routes = [
  {path:'', component:PrijavaComponent},
  {path:'registracija', component:RegistracijaComponent},
  {path:'delegat', component:DelegatComponent},
  {path:'vodja', component:VodjaComponent},
  {path:'organizator', component:OrganizatorComponent},
  {path:'rezultati', component:RezultatiComponent},
  {path:'delegat/rezultati', component:RezultatiComponent},
  {path:'promenaLozinke', component:PromenaLozinkeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

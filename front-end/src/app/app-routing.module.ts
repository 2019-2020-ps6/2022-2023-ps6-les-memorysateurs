import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreerThemeComponent } from './creer-theme/creer-theme.component';
import { CreerMemoryComponent } from './creer-memory/creer-memory.component';
import { FooterCreerThemeComponent } from './footer-creer-theme/footer-creer-theme.component';
import {ListeThemeComponent} from "./liste-theme/liste-theme.component";
import {CreerPatientComponent} from "./creer-patient/creer-patient.component";
import {InfoStadeComponent} from "./info-stade/info-stade.component";
import {ListePatientComponent} from "./liste-patient/liste-patient.component";
import {ProfilPatientComponent} from "./profil-patient/profil-patient.component";
import { Game } from './game/game.component';

const routes: Routes = [ {path: 'creer-theme', component: CreerThemeComponent},
  {path: 'creer-memory', component: CreerMemoryComponent},
  {path: 'liste-theme', component: ListeThemeComponent},
  {path: 'footer-creer-theme', component: FooterCreerThemeComponent},
  {path: 'creer-patient', component: CreerPatientComponent},
  {path: 'info-stade', component: InfoStadeComponent},
  {path: 'liste-patient', component: ListePatientComponent},
  {path: 'profil-patient', component: ProfilPatientComponent},
  { path: 'game', component: Game },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

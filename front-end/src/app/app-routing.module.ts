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
import {ResultatPartieComponent} from "./resultat-partie/resultat-partie.component";
import { StatComponent } from './stat/stat.component';
import {PartagerThemeComponent} from "./partager-theme/partager-theme.component";
import {AuthentificationComponent} from "./authentification/authentification.component";
import {CreerCompteComponent} from "./creer-compte/creer-compte.component";
import {MotDePasseOublieComponent} from "./mot-de-passe-oublie/mot-de-passe-oublie.component";
import {RedirectionComponent} from "./redirection/redirection.component";

const routes: Routes = [ {path: 'creer-theme', component: CreerThemeComponent},
  {path: 'creer-memory', component: CreerMemoryComponent},
  {path: 'liste-theme', component: ListeThemeComponent},
  {path: 'footer-creer-theme', component: FooterCreerThemeComponent},
  {path: 'creer-patient', component: CreerPatientComponent},
  {path: 'info-stade', component: InfoStadeComponent},
  {path: 'liste-patient', component: ListePatientComponent},
  {path: 'profil-patient', component: ProfilPatientComponent},
  {path: 'resultat-partie', component: ResultatPartieComponent},
  {path: 'game', component: Game},
  {path: 'partager-theme', component: PartagerThemeComponent },
  {path: 'stat', component: StatComponent},
  {path: 'game', component: Game },
  {path: 'authentification', component: AuthentificationComponent},
  {path: 'creer-compte', component: CreerCompteComponent},
  {path: 'mot-de-passe-oublie', component: MotDePasseOublieComponent},
  {path: '', component: RedirectionComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

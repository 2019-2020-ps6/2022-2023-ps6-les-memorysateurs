import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreerThemeComponent } from './creer-theme/creer-theme.component';
import { CreerMemoryComponent } from './creer-memory/creer-memory.component';
import { FooterCreerThemeComponent } from './footer-creer-theme/footer-creer-theme.component';
import {ListeThemeComponent} from "./liste-theme/liste-theme.component";
import {CreerPatientComponent} from "./creer-patient/creer-patient.component";

const routes: Routes = [ {path: 'creer-theme', component: CreerThemeComponent},
  {path: 'creer-memory', component: CreerMemoryComponent},
  {path: 'liste-theme', component: ListeThemeComponent},
  {path: 'footer-creer-theme', component: FooterCreerThemeComponent},
  {path: 'creer-patient', component: CreerPatientComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

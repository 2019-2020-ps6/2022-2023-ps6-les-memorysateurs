import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreerThemeComponent } from './creer-theme/creer-theme.component';
import { CreerMemoryComponent } from './creer-memory/creer-memory.component';
import { FooterCreerThemeComponent } from './footer-creer-theme/footer-creer-theme.component';
import { HttpClientModule } from '@angular/common/http';
import { ListeThemeComponent } from './liste-theme/liste-theme.component';
import { ItemFrameComponent } from './item-frame/item-frame.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreerPatientComponent } from './creer-patient/creer-patient.component';
import { InfoStadeComponent } from './info-stade/info-stade.component';
import { ListePatientComponent } from './liste-patient/liste-patient.component';
import { ProfilPatientComponent } from './profil-patient/profil-patient.component';

//game imports
import { Card } from './game/card.component';
import { CardsContainer } from './game/cardcontainer.component';
import { Game, HintContainer } from './game/game.component';
import { Button } from './utilities/button/btn.component';
import { Timer } from './game/meter.component';


@NgModule({
  declarations: [
    AppComponent,
    CreerThemeComponent,
    CreerMemoryComponent,
    FooterCreerThemeComponent,
    ListeThemeComponent,
    ItemFrameComponent,
    CreerPatientComponent,
    InfoStadeComponent,
    ListePatientComponent,
    ProfilPatientComponent
    ThemeComponent,
    Game,
    CardsContainer,
    Card,
    HintContainer,
    Button,
    Timer,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

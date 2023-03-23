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


@NgModule({
  declarations: [
    AppComponent,
    CreerThemeComponent,
    CreerMemoryComponent,
    FooterCreerThemeComponent,
    ListeThemeComponent,
    ItemFrameComponent,
    CreerPatientComponent,
    InfoStadeComponent
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

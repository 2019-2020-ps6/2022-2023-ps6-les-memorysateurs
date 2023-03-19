import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Card } from './game/card.component';
import { CardsContainer } from './game/cardcontainer.component';
import { Game, HintContainer } from './game/game.component';
import { Button } from './utilities/button/btn.component';
import { Timer } from './game/meter.component';

@NgModule({
  declarations: [
    AppComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

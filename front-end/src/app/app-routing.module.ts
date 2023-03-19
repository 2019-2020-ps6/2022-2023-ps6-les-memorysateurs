import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Game } from './game/game.component';

const routes: Routes = [
  { path: 'game', component: Game },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

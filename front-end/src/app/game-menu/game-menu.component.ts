import { Component } from '@angular/core';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

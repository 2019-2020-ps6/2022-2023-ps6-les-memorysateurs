import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isMenuOpen = false;
  constructor(public router: Router) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

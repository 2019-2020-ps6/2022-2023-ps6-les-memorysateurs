import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isMenuOpen = false;
  constructor(public router: Router, public authentification : AuthentificationService) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

  }

  confirmExit() {
    let bool = confirm('Êtes-vous sûr de vouloir quitter ?');

    if(bool) {

      this.router.navigate(['/creer-memory']);
    }
    this.toggleMenu();
    return bool;
  }
  confirmDeconection() {
    let bool = confirm('Êtes-vous sûr de vouloir vous déconnecter ?');

    if(bool) {
      this.authentification.logout();
      this.router.navigate(['/authentification']);
    }
    this.toggleMenu();
    return bool;
  }

}

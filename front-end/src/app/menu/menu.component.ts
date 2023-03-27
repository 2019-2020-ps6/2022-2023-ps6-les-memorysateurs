import { Component, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleMenu]'
})
export class ToggleMenuDirective {
  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    this.el.nativeElement.classList.toggle('active');
  }
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}


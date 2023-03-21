import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCreerThemeComponent } from './footer-creer-theme.component';

describe('FooterCreerThemeComponent', () => {
  let component: FooterCreerThemeComponent;
  let fixture: ComponentFixture<FooterCreerThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterCreerThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterCreerThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

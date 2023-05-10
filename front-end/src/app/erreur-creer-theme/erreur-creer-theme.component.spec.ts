import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurCreerThemeComponent } from './erreur-creer-theme.component';

describe('ErreurCreerThemeComponent', () => {
  let component: ErreurCreerThemeComponent;
  let fixture: ComponentFixture<ErreurCreerThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErreurCreerThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErreurCreerThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
